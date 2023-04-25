import React from 'react';
import './App.css';
import TodoList, {taskType} from "./TodoList";

function App() {
    const tasks: taskType[] = [
        {id: 1, title: "HTML, CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title="What to learn"/>
        </div>
    );
}

export default App;
