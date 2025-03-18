import { useCallback, useEffect, useState } from "react";
import style from "./Login.module.css";
import CryptoJS from "crypto-js";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [name, setName] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const Authorization = sessionStorage.getItem("Authorization");
  const username = sessionStorage.getItem("username");
  const setAuthorizationHeader = () => {
    if (Authorization && username) {
      axios.defaults.headers.common['Authorization'] = Authorization; 
      return username; // username을 반환하여 상태로 설정 가능
    }
    return null; // username이 없으면 null 반환
  };
  useEffect(() => { // 컴포넌트가 렌더링될 때마다 sessionStorage에서 값을 읽어옴
    const username = setAuthorizationHeader();
    if (username) {
      setName(username); // 로그인 상태인 경우 username 설정
    }
  }, []); // 빈 배열로 useEffect가 한 번만 실행되게 설정 (초기 렌더링)
   
  const [message, setMessage] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const changeInput = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateInput = useCallback(
    (name, value) => {
      const emailRegEx =
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
      const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

      let errorMsg = "";
      let valid = false;

      if (name === "email") {
        valid = emailRegEx.test(value);
        errorMsg = valid ? "" : "유효한 이메일 주소를 입력하세요.";
      } else if (name === "password") {
        valid = passwordRegEx.test(value);
        errorMsg = valid
          ? ""
          : "비밀번호는 8~20자의 영문자 및 숫자로 구성되어야 합니다.";
      } else if (name === "username") {
        valid = value.trim().length >= 2 && value.trim().length <= 5;
        errorMsg = valid ? "" : "정확한 이름을 입력해주세요.";
      }

      setMessage((prev) => ({ ...prev, [name]: errorMsg }));
      setIsValid((prev) => ({ ...prev, [name]: valid }));
    },
    [data.password]
  );

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (!Object.values(isValid).every(Boolean)) return;

      const hashedPassword = CryptoJS.SHA256(data.password).toString();
      const userData = {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/tokenLogin",
          userData
        );
        const token = response.data.Authorization;
        sessionStorage.setItem("Authorization", token);
        sessionStorage.setItem("username", response.data.username);
        axios.defaults.headers.common["Authorization"] = token;

        setName(response.data.username);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [data, isValid]
  );

  const emailCheck = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          `http://localhost:8080/emailCheck?email=${data.email}`
        );

        setIsEmail(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [data, isValid]
  );

  const handlerLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/logout`
      );
      sessionStorage.removeItem("Authorization");
      sessionStorage.removeItem("username");
      axios.defaults.headers.common["Authorization"] = '';
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className={style.background}>
      <img
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        alt="logo"
        className={style.logo}
      />
      <form className={style.box} onSubmit={handleLogin}>
        <h2>사용자 계정 로그인</h2>
        <div>
          <h3 className={style.line}>사용자 이메일</h3>
          <p>등록된 이메일 주소를 입력해주세요.</p>
          <input
            className={style.login}
            type="email"
            name="email"
            placeholder="이메일 주소 *"
            value={data.email}
            onChange={changeInput}
            onBlur={(e) => validateInput(e.target.name, e.target.value)}
            required
          />
          <span onClick={emailCheck} className={style.check}>
            이메일 확인
          </span>
          <p className={message.email ? style.empty : style.hidden}>
            {message.email}
          </p>
        </div>
        {isEmail ? (
          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호 *"
              value={data.password}
              onChange={changeInput}
              onBlur={(e) => validateInput(e.target.name, e.target.value)}
              required
              className={style.password}
            />
            <p className={message.password ? style.empty : style.hidden}>
              {message.password}
            </p>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={handleLogin}
          className={
            Object.values(isValid).every(Boolean) ? style.btn : style.fail
          }
        >
          사용자 계정 만들기
        </button>
        <div className={style.msg}>
          아이디가 없다면? <span>회원가입</span>
        </div>
        <p>{username&& Authorization  ? <div> <p>{name}</p> <p onClick={handlerLogout}>로그아웃</p> </div>: "" }</p>
        
      </form>
    </div>
  );
}

export default Login;
