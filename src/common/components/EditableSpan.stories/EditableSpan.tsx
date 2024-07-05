import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField } from '@material-ui/core'

type PropsType = {
  oldTitle: string
  onChange: (updateTitle: string) => void
}
const EditableSpan = React.memo((props: PropsType) => {


  const [edit, setEdit] = useState(false)
  const [updateTitle, setUpdateTitle] = useState(props.oldTitle)

  const editHandler = () => {
    if (edit) {
      addTaskHandler()
    }
    setEdit(!edit)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.currentTarget.value)
  }
  const addTaskHandler = () => {
    props.onChange(updateTitle)
  }
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      editHandler()
    }
  }
  return edit ? (
    <TextField
      label="Type item"
      value={updateTitle}
      variant={'outlined'}
      onChange={onChangeHandler}
      onBlur={editHandler}
      onKeyDown={onKeyDownHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editHandler}>{props.oldTitle}</span>
  )
})

export default EditableSpan
