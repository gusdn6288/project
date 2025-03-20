import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Wishlist.module.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [selected,setSelected] = useState(0);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Authorization");
  
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
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail && storedEmail.trim()) {
      setUserEmail(storedEmail.trim());
    } else {
      console.error("⚠️ 로그인된 이메일을 가져오지 못했습니다!");
    }
  };

  // ✅ 위시리스트 불러오기
  const fetchWishlist = async () => {
    if (!userEmail) return;

    try {
      const response = await axios.get(`http://localhost:8080/wishlist/${userEmail}`,{
        headers: { Authorization: token }
    },);
      setWishlist(response.data);
    } catch (error) {
      console.error("⚠️ 위시리스트를 불러오는 중 오류 발생:", error);
    }
  };

  // ✅ 위시리스트에서 삭제
  const removeFromWishlist = async (carId) => {
    if (!carId) {
      alert("올바른 자동차 ID가 아닙니다.");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/wishlist/remove/${carId}/${userEmail}`,{
        headers: { Authorization: token }
    });

      // 🚀 UI에서 즉시 반영 (삭제된 항목 제외)
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.car_id !== carId));
      console.log(`✅ ${carId} 위시리스트에서 삭제 완료`);
    } catch (error) {
      console.error("⚠️ 위시리스트 삭제 중 오류 발생:", error);
    }
  };

  const viewDetails = (carId) => {
    navigate(`/productDetail/${carId}`);
  };

  console.log(wishlist);
  return (
    <div className={style.container} >
      <h2 >위시리스트</h2>
      {wishlist.length === 0 ? (
        <p>위시리스트가 비어 있습니다.</p>
      ) : (
        <div className={style.wishlistContainer}>
          {wishlist.map((item) => (
            <div key={item.car_id} className={style.wishlistCard}>
              <div className={style.carDetails}>
                <p className={style.carModel}>{item.model || "미확인 모델"}</p>

                {/* ✅ 삭제 버튼을 기존 토글 아이콘으로 변경 */}
                <div className={style.toggleContainer} onClick={() => removeFromWishlist(item.car_id)}>
                  <div className={`${style.toggleSwitch} ${style.active}`}>
                    <img
                      src={"/img/star2.png"} // 기존 토글 아이콘 (별 모양)
                      alt="위시리스트에서 삭제"
                      className={style.toggleIcon}
                    />
                  </div>
                </div>

                <img src={`/img/Productimg/${item.model}.png`} alt={item.model} className={style.carImage} />
                <button className={style.btnDetails} onClick={() => viewDetails(item.car_id)}>
                  View Models
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
