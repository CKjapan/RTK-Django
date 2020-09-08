import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TaskList.module.css";

import TaskItem from "./TaskItem";
//loginSliceのcreateAsyncThunk,extraReducersをReducersをimport
import { fetchAsyncProf } from "../login/loginSlice";

import {
  // tasksSliceのstate参照関数をimport
  selectTasks, // tasks: [{id: 0,title: "",created_at: "",updated_at: "",},]
  //TasksSliceのcreateAsyncThunk,extraReducersをReducersをimport
  fetchAsyncGet,
} from "./taskSlice";

const TaskList = () => {
  // RTKのuseDispatchを使えるようにする。
  const dispatch = useDispatch();
  // RTKのuseSelectorを使ってtasks: [{id: 0,title: "",created_at: "",updated_at: "",},]を変数に
  const tasks = useSelector(selectTasks);

  // 第1引数はRenderされた時に実行される関数、第2引数は第1引数の関数が実行されるタイミングをコントロール/[dispatch]でdispatchされた時に限定する。
  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet());
      await dispatch(fetchAsyncProf());
    };
    fetchTaskProf();
  }, [dispatch]);

  return (
    <div>
      <ul className={styles.taskList}>
        {/* TaskItemにtasksを1つずつ渡す */}
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
