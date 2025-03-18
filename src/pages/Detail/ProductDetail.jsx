import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("Authorization");
    axios
      .get(`http://localhost:8080/getProduct/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더 추가
        },
      })
      .then((response) => 
        setProduct(response.data)
       )
      .catch((error) =>
        console.error("상품 상세 정보를 불러오는 중 오류 발생:", error)
      );
  }, [id]);

  if (!product) {
    return <p className={style.loading}>상품 정보를 불러오는 중...</p>;
  }
  console.log(product);
  return (
    <div className={style.container}>
      <div className={style.imgBox}>
        <img
          className={style.mainImage}
          src={`/img/Productimg/${product.model}/${product.model}.png`}
          alt={product.model}
        />
        <h2 className={style.name}>The new {`${product.model} ${product.brand}`}</h2>
      </div>

      <div className={style.description}>
        <div>
          <h3>{product.horsepower}</h3>
          <p>최고출력(ps)</p>
        </div>
        <div>
          <h3>{product.maxSpeed}km/h</h3>
          <p>최대속도</p>
        </div>
        <div>
          <h3>{product.price.toLocaleString()}원</h3>
          <p>가격</p>
        </div>
      </div>
      <div className={style.banner}>
        <img
          className={style.bannerImage}
          src={`/img/Productimg/${product.model}/${product.model}${1}.png`}
          alt={product.model}
        />
        <div className={style.bannerText}>
          <p>{`${product.model} ${product.brand}`}</p>
          <p>{`${product.model} ${product.brand}`}에 대해 알아보세요.</p>
        </div>
      </div>
      <div className={style.mainContainer}>
        <div className={style.mainBox}>
          <img
            className={style.bannerImage}
            src={`/img/Productimg/${product.model}/${product.model}${2}.png`}
            alt={product.model}
          />
          <h2>DYNAMIC FROM EVERY PERSPECTIVE.</h2>
          <p>
            컴포트 서스펜션이 장착되어 장거리 주행 시에도 높은 수준의 안락함과
            부드러운 코너링으로 뛰어난 드라이빙 퍼포먼스를 선사합니다.
          </p>
        </div>
        <div className={style.mainBox}>
          <img
            className={style.bannerImage}
            src={`/img/Productimg/${product.model}/${product.model}${3}.png`}
            alt={product.model}
          />
          <h3>EVERYDAY. BUT WITH {`${product.model}`}</h3>
          <p>
            10.25인치 고해상도 디스플레이와 최신 세대의 스티어링 휠, MBUX
            인포테인먼트 시스템을 통해 펼쳐지는 럭셔리 클래스의 혁신을 경험해
            보세요.
          </p>
        </div>
      </div>
      <div className={style.exterior}>
        <h2>{`${product.model} ${product.brand}`}의 외형사진</h2>
        <p>
          메르세데스-벤츠 스타 패턴의 라디에이터 그릴과 날렵한 보닛의 파워 돔,
          새로운 후면부 디자인으로 스포티한 감각과 럭셔리 세단의 미학을
          담아내었습니다. 또한, 고성능 LED 헤드램프와 테일램프를 통해 어둠
          속에서도 The new {`${product.model} ${product.brand}`}의 0스포티한
          감성적 외관을 돋보이게 합니다.
        </p>
        <img
            className={style.bannerImage}
            src={`/img/Productimg/${product.model}/${product.model}${4}.png`}
            alt={product.model}
          />
      </div>
      <button className={style.backButton} onClick={() => navigate(-1)}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default ProductDetail;
