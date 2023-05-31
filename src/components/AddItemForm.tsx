import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callback: (title: string) => void
}
const AddItemForm = (props: PropsType) => {
    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState<string | null>(null);
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
            <input value={inputTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className= {error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemForm;