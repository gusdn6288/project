import React from "react";
import { motion } from "framer-motion"; // ✅ 애니메이션 라이브러리 추가
import style from "./ProductFilter.module.css";
import carIcon from "../../assets/car-icon.png"; // ✅ 올바른 이미지 경로

const categories = [
  { name: "Sedan", icon: carIcon },
  { name: "SUV", icon: carIcon },
  { name: "Coupe", icon: carIcon },
  { name: "Cabriolet&Roadster", icon: carIcon },
];

const ProductFilter = ({ selectedCategories, toggleCategory }) => {
  return (
    <motion.div
      className={style.filterContainer}
      initial={{ opacity: 0, x: -50 }} // 처음에 약간 왼쪽에서 등장
      animate={{ opacity: 1, x: 0 }} // 점점 나타나게 함
      transition={{ duration: 0.5, ease: "easeOut" }} // 애니메이션 속도 조절
    >
      <h2 className={style.filterTitle}>차체 유형</h2>

      {categories.map((category, index) => (
        <motion.button
          key={category.name}
          className={`${style.filterButton} ${
            selectedCategories.has(category.id) ? style.selected : ""
          }`}
          onClick={() => toggleCategory(category.name)}
          initial={{ opacity: 0, y: 20 }} // 처음에 아래에서 올라오게 함
          animate={{ opacity: 1, y: 0 }} // 점점 나타나게 함
          transition={{ duration: 0.4, delay: index * 0.1 }} // 순차적으로 등장
        >
          <img src={category.icon} alt={category.name} className={style.filterIcon} />
          {category.name}
          <span>{selectedCategories.has(category.name) ? "✔️" : "+"}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ProductFilter;
