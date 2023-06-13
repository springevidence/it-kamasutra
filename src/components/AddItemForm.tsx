import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";

type PropsType = {
    callback: (title: string) => void
}
const AddItemForm = (props: PropsType) => {
    const [inputTitle, setInputTitle] = useState('')
    const [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if (inputTitle.trim() !== "") {
            props.callback(inputTitle)
            setInputTitle('')
        } else {
            setError("Field is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            addTask()
        }
    }
    return (
        <div>
            {/*<input value={inputTitle}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyDownHandler}*/}
            {/*       className= {error ? "error" : ""}/>*/}
            <TextField label="Type item"
                       value={inputTitle}
                       variant={"outlined"}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       helperText={error}/>
            <IconButton color="primary" onClick={addTask}>
                <AddCircle/>
            </IconButton>
            {/*<button onClick={addTask}>+</button>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

export default AddItemForm;