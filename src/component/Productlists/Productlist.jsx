import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import style from "./Productlist.module.css";

// ✅ 기본 axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const ProductList = ({ selectedCategories }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // ✅ user_email 추가
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    api
      .get("/getAllProducts")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("상품 정보를 불러오는 중 오류 발생:", error));
  }, []);

  useEffect(() => {
    if (isLoggedIn && userEmail) {
      fetchWishlist();
    }
  }, [isLoggedIn, userEmail]);

  // ✅ 위시리스트 불러오기
  const fetchWishlist = async () => {
    if (!isLoggedIn || !userEmail) return;
    try {
      const response = await axios.get(`http://localhost:8080/wishlist/${userEmail}`);
      const wishlistIds = new Set(response.data.map((item) => item.car_id));
      setWishlist(wishlistIds);
    } catch (error) {
      console.error("위시리스트 불러오는 중 오류 발생:", error);
    }
  };

  // ✅ 로그인 상태 체크 및 사용자 이메일 저장
  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("Authorization");
    const storedEmail = sessionStorage.getItem("email"); // ✅ user_email 가져오기

    console.log("🔍 세션에서 가져온 이메일:", storedEmail); // 🔎 디버깅용 로그 추가

    setIsLoggedIn(!!token);
    if (storedEmail && storedEmail.trim()) {
      setUserEmail(storedEmail.trim()); // ✅ trim()으로 공백 제거 후 저장
    } else {
      console.error("⚠️ 로그인된 이메일을 가져오지 못했습니다!");
    }
  };

  // ✅ 위시리스트 추가 및 삭제 기능
  const toggleWishlist = async (carId) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    if (!userEmail || userEmail.trim() === "") {
      console.error("⚠️ User Email 없음 (undefined 또는 null)");
      alert("사용자 정보를 불러오는 중 오류 발생");
      return;
    }

    try {
      if (wishlist.has(carId)) {
        // ✅ 위시리스트에서 삭제
        console.log(`❌ 위시리스트 삭제 요청: ${carId}`);
        await axios.delete(`http://localhost:8080/wishlist/remove/${carId}/${userEmail}`);
        
        setWishlist((prev) => {
          const newSet = new Set(prev);
          newSet.delete(carId);
          return newSet;
        });
      } else {
        // ✅ 위시리스트에 추가
        console.log(`✅ 위시리스트 추가 요청: ${carId}`);
        await axios.post("http://localhost:8080/wishlist/add", {
          user_email: userEmail.trim(), // ✅ trim()으로 공백 제거 후 전송
          car_id: carId,
        });

        setWishlist((prev) => new Set([...prev, carId]));
      }
    } catch (error) {
      console.error("⚠️ 위시리스트 추가/제거 중 오류 발생:", error);
      alert("오류 발생: 위시리스트 변경 실패");
    }
  };

  const viewDetails = (carId) => {
    navigate(`/productDetail/${carId}`);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.size === 0) return true;
    return selectedCategories.has(product.brand);
  });

  return (
    <div className="container mt-4">
      {filteredProducts.length === 0 ? (
        <p className={style.noProducts}>선택한 필터에 해당하는 상품이 없습니다.</p>
      ) : (
        <div className={style.carContainer}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              viewDetails={viewDetails}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.has(product.id)}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, viewDetails, toggleWishlist, isWishlisted, index }) => {
  return (
    <motion.div
      className={style.carBanner}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className={style.carText}>
        <p className={style.carModel}>{product.model}</p>
        <div className={style.toggleContainer} onClick={() => toggleWishlist(product.id)}>
          <div className={`${style.toggleSwitch} ${isWishlisted ? style.active : ""}`}>
            <img
              src={isWishlisted ? "/img/star2.png" : "/img/star1.png"}
              alt={isWishlisted ? "위시리스트 추가됨" : "위시리스트 제거됨"}
              className={style.toggleIcon}
            />
          </div>
        </div>
      </div>
      <div className={style.carImage}>
        <img src={`/img/Productimg/${product.model}.png`} alt={product.name} />
      </div>
      <button className={style.btnDetails} onClick={() => viewDetails(product.id)}>
        View Models
      </button>
    </motion.div>
  );
};

export default ProductList;
