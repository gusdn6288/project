import ModelCard from "../../component/Models/ModelCard";
import style from "./Main.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function Main() {
  // 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const navigate = useNavigate();
  const movePage = () => {
    navigate('/product',{
    });
  }

  const movedetail = () => {
    navigate('/productDetail/2',{
    });
  }
  return (
    <div className={style.container}>
      {/* 배경 비디오 섹션 */}
      <div className={style.videoContainer}>
        <video autoPlay loop muted className={style.backgroundVideo}>
          <source src="/video/mainvideo.mp4" type="video/mp4" />
        </video>
        <div className={style.overlayText}>
          <h2>새롭게, 한계를 뛰어넘다.</h2>
          <p>올-뉴 G 580.</p>
          <div className={style.buttonGroup}>
            <button className={style.btnOutline}onClick={movedetail}>자세히 보기</button>
            <button className={style.btnPrimary } onClick={movePage} >메르세데스-벤츠 스토어</button>
          </div>
        </div>
      </div>

      {/* 배너 섹션 */}
      <div className={style.banner}>
        <div className={style.bannerItem}>
          <img
            src="https://www.mercedes-benz.co.kr/content/dam/south-korea/passenger-cars/home/2025/S-Class_mb_logo_v02-1094x7885.jpg"
            alt="Mercedes Logo"
          />
          <div>
            <h1>4월 1일부로 차량의 권장소비자가격이 인상됩니다.</h1>
            <p>자세한 내용은 가까운 메르세데스-벤츠 공식 전시장에 문의하세요.</p>
          </div>
        </div>

        <div className={style.bannerItmeimg}>
          <div className={style.bannercontainer}>
            <div className={style.bannercontainerImg}></div>
            <p>중앙일보 '올해의 세단' 등 3관왕 달성 기념</p>
            <h1>E-Class 출고 이벤트</h1>
          </div>
          <div className={style.bannercontainer2}>
            <div className={style.bannercontainerImg2}></div>
            <p>메르세데스-벤츠가 인증하는 198가지 항목의 품질 검사 지금 바로 인증 중고차를 만나보세요.</p>
            <h1>벤츠는 메르세데스-벤츠가 제일 잘 아니까</h1>
          </div>
        </div>

        <div className={style.bannerItmeimg2}>
          <div className={style.container1}>
            <div className={style.img1}></div>
            <p>중앙일보 '올해의 세단' 등 3관왕 달성 기념</p>
            <h1>메르세데스-벤츠의 온라인 라이브 상담</h1>
          </div>
          <div className={style.container1}>
            <div className={style.img2}></div>
            <p>JOIN THE WORLD’S FASTEST FAMILY</p>
            <h1>AMG EXPERIENCE</h1>
          </div>
          <div className={style.container1}>
            <div className={style.img3}></div>
            <p>국내 유일 최대 규모, 오프로드 체험!</p>
            <h1>SUV Experience Center</h1>
          </div>
        </div>
      </div>

      {/* 모델 카드 섹션 */}
      <div>
        <h1 className={style.productText}>메르세데스-벤츠 모델</h1>
        <ModelCard />
      </div>

      {/* 서비스 및 액세서리 섹션 */}
      <div>
      <div className={style.sliderContainer}>
        <h1>Service and Accessories</h1>
          <Slider {...sliderSettings}>
            <div className={style.sliderItem}>
              <img src="https://www.mercedes-benz.co.kr/content/dam/south-korea/passenger-cars/home/2024/digital-extras-1100x830.jpg/1740083510308.jpg?im=Resize=(1280);Crop,rect=(2,128,1278,719)" alt="서비스 이미지 1" />
              <h4>당신의 메르세데스-벤츠를 위한 디지털 서비스 상품 </h4>
              <p>추가 디지털 서비스 상품을 구매하기만 하면 완전히 새로운 메르세데스-벤츠를 경험할 수 있습니다.</p>
            </div>
            <div className={style.sliderItem}>
              <img src="https://www.mercedes-benz.co.kr/content/dam/hq/passengercars/mb-oc/image-2023-6-29-10-41-24.png/1740018930046.jpg?im=Resize=(1280);Crop,rect=(0,122,1280,720)" alt="서비스 이미지 2" />
              
              <h4>서비스 안내</h4>
              <p>안전한 드라이빙을 위한 최상의 솔루션을 만나보세요.</p>
            </div>
            <div className={style.sliderItem}>
              <img src="https://www.mercedes-benz.co.kr/content/dam/south-korea/passenger-cars/home/2024/service-appointment-booking-1100x830.jpg/1740083501402.jpg?im=Resize=(1280);Crop,rect=(0,5,1271,714)" alt="서비스 이미지 3" />
              
              
              <h4>서비스 일정 예약</h4>
              <p>가까운 메르세데스-벤츠 서비스센터에 정기점검 및 간단한 서비스 일정을 손쉽게 예약해보세요.</p>
            </div>
            <div className={style.sliderItem}>
              <img src="https://www.mercedes-benz.co.kr/content/dam/hq/passengercars/mb-oc/collection-shooting-uhren-3-1.jpg/1740019000209.jpg?im=Resize=(1280);Crop,rect=(0,491,1280,720)" alt="서비스 이미지 4" />
              <h4>당신을 위한​ 순정 액세서리​</h4>
              <p>메르세데스-벤츠에서 제작한 완벽한 액세서리로 더욱 안전하고 편안하게 당신의 개성을 표현해 보세요.</p>
            </div>
          </Slider>
        </div>

        <div className={style.explanation}>

          <div >
        <h2>MBUX 하이퍼스크린</h2>
        <p>
          디지털과 아날로그 디자인이 완벽한 조화를 이룬 MBUX 하이퍼스크린을 통해 
          직관적이고 편리한 디지털 감성을 경험해 보세요. 터치 한 번으로 조명, 
          내비게이션 등 다양한 MBUX 멀티미디어 시스템을 직접적으로 제어할 수 있으며, 
          중앙 디스플레이 하단에 위치한 스위치 패널을 통해 편리하게 온도 조절이 가능합니다.
        </p>
        </div>
        <div>
        <img src="https://www.mercedes-benz.co.kr/content/dam/hq/passengercars/mb-oc/mbc98869.jpg/1741075029687.jpg?im=Resize=(800);Crop,rect=(0,0,800,600)" alt="서비스 이미지 4" />

        </div>
        
      </div>
      <div className={style.explanationContainer}>
  {/* 동영상 추가 */}
  <div className={style.videoContainer1}>
    <video autoPlay loop muted playsInline className={style.video}>
      <source src="https://www.mercedes-benz.co.kr/content/dam/hq/passengercars/mb-oc/liI-tvc-30s-eqs-wodp-wsf-weotr-16-9-vo-en-hqmaster-l-ending-h264-1-1.mp4" type="video/mp4" />
      브라우저가 비디오 태그를 지원하지 않습니다.
    </video>
  </div>

  <div className={style.textContainer}>
    <h2>자동차의 시작,
    138년의 혁신</h2>
    <p>
    138년간의 개척 정신과 혁신을 이어 받아 순수 전기 시대를 선도하는 메르세데스-벤츠는 단순 이동 수단이 아닌 그 이상을 제공합니다. 최첨단 기술 덕분에 모바일 오피스, 안전한 공간, 프라이빗한 영화관 등이 한 공간에서 만나 당신의 모든 니즈를 충족시킵니다.
    </p>

  </div>
</div>



      </div>
    </div>
  );
}

export default Main;
