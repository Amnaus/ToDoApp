import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($input: CreateTodoInput!) {
    createTodo(createTodoInput: $input) {
      id
      title
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    removeTodo(id: $id) {
      id
    }
  }
`;

const TodoList = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [newTodo, setNewTodo] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;
    await addTodo({ variables: { input: { title: newTodo } } });
    setNewTodo('');
    refetch();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo({ variables: { id } });
    refetch();
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {data.todos.map(todo => (
          <li key={todo.id}>
            {todo.title} 
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="New Todo" 
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default TodoList;
