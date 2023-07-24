import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('What to eat')
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const todolistId = '4cae0e7d-d881-45c1-8b3d-7dd0b2ad1f27'

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c21fa8d3-33ee-435e-bbd1-fc4e6f4d7c50'
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c21fa8d3-33ee-435e-bbd1-fc4e6f4d7c50'
        todolistsAPI.updateTodolist(todolistId, 'What to watch')
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c21fa8d3-33ee-435e-bbd1-fc4e6f4d7c50'
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c21fa8d3-33ee-435e-bbd1-fc4e6f4d7c50'
        const taskId = ''
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c21fa8d3-33ee-435e-bbd1-fc4e6f4d7c50'
        const taskId = ''
        const model = {title: 'html'}
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}