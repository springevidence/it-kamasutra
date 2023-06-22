import React, {ChangeEvent} from 'react';
import {Checkbox} from "@material-ui/core";


type CheckboxPropsType = {
    callback: (checked:boolean) => void
    checked: boolean
}
const CheckboxInput = (props: CheckboxPropsType) => {
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }
    return (
        <Checkbox checked={props.checked} onChange={onChangeHandler}/>
    );
};

export default CheckboxInput;