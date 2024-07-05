import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'app/store'
import { FilterValuesType, TodolistDomainType, todolistsActions, todolistsThunks } from '../todolistsSlice'
import { TasksStateType, tasksThunks } from '../tasksSlice'
import { Grid, Paper } from '@material-ui/core'
import AddItemForm from '../../../common/components/AddItemForm/AddItemForm'
import { TodoList } from '../Todolist/TodoList'
import { Navigate } from 'react-router-dom'

import { selectTodolists } from 'features/TodolistList/todolists-selector'
import { selectTasks } from 'features/TodolistList/tasks-selector'
import { useAppDispatch } from 'common/hooks/UseAppDispatch'
import { TaskStatuses } from 'common/enum/enum'
import { selectLoginIsLoggedIn } from 'features/auth/model/login-selector'

type PropsType = {
  demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(selectLoginIsLoggedIn)
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(selectTodolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(selectTasks)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(todolistsThunks.fetchTodolists())
    // dispatch(fetchTodolistsTC())
  }, [])

  const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
    // dispatch(changeTodolistFilterAC(todolistId, filter))
    dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter }))
  }, [])

  const removeTask = useCallback((taskId: string, todolistId: string) => {
    dispatch(tasksThunks.removeTask({ todolistId, taskId }))
  }, [])

  const addTasks = useCallback((title: string, todolistId: string) => {
    dispatch(tasksThunks.addTask({ todolistId, title }))
  }, [])

  const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { status: status } }))
  }, [])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(todolistsThunks.removeTodolist({ todolistId }))
  }, [])

  const addTodoList = useCallback((newTitle: string) => {
    dispatch(todolistsThunks.addTodolist({ title: newTitle }))
  }, [])

  const changeTaskTitle = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { title: updateTitle } }))
  }, [])

  const updateTodolistTitle = useCallback((todolistId: string, updateTitle: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ todolistId, title: updateTitle }))
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm callback={addTodoList} />
      </Grid>
      <Grid container spacing={5}>
        {todolists.map((tl) => {
          let tasksForTodolist = tasks[tl.id]
          if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter((t) => t.status === TaskStatuses.New)
          }
          if (tl.filter === 'completed') {
            tasksForTodolist = tasks[tl.id].filter((t) => t.status === TaskStatuses.Completed)
          }
          return (
            <Grid key={tl.id} item>
              <Paper elevation={3} style={{ padding: '10px' }}>
                <TodoList
                  todolist={tl}
                  demo={demo}
                  key={tl.id}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTasks={addTasks}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  updateTodolistTitle={updateTodolistTitle}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
