import * as React from 'react';
import {FunctionComponent, useState} from 'react';
import styled, {css} from 'styled-components';
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
      <h1>React Todo</h1>
      <div>
        <input
          placeholder="タスクを追加"
          onChange={e => setText(e.target.value)}
          value={text}
        />
        <button disabled={!text} onClick={addTodo}>
          add
        </button>
      </div>
      <div>
        <button onClick={() => setFilter('all')}>ALL</button>
        <button onClick={() => setFilter('completed')}>COMPLETED</button>
        <button onClick={() => setFilter('notCompleted')}>NOT COMPLETED</button>
      </div>
      {todos.length ? (
        <Ul>
          {todos
            .filter(
              todo =>
                (filter === 'all' && todo) ||
                (filter === 'completed' && todo.completed) ||
                (filter === 'notCompleted' && !todo.completed)
            )
            .map(todo => (
              <Li key={todo.id} completed={todo.completed}>
                <button onClick={() => toggleCompleted(todo.id)}>完了</button>
                {todo.text}
              </Li>
            ))}
        </Ul>
      ) : (
        <p>タスクがありません</p>
      )}
    </>
  );
};

export default App;

const Ul = styled.ul`
  list-style-type: none;
`;
interface LiProps {
  completed: boolean;
}
const Li = styled.li`
  ${(props: LiProps) =>
    props.completed
      ? css`
          color: blue;
        `
      : css`
          color: red;
        `}
`;
