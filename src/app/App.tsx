import React, { useCallback, useEffect } from 'react'
import style from './App.module.css'
import { AppBar, Box, Button, Container, Toolbar } from '@material-ui/core'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { TodolistsList } from 'features/TodolistList/TodolistsList'
import { CircularProgress, LinearProgress } from '@mui/material'
import ErrorSnackbar from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { useSelector } from 'react-redux'
import { AppRootStateType } from './store'
import { RequestStatusType } from './app-reducer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from 'features/Login/Login'
import { initializedAppTC, logoutTC } from 'features/Login/login-reducer'
import { selectAppIsInitialized, selectAppStatus } from 'app/app-selector'
import { selectLoginIsLoggedIn } from 'features/Login/login-selector'
import { useAppDispatch } from 'common/hooks/UseAppDispatch'

type PropsType = {
  demo?: boolean
}

function App({ demo = false }: PropsType) {
  const status = useSelector<AppRootStateType, RequestStatusType>(selectAppStatus)
  const dispatch = useAppDispatch()

  const isInitialized = useSelector<AppRootStateType, boolean>(selectAppIsInitialized)

  const isLoggedIn = useSelector<AppRootStateType, boolean>(selectLoginIsLoggedIn)

  useEffect(() => {
    dispatch(initializedAppTC())
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={style.app}>
      <Box sx={{ flexGrow: 1 }}>
        <ErrorSnackbar />
        <AppBar position="static" color={'inherit'}>
          <Toolbar>
            <IconButton size={'large'} edge={'start'} color={'inherit'} aria-label={'menu'} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
              Your Board
            </Typography>
            {isLoggedIn && (
              <Button onClick={logoutHandler} color="inherit">
                Log Out
              </Button>
            )}
          </Toolbar>
          {status === 'loading' && <LinearProgress />}
        </AppBar>
      </Box>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistsList demo={demo} />} />
          <Route path={'/login'} element={<Login />} />

          <Route path="*" element={<Navigate to={'/404'} />} />
          <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
