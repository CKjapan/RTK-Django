import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/api/tasks/";
// localStorageからlocalJWTというkeyの情報を取得。
const token = localStorage.localJWT;

// 1.task一覧を取得。/state:{tasks: [{id: 0,title: "",created_at: "",updated_at: "",},]}
export const fetchAsyncGet = createAsyncThunk("task/get", async () => {
  // axiosの第1引数はURL,第2引数はデータ,第3引数はconfig。
  const res = await axios.get(apiUrl, {
    headers: {
      // jwtを添付。
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

// 2.Taskを新規作成。
export const fetchAsyncCreate = createAsyncThunk("task/post", async (task) => {
  // axiosの第1引数はURL,第2引数はデータ,第3引数はconfig。
  const res = await axios.post(apiUrl, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

// 3.TaskをUpdate。
export const fetchAsyncUpdate = createAsyncThunk("task/put", async (task) => {
  const res = await axios.put(`${apiUrl}${task.id}/`, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

// 4.Taskを削除。
export const fetchAsyncDelete = createAsyncThunk("task/delete", async (id) => {
  await axios.delete(`${apiUrl}${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return id;
});

// axiosの第1引数はsliceの名前,第2引数はsliceの初期値,第3引数はreducers,第4引数はextraReducers
const taskSlice = createSlice({
  // sliceの名前
  name: "task",
  initialState: {
    tasks: [
      {
        id: 0,
        title: "",
        created_at: "",
        updated_at: "",
      },
    ],
    editedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
    selectedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
  },
  // reducerとは「変化させるもの」、プログラミングで言うところの関数。/Stateに対して許可する更新処理を定義する場所。
  // reducerの中でaction定義。
  reducers: {
    // 編集中のstateを保持
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    // 選択したstateを保持
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  // 別のSlice等で生成されたActionに反応したい場合に定義する
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        // 現在のstateのtasksに{action.payload}を上書き。
        ...state,
        tasks: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        // 現在のstateのtasksの先頭に{action.payload}を入れる。
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        // stateのtasksを1つずつ配列に入れながらaction.payload.idと一致するか確かめる。一致したならaction.payloadを配列に入れて、一致してなかったらtのままにしておく。
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        // stateのselectedTaskをaction.payloadに上書き。
        selectedTask: action.payload,
      };
    });
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        // action.payloadのidと一致しないもので配列作成
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        // stateのselectedTaskを初期値に上書き
        selectedTask: { id: 0, title: "", created_at: "", updated_at: "" },
      };
    });
  },
});

// reducersを他のcomponentで利用出来るようにexport。
export const { editTask, selectTask } = taskSlice.actions;

// stateを他のcomponentから参照出来るようにexport。
export const selectSelectedTask = (state) => state.task.selectedTask;
export const selectEditedTask = (state) => state.task.editedTask;
export const selectTasks = (state) => state.task.tasks;

// storeに登録するためsliceをexport。
export default taskSlice.reducer;
