import { useCallback, useState } from "react";
import style from "./SignUp.module.css";
import CryptoJS from "crypto-js";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  const [message, setMessage] = useState({
    email: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    username: false,
    password: false,
    passwordCheck: false,
  });

  const changeInput = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateInput = useCallback( (name, value) => {
      const emailRegEx =/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
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
      } else if (name === "passwordCheck") {
        valid = value === data.password;
        errorMsg = valid ? "" : "비밀번호와 일치하지 않습니다.";
      } else if (name === "username") {
        valid = value.trim().length >= 2 && value.trim().length <= 5;
        errorMsg = valid ? "" : "정확한 이름을 입력해주세요.";
      }

      setMessage((prev) => ({ ...prev, [name]: errorMsg }));
      setIsValid((prev) => ({ ...prev, [name]: valid }));
    },
    [data.password]
  );

  const handleSubmit = useCallback(
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
          "http://localhost:8080/insertUser",
          userData
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    [data, isValid]
  );

  return (
    <div className={style.background}>
      <img
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        alt="logo"
        className={style.logo}
      />
      <form className={style.box} onSubmit={handleSubmit}>
        <h2>사용자 계정 만들기</h2>
        <div>
          <h3 className={style.line}>사용자 이메일</h3>
          <p>이메일 주소는 계정의 Id로 사용됩니다.</p>
          <input
            type="email"
            name="email"
            placeholder="이메일 주소 *"
            value={data.email}
            onChange={changeInput}
            onBlur={(e) => validateInput(e.target.name, e.target.value)}
            required
          />
          <p className={message.email ? style.empty : style.hidden}>
            {message.email}
          </p>
        </div>
        <div>
          <h3 className={style.line}>개인 정보</h3>
          <input
            type="text"
            name="username"
            placeholder="이름 *"
            value={data.username}
            onChange={changeInput}
            onBlur={(e) => validateInput(e.target.name, e.target.value)}
            required
          />
          <p className={message.username ? style.empty : style.hidden}>
            {message.username}
          </p>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 *"
            value={data.password}
            onChange={changeInput}
            onBlur={(e) => validateInput(e.target.name, e.target.value)}
            required
          />
          <p className={message.password ? style.empty : style.hidden}>
            {message.password}
          </p>
          <input
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인 *"
            value={data.passwordCheck}
            onChange={changeInput}
            onBlur={(e) => validateInput(e.target.name, e.target.value)}
            required
          />
          <p className={message.passwordCheck ? style.empty : style.hidden}>
            {message.passwordCheck}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className={
            Object.values(isValid).every(Boolean) ? style.btn : style.fail
          }
        >
          사용자 계정 만들기
        </button>
        <div className={style.msg}>
          아이디가 이미 존재하다면?  <span>로그인</span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
