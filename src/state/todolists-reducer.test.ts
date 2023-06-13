import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValuesType, TodoListType} from '../App'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // @ts-ignore
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
    if (endState) {
        expect(endState.length).toBe(1)
    }
    if (endState) {
        expect(endState[0].id).toBe(todolistId2)
    }
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    if (endState) {
        expect(endState.length).toBe(3)
    }
    if (endState) {
        expect(endState[2].title).toBe(newTodolistTitle)
    }
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    if (endState) {
        expect(endState[0].title).toBe('What to learn')
    }
    if (endState) {
        expect(endState[1].title).toBe(newTodolistTitle)
    }
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action = ChangeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    if (endState) {
        expect(endState[0].filter).toBe('all')
    }
    if (endState) {
        expect(endState[1].filter).toBe(newFilter)
    }
})
