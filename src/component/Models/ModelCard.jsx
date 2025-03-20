import { useEffect, useState } from "react";
import axios from "axios";
import ModelCardItem from "./ModelCardItem"; //  ModelCardItem 가져오기
import "./ModelCardItem.css";

const ModelCard = () => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/getAllModels",
      ) //  API 요청 유지
      .then((response) => {
        setModels(response.data)
      })
      .catch((error) =>
        console.error("모델 정보를 불러오는 중 오류 발생:", error)
      );
  }, []);

  return (
    <div className="Model-container">
      {models.map((model) => (
        <ModelCardItem key={model.id} model={model} />
      ))}
    </div>
  );
};

export default ModelCard;
