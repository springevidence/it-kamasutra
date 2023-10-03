import { handleServerAppError, handleServerNetworkError } from 'common/utills/error-utills'
import { appActions, RequestStatusType } from 'app/app-reducer'
import { AppThunk } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsAPI, TodolistType } from 'features/TodolistList/todolists-api'
import { createAppAsyncThunk } from 'common/utills/createAppAsyncThunk'
import { ResultCode } from 'common/enum/enum'

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>,
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
    clearTodosData: (state, action: PayloadAction<{}>) => {
      return []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        // так как мы не можем изменить state полностью (т.е. state = ...), мы возвращаем этот state
        return action.payload.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
        // or
        // action.payload.todolists.forEach((t) => {state.push({ ...t, filter: 'all', entityStatus: 'idle' })})
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
      })
  },
})
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

//thunk creators
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  'todolists/fetchTodolists',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.getTodolists()
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { todolists: res.data }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const removeTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
  'todolists/removeTask',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: 'loading' }))
      const res = await todolistsAPI.deleteTodolist(arg.todolistId)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { todolistId: arg.todolistId }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>(
  'todolists/addTodolist',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.createTodolist(arg.title)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { todolist: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const changeTodolistTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    todolistsAPI
      .updateTodolist(todolistId, title)
      .then((res) => dispatch(todolistsActions.changeTodolistTitle({ todolistId, title })))
  }

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const todolistsThunks = { fetchTodolists, removeTodolist, addTodolist }

//was
// let initialState: TodolistDomainType[] = []
// export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
//   switch (action.type) {
//     case 'REMOVE-TODOLIST':
//       return state.filter((t) => t.id !== action.todolistId)
//     case 'ADD-TODOLIST':
//       return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
//     case 'CHANGE-TODOLIST-TITLE':
//       return state.map((t) => (t.id === action.todolistId ? { ...t, title: action.title } : t))
//     case 'CHANGE-TODOLIST-FILTER':
//       return state.map((t) => (t.id === action.todolistId ? { ...t, filter: action.filter } : t))
//     case 'SET-TODOLISTS':
//       return action.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
//     case 'CHANGE-TODOLIST-ENTITY-STATUS':
//       return state.map((t) => (t.id === action.todolistId ? { ...t, entityStatus: action.status } : t))
//     default:
//       return state
//   }
// }
// action creators
// export const removeTodolistAC = (todolistId: string) =>
//   ({
//     type: 'REMOVE-TODOLIST',
//     todolistId,
//   }) as const
// export const addTodolistAC = (todolist: TodolistType) =>
//   ({
//     type: 'ADD-TODOLIST',
//     todolist,
//   }) as const
// export const changeTodolistTitleAC = (todolistId: string, title: string) =>
//   ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     todolistId,
//     title,
//   }) as const
// export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) =>
//   ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     todolistId,
//     filter,
//   }) as const
// export const setTodolistsAC = (todolists: TodolistType[]) =>
//   ({
//     type: 'SET-TODOLISTS',
//     todolists,
//   }) as const
// export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) =>
//   ({
//     type: 'CHANGE-TODOLIST-ENTITY-STATUS',
//     todolistId,
//     status,
//   }) as const
//
// export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
//   dispatch(appActions.setAppStatus({ status: 'loading' }))
//   todolistsAPI
//     .getTodolists()
//     .then((res) => {
//       // dispatch(setTodolistsAC(res.data))
//       dispatch(todolistsActions.setTodolists({ todolists: res.data }))
//       dispatch(appActions.setAppStatus({ status: 'succeeded' }))
//       return res.data
//     })
//     .then((todos) => {
//       todos.forEach((todo) => dispatch(tasksThunks.fetchTasks(todo.id)))
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
//export const removeTodolistTC =
//   (todolistID: string): AppThunk =>
//   (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: 'loading' }))
//     // dispatch(changeTodolistEntityStatusAC(todolistID, 'loading'))
//     dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: todolistID, entityStatus: 'loading' }))
//     todolistsAPI.deleteTodolist(todolistID).then((res) => {
//       // dispatch(removeTodolistAC(todolistID))
//       dispatch(todolistsActions.removeTodolist({ todolistId: todolistID }))
//       dispatch(appActions.setAppStatus({ status: 'succeeded' }))
//     })
//   }
//
//// addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
//     //   // for current state use variable a
//     //   // let a = current(state)
//     //   state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
//     // },
//     // removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
//     //   const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
//     //   if (index !== -1) state.splice(index, 1)
//     // },
//
// setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
//   // так как мы не можем изменить state полностью (т.е. state = ...), мы возвращаем этот state
//   return action.payload.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
//   // or
//   // action.payload.todolists.forEach((t) => {state.push({ ...t, filter: 'all', entityStatus: 'idle' })})
// },
//// export const addTodolistTC =
// //   (title: string): AppThunk =>
// //   (dispatch) => {
// //     dispatch(appActions.setAppStatus({ status: 'loading' }))
// //     todolistsAPI.createTodolist(title).then((res) => {
// //       // dispatch(addTodolistAC(res.data.data.item))
// //       dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
// //       dispatch(appActions.setAppStatus({ status: 'succeeded' }))
// //     })
// //   }
