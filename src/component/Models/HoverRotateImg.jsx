import { useEffect, useState } from "react";

const HoverRotateImg = ({ modelName, isHovered }) => {
  const images = [1, 2, 3, 4, 5, 6]; //  1~6 이미지 리스트
  const [index, setIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isHovered) {
      //  배너에 마우스를 올리면 이미지 변경 시작
      if (intervalId) clearInterval(intervalId);
      const id = setInterval(() => {
        setIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : images.length - 1));
      }, 30); //  50ms 간격으로 이미지 변경
      setIntervalId(id);
      return () => clearInterval(id);
    } else {
      //  마우스를 떼면 다시 1로 돌아감
      if (intervalId) clearInterval(intervalId);
      const id = setInterval(() => {
        setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      }, 30); // 30ms 간격으로 이미지 감소
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isHovered]);

  return (
    <div>
      <img
        src={`/img/${modelName}/${modelName}${index + 1}.png`} //  변경된 이미지 경로
        alt={`${modelName} ${index + 1}`}
        style={{ width: "100%", height: "auto", transition: "opacity 0.3s ease-in-out" }}
      />
    </div>
  );
};

export default HoverRotateImg;
