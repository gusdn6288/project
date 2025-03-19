import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Wishlist.module.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]); // 위시리스트 배열
  const [wishlistIds, setWishlistIds] = useState(new Set()); // ID 저장 (Set 활용)
  const [userEmail, setUserEmail] = useState(null); // ✅ 로그인된 사용자 이메일 저장

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchWishlist();
    }
  }, [userEmail]);

  // ✅ 로그인 상태 체크 및 user_email 가져오기
  const checkLoginStatus = () => {
    const storedEmail = sessionStorage.getItem("email"); // ✅ sessionStorage에서 user_email 가져오기

    console.log("🔍 세션에서 가져온 사용자 이메일:", storedEmail); // 디버깅 로그 추가

    if (storedEmail && storedEmail.trim()) {
      setUserEmail(storedEmail.trim()); // 공백 제거 후 저장
    } else {
      console.error("⚠️ 로그인된 이메일을 가져오지 못했습니다!");
    }
  };

  // ✅ 위시리스트 불러오기 (user_email 기반)
  const fetchWishlist = async () => {
    if (!userEmail) {
      console.error("⚠️ user_email이 존재하지 않습니다.");
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:8080/wishlist/${userEmail}`);
      console.log("📌 위시리스트 데이터:", response.data); // 🔥 디버깅용 로그
      setWishlist(response.data);
      setWishlistIds(new Set(response.data.map((item) => item.car_id))); // Set으로 중복 방지
    } catch (error) {
      console.error("⚠️ 위시리스트를 불러오는 중 오류 발생:", error);
    }
  };

  // ✅ 위시리스트에서 제거하기 (user_email 기반)
  const toggleWishlist = async (carId) => {
    if (!userEmail) {
      console.error("⚠️ user_email 없음 (undefined 또는 null)");
      alert("사용자 정보를 불러오는 중 오류 발생");
      return;
    }

    if (!carId) {
      alert("올바른 자동차 ID가 아닙니다.");
      return;
    }

    try {
      if (wishlistIds.has(carId)) {
        // 이미 존재하면 삭제
        await axios.delete(`http://localhost:8080/wishlist/remove/${carId}/${userEmail}`);
        setWishlist((prev) => prev.filter((item) => item.car_id !== carId)); // UI에서 제거
        setWishlistIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(carId);
          return newSet;
        });
      }
    } catch (error) {
      console.error("⚠️ 위시리스트 제거 중 오류 발생:", error);
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
                <button className={style.btnRemove} onClick={() => toggleWishlist(item.car_id)}>X</button>
                <img src={`/img/Productimg/${item.model}.png`} alt={item.model} className={style.carImage} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
