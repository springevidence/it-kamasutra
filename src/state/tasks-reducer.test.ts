import {v1} from 'uuid'
import {TasksStateType} from '../App'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, RemoveTodolistAC} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TasksStateType= {
        [todolistID1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},

        ],
        [todolistID2]: [
            {taskId: v1(), title: 'Book', isDone: true},
            {taskId: v1(), title: 'Watch', isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistID1, startState[todolistID1][0].taskId))
    if (endState) {
        expect(endState[todolistID1].length).toBe(3)
        expect(endState[todolistID2].length).toBe(2)
        expect(endState[todolistID1][0].title).toBe('JS')
    }
})

test('correct task should be added to correct array', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TasksStateType = {
        [todolistID1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},

        ],
        [todolistID2]: [
            {taskId: v1(), title: 'Book', isDone: true},
            {taskId: v1(), title: 'Watch', isDone: false},
        ]
    }
    const newTitle = 'New Task'

    const endState = tasksReducer(startState, addTaskAC(todolistID1, newTitle))
    if (endState) {
        expect(endState[todolistID1][0].title).toBe(newTitle)
        expect(endState[todolistID1].length).toBe(5)
        expect(endState[todolistID2].length).toBe(2)
    }
})

test('status of specified task should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const startState: TasksStateType = {
        [todolistID1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},

        ],
        [todolistID2]: [
            {taskId: v1(), title: 'Book', isDone: true},
            {taskId: v1(), title: 'Watch', isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistID1, startState[todolistID1][0].taskId, false))

    if (endState) {
        expect(endState[todolistID1][0].isDone).toBe(false)
        expect(endState[todolistID2][0].isDone).toBe(true)
    }
})

test('title of specified task should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const startState: TasksStateType = {
        [todolistID1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},

        ],
        [todolistID2]: [
            {taskId: v1(), title: 'Book', isDone: true},
            {taskId: v1(), title: 'Watch', isDone: false},
        ]
    }
    const newTitle = 'New Title'

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistID2, startState[todolistID2][1].taskId, newTitle))

    if (endState) {
        expect(endState[todolistID1][0].title).toBe('HTML&CSS')
        expect(endState[todolistID2][1].title).toBe(newTitle)
    }
})

test('new array should be added when new todolist is added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const startState: TasksStateType = {
        [todolistID1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},

        ],
        [todolistID2]: [
            {taskId: v1(), title: 'Book', isDone: true},
            {taskId: v1(), title: 'Watch', isDone: false},
        ]
    }
    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistID1 && k != todolistID2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})
test('property with todolistId should be deleted', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const startState: TasksStateType = {
        [todolistID1]: [
            {taskId: v1(), title: 'HTML&CSS', isDone: true},
            {taskId: v1(), title: 'JS', isDone: true},
            {taskId: v1(), title: 'ReactJS', isDone: false},
            {taskId: v1(), title: 'Redux', isDone: false},

        ],
        [todolistID2]: [
            {taskId: v1(), title: 'Book', isDone: true},
            {taskId: v1(), title: 'Watch', isDone: false},
        ]
    }

    const action = RemoveTodolistAC(todolistID2)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
