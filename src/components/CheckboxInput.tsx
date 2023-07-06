import React, {ChangeEvent} from 'react';
import {Checkbox} from "@material-ui/core";


type CheckboxPropsType = {
    onChange: (checked:boolean) => void
    checked: boolean
}
const CheckboxInput = (props: CheckboxPropsType) => {
    console.log(CheckboxInput)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.checked)
    }
    return (
        <Checkbox checked={props.checked} onChange={onChangeHandler}/>
    );
};

export default CheckboxInput;