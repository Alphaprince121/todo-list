import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

interface SimpleDialogProps {
    open: boolean;
    onClose: (updatedTodo: { title: string; description: string; completed: boolean } | null) => void;
    todo: { title: string; description: string; completed: boolean };
}

const SimpleDialog = ({ onClose, open, todo }: SimpleDialogProps) => {
    const [todoTitle, setTodoTitle] = React.useState(todo.title);
    const [todoDescription, setTodoDescription] = React.useState(todo.description);

    const handleClose = () => {
        onClose(null);
    };

    const handleSaveTodo = () => {
        if (todoTitle && todoDescription) {
            const updatedTodo = { ...todo, title: todoTitle, description: todoDescription };
            onClose(updatedTodo);
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Edit Todo</DialogTitle>
            <ListItem className="flex flex-col space-y-3">
                <TextField
                    label="Edit Todo Title"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Edit Todo Description"
                    value={todoDescription}
                    onChange={(e) => setTodoDescription(e.target.value)}
                    fullWidth
                    variant="outlined"
                />
            </ListItem>
            <ListItem disableGutters>
                <ListItemButton onClick={()=>handleSaveTodo}>
                    <div className="flex space-x-20">
                        <Button onClick={handleSaveTodo} className="bg-red-500 text-white">Save Changes</Button>
                        <Button onClick={ handleClose}>Cancel</Button>
                    </div>
                </ListItemButton>
            </ListItem>
        </Dialog>
    );
};

export default SimpleDialog;
