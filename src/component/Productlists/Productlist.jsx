import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ 애니메이션 라이브러리 추가
import axios from "axios";
import style from "./Productlist.module.css";

// ✅ 기본 axios 인스턴스 생성 (상품 조회는 Authorization 필요 없음)
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const ProductList = ({ selectedCategories }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/getAllProducts")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("상품 정보를 불러오는 중 오류 발생:", error));

    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:8080/wishlist");
      const wishlistIds = new Set(response.data.map((item) => item.car_id));
      setWishlist(wishlistIds);
    } catch (error) {
      console.error("위시리스트 불러오는 중 오류 발생:", error);
    }
  };

  const viewDetails = (carId) => {
    navigate(`/productDetail/${carId}`);
  };

  const toggleWishlist = async (carId) => {
    if (!carId) {
      alert("올바른 자동차 ID가 아닙니다.");
      return;
    }
    try {
      if (wishlist.has(carId)) {
        await axios.delete(`http://localhost:8080/wishlist/remove/${carId}`);
        setWishlist((prev) => {
          const newSet = new Set(prev);
          newSet.delete(carId);
          return newSet;
        });
      } else {
        await axios.post("http://localhost:8080/wishlist/add", { car_id: carId });
        setWishlist((prev) => new Set(prev).add(carId));

      }
    } catch (error) {
      console.error("위시리스트 추가/제거 중 오류 발생:", error);
      alert("오류 발생: 위시리스트 변경 실패");
    }
  };

  // ✅ 선택된 카테고리에 맞게 상품 필터링
  const filteredProducts = products.filter((product) => {
    if (selectedCategories.size === 0) return true; // 아무 필터도 선택 안 했을 경우 전체 표시
    return selectedCategories.has(product.brand);
  });

  return (
    <div className="container mt-4">
      {filteredProducts.length === 0 ? (
        <p className={style.noProducts}>선택한 필터에 해당하는 상품이 없습니다.</p>
      ) : (
        <div className={style.carContainer}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewDetails={viewDetails}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.has(product.id)}
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
      {/* ✅ 상태에 따라 이미지 변경 */}
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
        더 알아보기
      </button>
    </motion.div>
  );
};


export default ProductList;
