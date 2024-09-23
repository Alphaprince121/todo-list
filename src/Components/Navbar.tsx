"use client"
import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';
import Button from '@mui/material/Button';
import SimpleDialog from '@/Components/TodoModal';

interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

interface NavbarProps {
    addTodo: (todo: Todo) => void;
}

const Navbar: React.FC<NavbarProps> = ({ addTodo }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const closeDialog = (value: Todo | null) => {
        setDialogOpen(false);
    };

    const openDialog = () => {
        setDialogOpen(true);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-xl cursor-pointer font-bold text-gray-800">Logo</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <Button onClick={openDialog} className='border-red-500 text-red-500' variant="outlined">
                        <IoMdAdd size={34} />
                    </Button>

                    <button className="p-2 text-gray-600 rounded hover:bg-gray-100 focus:outline-none">
                        <RxHamburgerMenu size={34} />
                    </button>
                </div>
            </div>

            {isDialogOpen && (
                <SimpleDialog open={isDialogOpen} onClose={closeDialog} addTodo={addTodo} />
            )}
        </nav>
    );
};

export default Navbar;
