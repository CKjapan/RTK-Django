import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice.js";
import taskReducer from "../features/task/taskSlice.js";
// 各sliceからexport defaultされたSliceをimport

export default configureStore({
  reducer: {
    login: loginReducer,
    task: taskReducer,
  },
});
