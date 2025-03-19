import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Product.module.css";
import ProductList from "../../component/Productlists/Productlist";
import ProductFilter from "../../component/Productlists/ProductFilter";
import Foot from "../../component/Footer/Foot";
import { useLocation } from "react-router-dom";

function Product() {
  // ✅ 선택된 카테고리 상태 관리
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const location = useLocation();
  let modelName = location.state?.mdName.replace(/\s+/g, "") || null; // 존재하면 공백 제거  없음연 null
  
  useEffect(() => {
    if (modelName) {
      if(modelName ==="Suv")
        modelName = modelName.toUpperCase(); // suv만 대소문자 달라서
      setSelectedCategories(new Set([modelName])); 
    }
  }, [modelName]);


  // ✅ 카테고리 토글 기능
  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };
  console.log(selectedCategories);
  return (
    <div className={style.pageContainer}>
      {/* 고정된 필터 바 */}
      <ProductFilter selectedCategories={selectedCategories} toggleCategory={toggleCategory} />

      {/* 필터링된 상품 목록 표시 */}
      <div className={style.container}>
        <ProductList selectedCategories={selectedCategories} />
      </div>
      <Foot/>
    </div>
  );
}

export default Product;