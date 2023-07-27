import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {combineReducers, legacy_createStore} from "redux";
import { tasksReducer } from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate:'', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate:'', order: 0}
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
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
