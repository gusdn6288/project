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
      <div>
        <h1 className={style.productText}>Our Models</h1>
        <ModelCard />
      </div>
    </div>
  );
}

export default Main;
