import ModelCard from "../../component/Models/ModelCard";
import style from "./Main.module.css";
function Main() {
  return (
    <div className={style.container}>
      <div className={style.videoContainer}>
        <video autoPlay loop muted className={style.backgroundVideo}>
          <source src="/video/mainvideo.mp4" type="video/mp4" />
        </video>
        <div className={style.overlayText}>
          <h2>새롭게, 한계를 뛰어넘다.</h2>
          <p>The all-new G 580.</p>
          <div className={style.buttonGroup}>
            <button className={style.btnOutline}>자세히 보기</button>
            <button className={style.btnPrimary}>메르세데스-벤츠 스토어</button>
          </div>
        </div>
      </div>



  <div className={style.banner}>
  <div className={style.bannerItem}>
    <img src="https://www.mercedes-benz.co.kr/content/dam/south-korea/passenger-cars/home/2025/S-Class_mb_logo_v02-1094x7885.jpg" alt="Mercedes Logo" />
    
    <div>
      <h1>4월 1일부로 차량의 권장소비자가격이 인상됩니다.</h1>
      <p>중앙일보 '올해의 세단' 등 3관왕 달성 기념</p>
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
      <p>메르세데스-벤츠가 인증하는 198가지 항목의 품질 검사
      지금 바로 인증 중고차를 만나보세요.</p>
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


      <div>
        <h1 className={style.productText}>Our Models</h1>
        <ModelCard />
      </div>
    </div>
  );
}

export default Main;
