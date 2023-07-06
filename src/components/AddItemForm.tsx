import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";

type PropsType = {
    callback: (title: string) => void
}
const AddItemForm = React.memo((props: PropsType) => {
    console.log('AddItemForm is called')
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
        if (error !== null) {
            setError(null);
        }
        if (event.key === "Enter") {
            addTask()
        }
    }
    return (
        <div>
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
        </div>
    );
});

export default AddItemForm;