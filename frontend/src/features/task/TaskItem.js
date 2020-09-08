import React from "react";
import { useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import styles from "./TaskItem.module.css";

import {
  //loginSliceのreducersをimport
  editTask,
  selectTask,
  //TasksSliceのcreateAsyncThunk,extraReducersをReducersをimport
  fetchAsyncDelete,
} from "./taskSlice";

const TaskItem = ({ task }) => {
  // RTKのuseDispatchを使えるようにする。
  const dispatch = useDispatch();

  return (
    <li className={styles.listItem}>
      {/* タイトル */}
      <span
        className={styles.cursor}
        // TaskListから受け取ったtaskを引数にselectTask発火。/selectedTask: {id: 0,title: "",created_at: "",updated_at: "",}を更新。
        onClick={() => dispatch(selectTask(task))}
      >
        {task.title}
      </span>

      <div>
        {/* ゴミ箱ボタン */}
        <button
          // TaskListから受け取ったtaskを引数にfetchAsyncDelete発火。
          onClick={() => dispatch(fetchAsyncDelete(task.id))}
          className={styles.taskIcon}
        >
          <BsTrash />
        </button>

        {/* 編集ボタン */}
        <button
          // TaskListから受け取ったtaskを引数にeditTask発火。
          onClick={() => dispatch(editTask(task))}
          className={styles.taskIcon}
        >
          <FaEdit />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
