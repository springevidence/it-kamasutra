import { handleServerNetworkError } from 'common/utills/handle-server-network-error'
import { appActions } from 'app/appSlice'
import { createSlice } from '@reduxjs/toolkit'
import { todolistsActions, todolistsThunks } from 'features/TodolistList/model/todolistsSlice'
import { createAppAsyncThunk } from 'common/utills/createAppAsyncThunk'
import { handleServerAppError } from 'common/utills/handle-server-app-error'
import { AddTaskArgType, ArgRemoveTaskType, ArgUpdateTask, TaskType, UpdateTaskModelType } from '../api/taskApi.types'
import { ResultCode } from 'common/types/types'
import { taskAPI } from '../api/taskApi'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    // removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
    //   const tasksForTodolist = state[action.payload.todolistId]
    //   const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId)
    //   if (index !== -1) tasksForTodolist.splice(index, 1)
    // },
    // addTask: (state, action: PayloadAction<{ todolistId: string; task: TaskType }>) => {
    //   const tasksForTodolist = state[action.payload.todolistId]
    //   tasksForTodolist.unshift(action.payload.task)
    // },
    // updateTask: (
    //   state,
    //   action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>,
    // ) => {
    //   const tasksForTodolist = state[action.payload.todolistId]
    //   const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId)
    //   if (index !== -1) {
    //     tasksForTodolist[index] = { ...tasksForTodolist[index], ...action.payload.model }
    //   }
    // },
    // setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
    //   state[action.payload.todolistId] = action.payload.tasks
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        // debugger
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.task.todoListId]
        tasksForTodolist.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todolistId]
        const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasksForTodolist[index] = { ...tasksForTodolist[index], ...action.payload.domainModel }
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todolistId]
        const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) tasksForTodolist.splice(index, 1)
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      // .addCase(todolistsActions.setTodolists, (state, action) => {
      //   action.payload.todolists.forEach((tl) => {
      //     state[tl.id] = []
      //   })
      // })
      .addCase(todolistsActions.clearTodosData, (state, action) => {
        return {}
      })
  },
})

// thunk creators

const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
`${slice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await taskAPI.getTasks(todolistId)
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { todolistId, tasks: res.data.items }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  `${slice.name}/addTask`, 
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await taskAPI.createTask(arg)
      if (res.data.resultCode === ResultCode.Success) {
        const task = res.data.data.item
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { task }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
})

const updateTask = createAppAsyncThunk<ArgUpdateTask, ArgUpdateTask>(
  `${slice.name}/updateTask`, 
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const state = getState()
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId)
      if (!task) {
        dispatch(appActions.setAppError({ error: 'Task not found in the state' }))
        return rejectWithValue(null)
      }
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...arg.domainModel,
      }
      const res = await taskAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
})

const removeTask = createAppAsyncThunk<ArgRemoveTaskType, ArgRemoveTaskType>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await taskAPI.deleteTask(arg.todolistId, arg.taskId)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return arg
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

//types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export const tasksActions = slice.actions
export const tasksReducers = slice.reducer
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask }

// let initialState: TasksStateType = {}
//
// export const tasksReducer = (state = initialState, action: ActionsTaskType) => {
//   switch (action.type) {
//     case 'REMOVE TASK':
//       return { ...state, [action.todoListId]: state[action.todoListId].filter((t) => t.id !== action.taskId) }
//     case 'ADD TASK':
//       return { ...state, [action.todolistId]: [action.task, ...state[action.todolistId]] }
//     case 'SET TASKS':
//       return { ...state, [action.todolistId]: action.tasks }
//     case 'UPDATE TASK':
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((t) =>
//           t.id === action.taskId ? { ...t, ...action.model } : t,
//         ),
//       }
//
//     case 'ADD-TODOLIST':
//       return { ...state, [action.todolist.id]: [] }
//     case 'REMOVE-TODOLIST':
//       const stateCopy = { ...state }
//       delete stateCopy[action.todolistId]
//       return stateCopy
//     case 'SET-TODOLISTS': {
//       const stateCopy = { ...state }
//       action.todolists.forEach((t: any) => {
//         stateCopy[t.id] = []
//       })
//       return stateCopy
//     }
//     default:
//       return state
//   }
// }
//
// action creators
//
// export const removeTaskAC = (todoListId: string, taskId: string) =>
//   ({
//     type: 'REMOVE TASK',
//     taskId: taskId,
//     todoListId: todoListId,
//   }) as const
//
///
// export const addTaskAC = (todolistId: string, task: TaskType) => ({ type: 'ADD TASK', task, todolistId }) as const
//
//
// export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({ type: 'SET TASKS', todolistId, tasks }) as const
//
//
// export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
//   ({
//     type: 'UPDATE TASK',
//     todolistId,
//     taskId,
//     model,
//   }) as const
//export const fetchTasksTC =
//   (todolistId: string): AppThunk =>
//   (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: 'loading' }))
//     todolistsAPI
//       .getTasks(todolistId)
//       .then((res) => {
//         dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }))
//         dispatch(appActions.setAppStatus({ status: 'succeeded' }))
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch)
//       })
//   }
//// export const deleteTaskTC =
// //   (todolistId: string, taskId: string): AppThunk =>
// //   (dispatch) => {
// //     todolistsAPI
// //       .deleteTask(todolistId, taskId)
// //       .then((res) => {
// //         dispatch(tasksActions.removeTask({ todolistId, taskId }))
// //       })
// //       .catch((error) => {
// //         handleServerNetworkError(error, dispatch)
// //       })
// //   }
//export const addTaskTC =
//   (todolistId: string, title: string): AppThunk =>
//   (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: 'loading' }))
//     todolistsAPI
//       .createTask(todolistId, title)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           dispatch(tasksActions.addTask({ todolistId, task: res.data.data.item }))
//           dispatch(appActions.setAppStatus({ status: 'succeeded' }))
//         } else {
//           handleServerAppError(res.data, dispatch)
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch)
//       })
//   }
//
//export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
//   return (dispatch, getState: () => AppRootStateType) => {
//     const state = getState()
//     const task = state.tasks[todolistId].find((t) => t.id === taskId)
//     if (task) {
//       const apiModel: UpdateTaskModelType = {
//         title: task.title,
//         description: task.description,
//         status: task.status,
//         priority: task.priority,
//         startDate: task.startDate,
//         deadline: task.deadline,
//         ...domainModel,
//       }
//       todolistsAPI
//         .updateTask(todolistId, taskId, apiModel)
//         .then((res) => {
//           if (res.data.resultCode === 0) {
//             dispatch(tasksActions.updateTask({ todolistId, taskId, model: domainModel }))
//           } else {
//             handleServerAppError(res.data, dispatch)
//           }
//         })
//         .catch((error) => {
//           handleServerNetworkError(error, dispatch)
//         })
//     }
//   }
// }
