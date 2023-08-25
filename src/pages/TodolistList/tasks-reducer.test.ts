import { v1 } from 'uuid'
import { addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType } from './tasks-reducer'
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer'
import { TaskPriorities, TaskStatuses } from '../../api/todolists-api'

let todolistID1: string
let todolistID2: string
let startState: TasksStateType
beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = {
    todolistID1: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'fgdosrg8rgjuh',
        order: 0,
        addedDate: '',
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'fgdosrg8rgjuh',
        order: 0,
        addedDate: '',
      },
      {
        id: v1(),
        title: 'ReactJS',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'fgdosrg8rgjuh',
        order: 0,
        addedDate: '',
      },
      {
        id: v1(),
        title: 'Redux',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'fgdosrg8rgjuh',
        order: 0,
        addedDate: '',
      },
    ],
    todolistID2: [
      {
        id: v1(),
        title: 'Book',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'fgdosrg8rgjuh',
        order: 0,
        addedDate: '',
      },
      {
        id: v1(),
        title: 'Watch',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'fgdosrg8rgjuh',
        order: 0,
        addedDate: '',
      },
    ],
  }
})

// test('correct task should be deleted from correct array', () => {
//
//     const endState = tasksReducer(startState, removeTaskAC(todolistID2, startState[todolistID2][0].id))
//     expect(endState[todolistID2].length).toBe(1)
//     expect(endState[todolistID2][0].title).toBe('Watch')
//     expect(endState[todolistID1].length).toBe(4)
//
// })

// test('correct task should be added to correct array', () => {
//
//     const newTitle = 'New Task'
//
//     const endState = tasksReducer(startState, addTaskAC(todolistID1, newTitle))
//     if (endState) {
//         expect(endState[todolistID1][0].title).toBe(newTitle)
//         expect(endState[todolistID1].length).toBe(5)
//         expect(endState[todolistID2].length).toBe(2)
//     }
// })

// test('status of specified task should be changed', () => {
//
//     const endState = tasksReducer(startState, changeTaskStatusAC(todolistID1, startState[todolistID1][0].id, TaskStatuses.New))
//
//     if (endState) {
//         expect(endState[todolistID1][0].status).toBe(TaskStatuses.New)
//         expect(endState[todolistID2][0].status).toBe(TaskStatuses.Completed)
//     }
// })

// test('title of specified task should be changed', () => {
//
//     const newTitle = 'New Title'
//
//     const endState = tasksReducer(startState, changeTaskTitleAC(todolistID2, startState[todolistID2][1].id, newTitle))
//
//     if (endState) {
//         expect(endState[todolistID1][0].title).toBe('HTML&CSS')
//         expect(endState[todolistID2][1].title).toBe(newTitle)
//     }
// })

test('new array should be added when new todolist is added', () => {
  const action = addTodolistAC({
    id: '',
    title: 'new todolist',
    addedDate: '',
    order: 0,
  })
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != 'todolistID1' && k != 'todolistID2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toStrictEqual([])
})
// test('property with todolistId should be deleted', () => {
//
//     const action = removeTodolistAC(todolistID2)
//     const endState = tasksReducer(startState, action)
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).not.toBeDefined()
// })
// test('empty array should be added when we set todolists', () => {
//
//     const action = setTodolistsAC([
//         {id: '1', title: 'title 1', order: 0, addedDate:''},
//         {id: '2', title: 'title 2', order: 0, addedDate:''}
//     ])
//     const endState = tasksReducer({}, action)
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(2)
//     expect(endState['1']).toStrictEqual([])
//     expect(endState['2']).toStrictEqual([])
// })

// test('tasks should be added for todolist', () => {
//
//     const action = setTasksAC('todolistID1', startState['todolistID1'])
//     const endState = tasksReducer({
//         'todolistID1': [],
//         'todolistID2': []
//     }, action)
//
//     expect(endState['todolistID1']).toBe(4)
//     expect(endState['todolistID2']).toBe(0)
// })
