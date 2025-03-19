import { useState } from "react";
import HoverRotateImg from "./HoverRotateImg";
import "./ModelCardItem.css";
import { useNavigate } from "react-router-dom";

const ModelCardItem = ({ model }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const movePage = () => {
    navigate('/product',{
      state: {
        mdName:model.mdname
      }
      
    });
  }
  return (
    <div
      className="model-card"
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)} 
      onClick={movePage}
    >
      <div className="model-info">
        <h3>모델 알아보기</h3>
        <h2>{model.mdname}</h2>
      </div>
      <div className="model-image-container">
        <HoverRotateImg modelName={model.mdname} isHovered={isHovered}  /> 
      </div>
    </div>
  );
};
export default ModelCardItem;
