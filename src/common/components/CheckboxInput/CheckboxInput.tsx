import React, { ChangeEvent, memo } from 'react'
import { Checkbox } from '@material-ui/core'

type CheckboxPropsType = {
  onChange: (checked: boolean) => void
  checked: boolean
}
const CheckboxInput = memo((props: CheckboxPropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.checked)
  }
  return <Checkbox checked={props.checked} onChange={onChangeHandler} />
})

export default CheckboxInput
