import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type PropsType = {
    oldTitle: string
    callback: (updateTitle: string) => void
}
const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        if (edit) {
            addTaskHandler()
        }
        setEdit(!edit)
    }
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.callback(updateTitle)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            editHandler()
        }
    }
    return (
        edit
            ? <input onChange={onChangeHandler} value={updateTitle} onBlur={editHandler} onKeyDown={onKeyDownHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;