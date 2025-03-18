import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Wishlist.module.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]); // 위시리스트 배열
  const [wishlistIds, setWishlistIds] = useState(new Set()); // ID 저장 (Set 활용)

  useEffect(() => {
    fetchWishlist(); // 위시리스트 불러오기
  }, []);

  // ✅ 위시리스트 불러오기
  const fetchWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:8080/wishlist");
      console.log("위시리스트 데이터:", response.data); // 🔥 디버깅용 로그
      setWishlist(response.data);
      setWishlistIds(new Set(response.data.map((item) => item.car_id))); // Set으로 중복 방지
    } catch (error) {
      console.error("위시리스트를 불러오는 중 오류 발생:", error);
    }
  };

  // ✅ 위시리스트에서 제거하기 (토글 방식)
  const toggleWishlist = async (carId) => {
    if (!carId) {
      alert("올바른 자동차 ID가 아닙니다.");
      return;
    }
    try {
      if (wishlistIds.has(carId)) {
        // 이미 존재하면 삭제
        await axios.delete(`http://localhost:8080/wishlist/remove/${carId}`);
        setWishlist((prev) => prev.filter((item) => item.car_id !== carId)); // UI에서 제거
        setWishlistIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(carId);
          return newSet;
        });
  
      }
    } catch (error) {
      console.error("위시리스트 제거 중 오류 발생:", error);
      alert("오류 발생: 위시리스트 제거 실패");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">위시리스트</h2>
      {wishlist.length === 0 ? (
        <p>위시리스트가 비어 있습니다.</p>
      ) : (
        <div className={style.wishlistContainer}>
          {wishlist.map((item) => (
            <div key={item.car_id} className={style.wishlistCard}>
              <div className={style.carDetails}>
                <p className={style.carModel}>{item.model || "미확인 모델"}</p>
                <button className={style.btnRemove}onClick={() => toggleWishlist(item.car_id)}>X</button>
                <img src={`/img/Productimg/${item.model}.png`}alt={item.model}className={style.carImage}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
