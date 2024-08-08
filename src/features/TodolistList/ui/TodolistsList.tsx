import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'app/store'
import { FilterValuesType, TodolistDomainType, todolistsActions, todolistsThunks } from '../model/todolistsSlice'
import { TasksStateType, tasksThunks } from '../model/tasksSlice'
import { Grid, Paper } from '@material-ui/core'
import AddItemForm from '../../../common/components/AddItemForm/AddItemForm'
import { TodoList } from './Todolist/TodoList'
import { Navigate } from 'react-router-dom'

import { selectTodolists } from 'features/TodolistList/model/todolists-selector'
import { selectTasks } from 'features/TodolistList/model/tasks-selector'
import { useAppDispatch } from 'common/hooks/UseAppDispatch'
import { TaskStatuses } from 'common/enum/enum'
import { selectLoginIsLoggedIn } from 'features/auth/model/login-selector'

type Props = {
  demo?: boolean
}
export const TodolistsList: React.FC<Props> = ({ demo = false }) => {
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


  const addTasks = useCallback((title: string, todolistId: string) => {
    dispatch(tasksThunks.addTask({ todolistId, title }))
  }, [])


  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(todolistsThunks.removeTodolist({ todolistId }))
  }, [])

  const addTodoList = useCallback((newTitle: string) => {
    dispatch(todolistsThunks.addTodolist({ title: newTitle }))
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
                  changeFilter={changeFilter}
                  addTasks={addTasks}
                  removeTodolist={removeTodolist}
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
