import { useState } from "react";
import HoverRotateImg from "./HoverRotateImg";
import "./ModelCardItem.css";

const ModelCardItem = ({ model }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="model-card"
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)} 
    >
      <div className="model-info">
        <h3>모델 알아보기</h3>
        <h2>{model.mdname}</h2>
      </div>
      <div className="model-image-container">
        <HoverRotateImg modelName={model.mdname} isHovered={isHovered} /> 
      </div>
    </div>
  );
};
export default ModelCardItem;
