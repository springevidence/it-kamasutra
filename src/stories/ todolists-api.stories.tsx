import React, { useEffect, useState } from 'react'
import { todolistsAPI } from 'api/todolists-api'

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => {
      // debugger
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.createTodolist('What to learn').then((res) => {
      // debugger
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'ec5d7bb3-93b3-4fe8-b224-e1bae91cd2fc'
  useEffect(() => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      // debugger
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '50f67dab-1ea2-48fe-a4f2-46081995ef0e'
  useEffect(() => {
    todolistsAPI.updateTodolist(todolistId, 'What to watch').then((res) => {
      // debugger
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '50f67dab-1ea2-48fe-a4f2-46081995ef0e'
  useEffect(() => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      // debugger
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>('')
  const [taskTitle, setTaskTitle] = useState<any>('')
  const createTasks = () => {
    todolistsAPI.createTask(todolistId, taskTitle).then((res) => {
      // debugger
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'task title'}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value)
          }}
        />
        <button onClick={createTasks}>create task</button>
      </div>
    </div>
  )
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [title, setTitle] = useState<any>('some title')
  const [description, setDescription] = useState<string>('some description')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')
  const createTasks = () => {
    todolistsAPI
      .updateTask(todolistId, taskId, {
        description: description,
        deadline: '',
        priority: priority,
        status: status,
        title: title,
        startDate: '',
      })
      .then((res) => {
        // debugger
        setState(res.data)
      })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'task title'}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'task id'}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'description'}
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'status'}
          value={status}
          onChange={(e) => {
            setStatus(+e.currentTarget.value)
          }}
        />
        <input
          placeholder={'priority'}
          value={priority}
          onChange={(e) => {
            setPriority(+e.currentTarget.value)
          }}
        />
        <button onClick={createTasks}>update task</button>
      </div>
    </div>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<any>('')

  const deleteTask = () => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      // debugger
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'task id'}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTask}>delete task</button>
      </div>
    </div>
  )
}
