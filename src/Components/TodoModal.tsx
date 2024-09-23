import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: { title: string; description: string, completed: boolean; } | null) => void;
    addTodo: (todo: { title: string; description: string, completed: boolean; }) => void;
}

const SimpleDialog = ({ onClose, open, addTodo }: SimpleDialogProps) => {
    const [todoTitle, setTodoTitle] = React.useState('');
    const [todoDescription, setTodoDescription] = React.useState('');

    const handleClose = () => {
        onClose(null);
    };

    const handleAddTodo = () => {
        if (todoTitle.trim() && todoDescription.trim()) {
            const newTodo = { title: todoTitle, description: todoDescription, completed: true };
            addTodo(newTodo);
            setTodoTitle('');
            setTodoDescription('');
            onClose(newTodo);
        }
    };

    

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add New Todo</DialogTitle>
            <ListItem className='flex flex-col space-y-3'>
                <TextField
                    label="Add to-do title"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Add to-do description"
                    value={todoDescription}
                    onChange={(e) => setTodoDescription(e.target.value)}
                    fullWidth
                    variant="outlined"
                />
            </ListItem>
            <ListItem disableGutters>
                <ListItemButton onClick={handleAddTodo}>
                    <div className='flex space-x-20'>
                        <Button className='bg-red-500 text-white'>Add to-do</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                </ListItemButton>
            </ListItem>
        </Dialog>
    );
};

export default SimpleDialog;
