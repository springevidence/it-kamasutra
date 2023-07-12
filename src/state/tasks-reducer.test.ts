import {v1} from 'uuid'
import {TasksStateType} from '../AppWithRedux'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let todolistID1: string
let todolistID2: string
let startState: TasksStateType
beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = {
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
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistID2, startState[todolistID2][0].taskId))
    expect(endState[todolistID2].length).toBe(1)
    expect(endState[todolistID2][0].title).toBe('Watch')
    expect(endState[todolistID1].length).toBe(4)

})

test('correct task should be added to correct array', () => {

    const newTitle = 'New Task'

    const endState = tasksReducer(startState, addTaskAC(todolistID1, newTitle))
    if (endState) {
        expect(endState[todolistID1][0].title).toBe(newTitle)
        expect(endState[todolistID1].length).toBe(5)
        expect(endState[todolistID2].length).toBe(2)
    }
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistID1, startState[todolistID1][0].taskId, false))

    if (endState) {
        expect(endState[todolistID1][0].isDone).toBe(false)
        expect(endState[todolistID2][0].isDone).toBe(true)
    }
})

test('title of specified task should be changed', () => {

    const newTitle = 'New Title'

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistID2, startState[todolistID2][1].taskId, newTitle))

    if (endState) {
        expect(endState[todolistID1][0].title).toBe('HTML&CSS')
        expect(endState[todolistID2][1].title).toBe(newTitle)
    }
})

test('new array should be added when new todolist is added', () => {

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

    const action = removeTodolistAC(todolistID2)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
