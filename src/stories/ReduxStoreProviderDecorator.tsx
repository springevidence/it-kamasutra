import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "../app/store";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { tasksReducer } from '../pages/TodolistList/tasks-reducer';
import {todolistsReducer} from '../pages/TodolistList/todolists-reducer';
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate:'', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate:'', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline:'', todoListId: 'todoListId1', order: 0, addedDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline:'', todoListId: 'todoListId1', order: 0, addedDate: ''}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline:'', todoListId: 'todoListId2', order: 0, addedDate: ''},
            {id: v1(), title: "React Book",status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline:'', todoListId: 'todoListId2', order: 0, addedDate: ''}
        ]
    },
    app: {
        error: null,
        status: 'idle'
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleware) );


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
