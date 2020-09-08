import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/";
// localStorageからlocalJWTというkeyの情報を取得。
const token = localStorage.localJWT;

// 非同期処理createAsyncThunkはsliceの外で定義する。
// thunkを作成し、「pending」「fulfilled」「rejected」というpostfix付きのactionを発行する。
// fulfilled後の処理はextraReducersで定義。
// 第1引数はactionの名前/第2引数は非同期処理。

// 1.authをjwt作成urlにpost。
export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  // axiosの第1引数はURL,第2引数はデータ,第3引数はconfig。
  const res = await axios.post(`${apiUrl}authen/jwt/create`, auth, {
    headers: {
      // jsonでpostしたい時に指定。
      "Content-Type": "application/json",
    },
  });
  // 戻り値
  return res.data;
});

// 2.authを新規ユーザー作成urlにpost。
export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

// 3.idとusernameを取得。
export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
  const res = await axios.get(`${apiUrl}api/myself/`, {
    headers: {
      // jwtを添付。
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

// axiosの第1引数はsliceの名前,第2引数はsliceの初期値,第3引数はreducers,第4引数はextraReducers
const loginSlice = createSlice({
  // sliceの名前
  name: "login",
  initialState: {
    authen: {
      username: "",
      password: "",
    },
    isLoginView: true,
    profile: {
      id: 0,
      username: "",
    },
  },
  // reducerとは「変化させるもの」、プログラミングで言うところの関数。/Stateに対して許可する更新処理を定義する場所。
  // reducerの中でaction定義。
  reducers: {
    // state, actionを受け取ってstateをactionの値で更新。
    editUsername(state, action) {
      state.authen.username = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    // stateを受け取ってstateのtrue,flseを反転。
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  // 別のSlice等で生成されたActionに反応したい場合に定義する
  extraReducers: (builder) => {
    // addCaseは「pending」「fulfilled」「rejected」で処理を分けることができる。/fetchAsyncLogin.fulfilled,以降はreducersと同じ。
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      // console.log(action.payload);
      // action.payload.accessはlogin/postにpostした後の戻り値のkeyの1つ。
      // action.payload.accessがtrue(値が入っていたなら)画面遷移する。
      action.payload.access && (window.location.href = "/tasks");
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

// reducersを他のcomponentで利用出来るようにexport。
export const { editUsername, editPassword, toggleMode } = loginSlice.actions;

// stateを他のcomponentから参照出来るようにexport。
export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;

// storeに登録するためsliceをexport。
export default loginSlice.reducer;
