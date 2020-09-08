import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Login.module.css";

import Button from "@material-ui/core/Button";

import {
  //loginSliceのreducersをimport
  editUsername,
  editPassword,
  toggleMode,
  //loginSliceのstate参照関数をimport
  selectAuthen, //state:{authen: {username: "",password: ""}}
  selectIsLoginView, //state:{isLoginView: true}
  //loginSliceのcreateAsyncThunk,extraReducersをReducersをimport
  fetchAsyncLogin,
  fetchAsyncRegister,
} from "./loginSlice";

const Login = () => {
  // RTKのuseDispatchを使えるようにする。
  const dispatch = useDispatch();

  // RTKのuseSelectorを使ってstate:{authen: {username: "",password: ""}}を変数に
  const authen = useSelector(selectAuthen);
  // RTKのuseSelectorを使ってstate:{isLoginView: true}を変数に
  const isLoginView = useSelector(selectIsLoginView);

  // usernameかpasswordが空ならbtnDisablerをtrueに
  const btnDisabler = authen.username === "" || authen.password === "";

  const login = async () => {
    // isLoginViewがtrueなら
    if (isLoginView) {
      //const authenを引数にfetchAsyncLogin発火、成功したらfetchAsyncLogin.fulfilled発火
      await dispatch(fetchAsyncLogin(authen));
    } else {
      // isLoginViewがflseならauthenを引数にfetchAsyncRegister発火、成功したらfetchAsyncRegister.fulfilled発火
      const result = await dispatch(fetchAsyncRegister(authen));
      // fetchAsyncRegister.fulfilledとconst resultが一致する場合、const authenを引数にfetchAsyncLogin発火、成功したらfetchAsyncLogin.fulfilled発火
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(authen));
      }
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        {/* タイトル */}
        {/* state:{isLoginView: }がtrue,flseでタイトル変える */}
        <h1>{isLoginView ? "Login" : "Register"}</h1>

        {/* 入力フォーム */}
        <span>Username</span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder=""
          // e.target.valueを引数にeditUsername発火。/state:{authen: {username: ""}}が更新される。
          onChange={(e) => dispatch(editUsername(e.target.value))}
          required
        />
        <span>Password</span>
        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder=""
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />

        {/* ログインor新規作成ボタン */}
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabler}
            color="primary"
            // 上のlogin関数発火
            onClick={login}
          >
            {/* state:{isLoginView: }がtrue,flseでタイトル変える */}
            {isLoginView ? "Login" : "Create"}
          </Button>
        </div>

        {/* ログインor新規作成 切り替えボタン */}
        <span
          className={styles.switchText}
          // toggleMode発火。/state:{isLoginView: true}を反転
          onClick={() => dispatch(toggleMode())}
        >
          {/* state:{isLoginView: }がtrue,flseでタイトル変える */}
          {isLoginView ? "Create Account ?" : "Back to Login"}
        </span>
      </div>
    </div>
  );
};

export default Login;
