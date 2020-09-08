import React from "react";
import { useSelector } from "react-redux";
import styles from "./TaskDetails.module.css";

import {
  //loginSliceのstate参照関数をimport
  selectSelectedTask, //selectedTask: {id: 0,title: "",created_at: "",updated_at: "",}
} from "./taskSlice";

const TaskDetails = () => {
  // RTKのuseSelectorを使ってselectedTask: {id: 0,title: "",created_at: "",updated_at: "",}を変数に
  const selectedTask = useSelector(selectSelectedTask);
  return (
    <div className={styles.details}>
      {/* selectedTask.titleがflse(中身がある)でない場合、h2以下を返す。 */}
      {selectedTask.title && (
        <>
          <h2>{selectedTask.title}</h2>
          <p>Created at </p>
          <h3>{selectedTask.created_at}</h3>
          <p>Updated at </p>
          <h3>{selectedTask.updated_at}</h3>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
