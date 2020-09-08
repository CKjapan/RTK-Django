import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TaskInput.module.css";
import Button from "@material-ui/core/Button";

import {
  //loginSliceのreducersをimport
  editTask,
  //loginSliceのstate参照関数をimport
  selectEditedTask, //selectedTask: {id: 0,title: "",created_at: "",updated_at: "",}
  //TasksSliceのcreateAsyncThunk,extraReducersをReducersをimport
  fetchAsyncCreate,
  fetchAsyncUpdate,
} from "./taskSlice";

const TaskInput = () => {
  // RTKのuseDispatchを使えるようにする。
  const dispatch = useDispatch();

  // RTKのuseSelectorを使ってelectedTask: {id: 0,title: "",created_at: "",updated_at: "",}を変数に
  const editedTask = useSelector(selectEditedTask);

  const handleInputChange = (e) => {
    // const editedTaskが空だったら
    editedTask.id === 0
      ? // 新規作成/idなしでstateのeditedTaskを更新
        dispatch(editTask({ id: 0, title: e.target.value }))
      : // editedTaskのidでstateのeditedTaskを更新
        dispatch(editTask({ id: editedTask.id, title: e.target.value }));
  };

  // stateのeditedTaskのtitleが空だったらtrueに
  const isDisabled = editedTask.title.length === 0;

  // 新規作成関数
  const createClicked = () => {
    // editedTaskを引数にfetchAsyncCreate(post)発火。
    dispatch(fetchAsyncCreate(editedTask));
    //stateのeditedTaskを初期化
    dispatch(editTask({ id: 0, title: "" }));
  };

  // 更新関数
  const updateClicked = () => {
    //editedTaskを引数にfetchAsyncUpdate(put)発火。
    dispatch(fetchAsyncUpdate(editedTask));
    //stateのeditedTaskを初期化
    dispatch(editTask({ id: 0, title: "" }));
  };

  return (
    <div>
      {/* インプットフォーム */}
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.title}
        onChange={handleInputChange}
        placeholder="Please ipnut task"
      />

      {/* 新規作成or更新ボタン */}
      <div className={styles.switch}>
        {/* editedTask.idがゼロなら */}
        {editedTask.id === 0 ? (
          <Button
            variant="contained"
            disabled={isDisabled}
            // createClicked関数を発火。
            onClick={createClicked}
            color="primary"
          >
            Create
          </Button>
        ) : (
          // editedTask.idが空じゃないなら
          <Button
            variant="contained"
            disabled={isDisabled}
            // updateClicked関数を発火。
            onClick={updateClicked}
            color="primary"
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskInput;
