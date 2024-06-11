import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiurl } from '../apiurl';
import { toast } from 'react-toastify';

const Edittask = ({ task, getTodo, setEdit }) => {
    const token = sessionStorage.getItem("token")
    const [editTask, setEditTask] = useState({
        title: '',
        task: ''
    });

    useEffect(() => {
        if (task) {
            setEditTask({
                title: task.title,
                task: task.task
            });
        }
    }, [task]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onEdit = async (e) => {
        e.preventDefault();
        if (!task._id) {
            console.error("Task ID is undefined");
            return;
        }
        try {
            console.log(task._id);
            const body = { title: editTask.title, task: editTask.task };
           const response= await axios.put(`${apiurl}updatetask/${task._id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEditTask({ title: '', task: '' });
            getTodo(); // fetch updated tasks after editing
            setEdit(false); // close the edit modal
            toast.success(response.data.message)
            // console.log(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className='container from-transparent'>
            <div tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update Your Task
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setEdit(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={onEdit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" name="title" id="title"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={editTask.title} onChange={handleInputChange} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task</label>
                                    <input type="text" name="task" id="task" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={editTask.task} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Update Task
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edittask;
