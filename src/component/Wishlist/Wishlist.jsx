import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./Wishlist.module.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]); // 위시리스트 항목
  const [wishlistIds, setWishlistIds] = useState(new Set()); // UI 상태 관리
  const [wishlistChanges, setWishlistChanges] = useState(new Map()); // 변경사항 저장
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 페이지 감지

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchWishlist();
    }
  }, [userEmail]);


  const checkLoginStatus = () => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail && storedEmail.trim()) {
      setUserEmail(storedEmail.trim());
    } else {
      console.error("⚠️ 로그인된 이메일을 가져오지 못했습니다!");
    }
  };


  const fetchWishlist = async () => {
    if (!userEmail) return;

    try {
      const response = await axios.get(`http://localhost:8080/wishlist/${userEmail}`);
      setWishlist(response.data);
      setWishlistIds(new Set(response.data.map((item) => item.car_id))); // UI 상태 유지
    } catch (error) {
      console.error("⚠️ 위시리스트를 불러오는 중 오류 발생:", error);
    }
  };

 
  const toggleWishlist = (carId) => {
    if (!userEmail) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!carId) {
      alert("올바른 자동차 ID가 아닙니다.");
      return;
    }

    // 최신 상태를 기반으로 즉시 반영
    setWishlistChanges((prevChanges) => {
      const newChanges = new Map(prevChanges);

      if (newChanges.has(carId)) {
        newChanges.delete(carId); // 취소 (이전 변경 사항 제거)
      } else {
        newChanges.set(carId, wishlistIds.has(carId) ? "remove" : "add");
      }
      return newChanges;
    });

    // UI에서 즉시 반영 (최신 상태 유지)
    setWishlistIds((prevIds) => {
      const updatedIds = new Set(prevIds);
      if (updatedIds.has(carId)) {
        updatedIds.delete(carId);
      } else {
        updatedIds.add(carId);
      }
      return updatedIds;
    });

    // UI에서도 즉시 리스트 반영
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => wishlistIds.has(item.car_id) || wishlistChanges.has(item.car_id))
    );
  };


  const syncWishlistToDB = async () => {
    if (wishlistChanges.size === 0 || !userEmail) return;

    console.log("🔄 위시리스트 변경사항 DB에 반영 중...");

    try {
      const requests = [];

      wishlistChanges.forEach((action, carId) => {
        if (action === "add") {
          requests.push(
            axios.post("http://localhost:8080/wishlist/add", {
              user_email: userEmail,
              car_id: carId,
            })
          );
        } else if (action === "remove") {
          requests.push(axios.delete(`http://localhost:8080/wishlist/remove/${carId}/${userEmail}`));
        }
      });

      await Promise.all(requests); // 모든 요청을 병렬로 처리

      console.log("✅ 위시리스트 변경사항이 DB에 반영되었습니다.");
      setWishlistChanges(new Map()); // 변경 사항 초기화
    } catch (error) {
      console.error("⚠️ 위시리스트 동기화 중 오류 발생:", error);
    }
  };


  useEffect(() => {
    if (wishlistChanges.size > 0) {
      syncWishlistToDB();
    }
  }, [location]); // `location`이 변경될 때 실행 (페이지 이동 감지)


  useEffect(() => {
    window.addEventListener("beforeunload", syncWishlistToDB);
    return () => {
      window.removeEventListener("beforeunload", syncWishlistToDB);
    };
  }, [wishlistChanges, userEmail]);

  const getWishlistStatus = (carId) => {
    if (wishlistChanges.has(carId)) {
      return wishlistChanges.get(carId) === "add"; // 변경된 상태 반영
    }
    return wishlistIds.has(carId); // 기존 상태 반영
  };

  const viewDetails = (carId) => {
    navigate(`/productDetail/${carId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">위시리스트</h2>
      {wishlist.length === 0 ? (
        <p>위시리스트가 비어 있습니다.</p>
      ) : (
        <div className={style.wishlistContainer}>
          {wishlist.map((item) => {
            const isWishlisted = getWishlistStatus(item.car_id); // UI 상태 반영

            return (
              <div key={item.car_id} className={style.wishlistCard}>
                <div className={style.carDetails}>
                  <p className={style.carModel}>{item.model || "미확인 모델"}</p>

            
                  <div className={style.toggleContainer} onClick={() => toggleWishlist(item.car_id)}>
                    <div className={`${style.toggleSwitch} ${isWishlisted ? style.active : ""}`}>
                      <img
                        src={isWishlisted ? "/img/star2.png" : "/img/star1.png"}
                        alt={isWishlisted ? "위시리스트 추가됨" : "위시리스트 제거됨"}
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
