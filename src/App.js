import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./pages/Main/Main";
import Foot from "./component/Footer/Foot";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const checkSession = async (navigate) => {
  const token = sessionStorage.getItem("Authorization");
  if (!token) return; 
  try {
      await axios.get("http://localhost:8080/check-session", {
          headers: { Authorization: token }
      });
  } catch (error) {
      if (error.response && error.response.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("email");
          axios.defaults.headers.common["Authorization"] = "";
          navigate("/");
      }
  }
};
function App() {
  const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => checkSession(navigate), 60000); // 1분마다 실행
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, [navigate]);
  return (
    <>
      <Main />
      <Foot/>
    </>

  );
}

export default App;
