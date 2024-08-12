import React, { FC, useCallback, useEffect } from 'react'
import AddItemForm from 'common/components/AddItemForm/AddItemForm'
import EditableSpan from 'common/components/EditableSpan.stories/EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import style from './Todolist.module.css'
import { FilterValuesType, TodolistDomainType, todolistsActions, todolistsThunks } from '../../model/todolistsSlice'
import { Task } from './Task/Task'
import { useAppDispatch } from 'common/hooks/UseAppDispatch'
import { tasksThunks } from 'features/TodolistList/model/tasksSlice'
import { TaskType } from 'features/TodolistList/api/taskApi.types'

type Props = {
  tasks: TaskType[]
  demo?: boolean
  todolist: TodolistDomainType
}

export const TodoList = React.memo(
  ({demo = false, todolist, tasks} : Props) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
      if (demo) {
        return
      }
      dispatch(tasksThunks.fetchTasks(todolist.id))
    }, [])

    const changeFilterHandler = (filter: FilterValuesType, todolistId: string) => {
      dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter }))
    } 
  
    const removeTodolistHandler = () => {
      dispatch(todolistsThunks.removeTodolist({ todolistId: todolist.id }))
    }

    const updateTodolistTitleHandler = (updateTitle: string) => {
      dispatch(todolistsThunks.changeTodolistTitle({ todolistId: todolist.id, title: updateTitle }))
    }

    const addTaskHandler = (title: string) => {
      dispatch(tasksThunks.addTask({ todolistId: todolist.id, title }))
    }



    const onAllClickHandler = () => changeFilterHandler('all', todolist.id)
    const onActiveClickHandler = () => changeFilterHandler('active', todolist.id)
    const onCompletedClickHandler = () => changeFilterHandler('completed', todolist.id)

    return (
      <div className={style.todolist}>
        <h3>
          <EditableSpan
            oldTitle={todolist.title}
            onChange={updateTodolistTitleHandler}
          />
          <IconButton
            aria-label="delete"
            onClick={removeTodolistHandler}
            disabled={todolist.entityStatus === 'loading'}
          >
            <Delete />
          </IconButton>
        </h3>
        <AddItemForm callback={addTaskHandler} disabled={todolist.entityStatus === 'loading'} />
        <div>
          {tasks?.map((task) => (
            <Task
              task={task}
              key={task.id}
            />
          ))}
        </div>
        <div className={style.filtredButtons}>
          <Button variant={todolist.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>
            All
          </Button>
          <Button
            color={'primary'}
            variant={todolist.filter === 'active' ? 'contained' : 'text'}
            onClick={onActiveClickHandler}
          >
            Active
          </Button>
          <Button
            color={'secondary'}
            variant={todolist.filter === 'completed' ? 'contained' : 'text'}
            onClick={onCompletedClickHandler}
          >
            Completed
          </Button>
        </div>
      </div>
    )
  },
)
