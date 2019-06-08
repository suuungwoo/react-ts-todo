import * as React from 'react';
import {FunctionComponent, useState} from 'react';
import './App.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const App: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const getUniqueId = () => {
    return new Date().getTime().toString(36) + '-' + Math.random().toString(36);
  };
  const addTodo = () => {
    setTodos([...todos, {id: getUniqueId(), text, completed: false}]);
    setText('');
  };
  const toggleCompleted = (id: string) => () => {
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].completed = !todos[index].completed;
    setTodos(todos);
  };
  return (
    <>
      <div>
        <input onChange={e => setText(e.target.value)} value={text}></input>
        <button onClick={addTodo}>add</button>
      </div>
      <div>
        <button onClick={() => setFilter('all')}>ALL</button>
        <button onClick={() => setFilter('completed')}>COMPLETED</button>
        <button onClick={() => setFilter('notCompleted')}>NOT COMPLETED</button>
      </div>
      <ul>
        {todos
          .filter(
            todo =>
              (filter === 'all' && todo) ||
              (filter === 'completed' && todo.completed) ||
              (filter === 'notCompleted' && !todo.completed)
          )
          .map(todo => (
            <li key={todo.id}>
              <button onClick={toggleCompleted(todo.id)}></button>
              {todo.text}
            </li>
          ))}
      </ul>
    </>
  );
};

export default App;
