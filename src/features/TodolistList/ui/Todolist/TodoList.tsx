import React, { FC, useCallback, useEffect } from 'react'
import AddItemForm from 'common/components/AddItemForm/AddItemForm'
import EditableSpan from 'common/components/EditableSpan.stories/EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import style from './Todolist.module.css'
import { FilterValuesType, TodolistDomainType } from '../../model/todolistsSlice'
import { Task } from './Task/Task'
import { useAppDispatch } from 'common/hooks/UseAppDispatch'
import { tasksThunks } from 'features/TodolistList/model/tasksSlice'
import { TaskType } from 'features/TodolistList/api/taskApi.types'

type Props = {
  tasks: TaskType[]
  changeFilter: (filter: FilterValuesType, todolistId: string) => void
  addTasks: (title: string, todolistId: string) => void
  removeTodolist: (id: string) => void
  updateTodolistTitle: (todolistId: string, updateTitle: string) => void
  demo?: boolean
  todolist: TodolistDomainType
}

export const TodoList: FC<Props> = React.memo(
  ({
    demo = false,
    todolist,
    tasks,
    changeFilter,
    addTasks,
    removeTodolist,
    updateTodolistTitle,
  }) => {
    console.log('TodoList')

    const dispatch = useAppDispatch()
    useEffect(() => {
      if (demo) {
        return
      }
      dispatch(tasksThunks.fetchTasks(todolist.id))
    }, [])

    const removeTodolistHandler = () => removeTodolist(todolist.id)
    const addTaskHandler = useCallback((title: string) => {
        addTasks(title, todolist.id)
      },
      [addTasks, todolist.id],
    )
    const updateTodolistTitleHandler = useCallback(
      (id: string, updateTitle: string) => {
        updateTodolistTitle(id, updateTitle)
      }, []
    )

    // let tasksForTodolist = tasks
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => !t.isDone);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone);
    // }

    const onAllClickHandler = useCallback(() => changeFilter('all', todolist.id), [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolist.id), [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(
      () => changeFilter('completed', todolist.id),
      [changeFilter, todolist.id],
    )
    return (
      <div className={style.todolist}>
        <h3>
          <EditableSpan
            oldTitle={todolist.title}
            onChange={(updateTitle) => updateTodolistTitleHandler(todolist.id, updateTitle)}
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
