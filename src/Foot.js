import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ React Router 네비게이션 추가
import "./Foot.css"; // 스타일 파일 연결

const Foot = () => {
 

  return (
    <footer className="footer">
      {/* 맨 위로 가기 버튼 */}
      <div className="back-to-top">
        <span>맨 위로</span>
      </div>

      {/* 회원 가입 섹션 */}
      <div className="newsletter">
        <p className="newsletter-title">회원 가입하고 소식 받기</p>
        <p>Mercedes-Benz 계정을 등록하고 최신 소식을 받아보세요.</p>
        {/* ✅ 버튼 클릭 시 회원가입 페이지로 이동 */}
      
      </div>

      {/* 푸터 네비게이션 */}
      <div className="footer-links">
        <div className="footer-column">
          <h4>Models</h4>
          <ul>
            <li>전기 자동차</li>
            <li>플러그인 하이브리드</li>
            <li>SUV</li>
            <li>Cabriolet & Roadster</li>
            <li>Sedan</li>
            <li>Coupé</li>
            <li>Hatchback</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Buy Online</h4>
          <ul>
            <li>금융 프로모션</li>
            <li>메르세데스-벤츠 스토어</li>
            <li>인증 중고차 스토어</li>
            <li>온라인 라이브 상담</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Buying Guide</h4>
          <ul>
            <li>금융 상품 안내</li>
            <li>온라인 구매 가이드</li>
            <li>시승 신청</li>
            <li>전시장 찾기</li>
            <li>카탈로그</li>
            <li>가격표</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li>온라인 서비스 예약</li>
            <li>서비스 상품 안내</li>
            <li>긴급 출동 서비스</li>
            <li>사용 설명서</li>
            <li>보증 서비스</li>
            <li>서비스 센터 찾기</li>
            <li>공지사항</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Technology</h4>
          <ul>
            <li>메르세데스-벤츠 전기차</li>
            <li>충전 및 디지털 서비스</li>
            <li>메르세데스-드라이빙 어시스턴스</li>
            <li>MBUX 멀티미디어 시스템</li>
            <li>Concept & Future Cars</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About us</h4>
          <ul>
            <li>히스토리 & 브랜드</li>
            <li>뉴스 & 이벤트</li>
            <li>Contact Point</li>
            <li>Van</li>
            <li>메르세데스-벤츠 파이낸셜 서비스 코리아</li>
            <li>MB Mobility Korea</li>
            <li>개인정보보호</li>
          </ul>
        </div>
      </div>

      {/* 회사 정보 */}
      <div className="footer-bottom">
        <p>©2025 메르세데스-벤츠 코리아(주) / Mercedes-Benz Financial Services Korea(주)</p>
        <p>개인정보 처리방침 | 법적 고지 | 쿠키 정책 | 공급자 정보</p>
        <p>고객센터: 080-001-1886 | 이메일: mbk.cs@mercedes-benz.com</p>
      </div>
    </footer>
  );
};

export default Foot;
