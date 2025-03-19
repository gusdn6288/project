import React from "react";
import Wishlist from "../../component/Wishlist/Wishlist";
import Foot from "../../component/Footer/Foot";
import style from "./Wish.module.css"
function Wish() {
  return (
    <div className={style.container}>
      <Wishlist />
      <Foot/>
    </div>
  );
}
export default Wish;
