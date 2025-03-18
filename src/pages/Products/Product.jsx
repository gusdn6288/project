import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Product.module.css";
import ProductList from "../../component/Productlists/Productlist";
import ProductFilter from "../../component/Productlists/ProductFilter";
import Foot from "../../Foot";

function Product() {
  // ✅ 선택된 카테고리 상태 관리
  const [selectedCategories, setSelectedCategories] = useState(new Set());

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