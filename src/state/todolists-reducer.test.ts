import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValuesType, TodoListType} from '../App'

let todolistID1: string
let todolistID2: string
let startState: Array<TodoListType>
beforeEach(()=> {
    todolistID1 = v1()
    todolistID2 = v1()

     startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]
})
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))
    if (endState) {
        expect(endState.length).toBe(1)
    }
    if (endState) {
        expect(endState[0].id).toBe(todolistID2)
    }
})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    if (endState) {
        expect(endState.length).toBe(3)
    }
    if (endState) {
        expect(endState[2].title).toBe(newTodolistTitle)
    }
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleAC(todolistID2, newTodolistTitle)
    const endState = todolistsReducer(startState, action)

    if (endState) {
        expect(endState[0].title).toBe('What to learn')
    }
    if (endState) {
        expect(endState[1].title).toBe(newTodolistTitle)
    }
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const action = changeTodolistFilterAC(todolistID2, newFilter)
    const endState = todolistsReducer(startState, action)

    if (endState) {
        expect(endState[0].filter).toBe('all')
    }
    if (endState) {
        expect(endState[1].filter).toBe(newFilter)
    }
})
