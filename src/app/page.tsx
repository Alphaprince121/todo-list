"use client";
import React, { useState } from 'react';
import Navbar from "@/Components/Navbar";
import { MdEdit } from "react-icons/md";
import SimpleDialog from '@/Components/EditModal';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTodoIndex, setSelectedTodoIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const toggleTodo = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
    sortTodo();
  };

  const sortTodo = () => {
    setTodos((prevTodos) => {
      return [...prevTodos].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    });
  };


  const closeDialog = (updatedTodo: Todo | null) => {
    if (updatedTodo && selectedTodoIndex !== null) {
      editTodo(selectedTodoIndex, updatedTodo);
    }
    setDialogOpen(false);
    setSelectedTodoIndex(null);
  };

  const openDialog = (index: number) => {
    setSelectedTodoIndex(index);
    setDialogOpen(true);
  };

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, { ...todo, completed: false }]);
    sortTodo();

  };

  const editTodo = (index: number, updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo, i) => (i === index ? updatedTodo : prevTodo))
    );
  };

  const removeTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    setOpen(false);
  };

  return (
    <div>
      <Navbar addTodo={addTodo} />
      <div>
        <div className='flex justify-center mt-8'>
          <h2 className='text-4xl font-bold'>Todo - List</h2>
        </div>
        <ul className='flex flex-col items-center space-y-4 mt-8'>
          {todos.map((todo, index) => (
            <li key={index} className='flex justify-between items-center bg-gray-200 w-4/5 md:w-2/4 p-3 rounded'>
              <span className='space-x-4'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                />
                <strong className={todo.completed ? 'line-through' : ''}>{todo.title}</strong> :-
                <span className={todo.completed ? 'line-through' : ''}>{todo.description}</span>
              </span>
              <div className='flex space-x-5'>
                <button onClick={() => openDialog(index)} className='bg-gray-100 px-2 rounded'>
                  <MdEdit />
                </button>
                <Button variant="outlined" className='bg-red-500 text-white' onClick={() => setOpen(true)}>
                  Remove
                </Button>
                <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Remove Todo?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to remove this todo?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>No</Button>
                    <Button onClick={() => removeTodo(index)} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isDialogOpen && selectedTodoIndex !== null && (
        <SimpleDialog
          open={isDialogOpen}
          onClose={closeDialog}
          todo={todos[selectedTodoIndex]}
        />
      )}
    </div>
  );
};

export default App;
