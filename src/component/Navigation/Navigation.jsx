import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Navigation.module.css"
import { Link } from "react-router-dom";
import axios from "axios";

function Navigation() {
  const Authorization = sessionStorage.getItem("Authorization");
  const username = sessionStorage.getItem("username");
  const [name,setName] = useState('');
  const setAuthorizationHeader = () => {
    if (Authorization && username) {
      axios.defaults.headers.common["Authorization"] = Authorization;
      return username; // username을 반환하여 상태로 설정 가능
    }
    return null; // username이 없으면 null 반환
  };
  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 sessionStorage에서 값을 읽어옴
    const username = setAuthorizationHeader();
    if (username) {
      setName(username); // 로그인 상태인 경우 username 설정
    }
  }, []); // 빈 배열로 useEffect가 한 번만 실행되게 설정 (초기 렌더링)
  const handlerLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/logout`,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("Authorization"),
          },
        }
      );
      sessionStorage.removeItem("Authorization");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("email");
      axios.defaults.headers.common["Authorization"] = "";
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <header className={style.navBar}>
        <nav className={style.navLeft}>
          <Link to="/product">Models</Link>
          <Link to="/Wish">WishList</Link>
        </nav>
        <div className={style.navLogo}>
          <Link to="/">
            <img
              src="https://assets.oneweb.mercedes-benz.com/plugin/hp-assets/latest/images/brands/mercedes-benz/logo.svg"
              alt="Mercedes-Benz Logo"
              className={style.logo}
            />
          </Link>
        </div>
        <p>
          {username && Authorization ? (
            <div className={style.navRight}>
              <p>{name}</p> <p onClick={handlerLogout}>로그아웃</p>
            </div>
          ) : (
            <nav className={style.navRight}>
              <Link to="/signup">Sign up</Link>
              <Link to="/login">Login</Link>
            </nav>
          )}
        </p>
      </header>
    </div>
  );
}

export default Navigation;
