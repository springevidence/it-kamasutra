import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { AlertProps } from '@material-ui/lab'
import MuiAlert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from 'app/store'
import { appActions } from 'app/app-reducer'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function ErrorSnackbar() {
  const error = useSelector<AppRootStateType, string | null>((state) => state.app.error)
  const dispatch = useDispatch()
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(appActions.setAppError({ error: null }))
  }

  const isOpen = error !== null

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  )
}
