import React from "react";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
//loginSliceのstate参照関数をimport
import {
  selectProfile, //state:{authen: {id: 0,username: ""}}
} from "./loginSlice";

const Header = () => {
  const profile = useSelector(selectProfile);
  return (
    <div className={styles.header}>
      <h3>{profile.username}</h3>
      <h1>Today's task</h1>
    </div>
  );
};

export default Header;
