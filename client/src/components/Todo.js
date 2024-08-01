import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { apiurl } from '../apiurl';
import Edittask from './Edittask';

const Todo = () => {
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState('');
    const [edit, setEdit] = useState(false)


    const token = sessionStorage.getItem("token");

    const getTodo = async () => {
        try {
            const response = await axios.get(`${apiurl}gettask`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data.tasks); // update tasks state with fetched data
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTodo(); // fetch data when component mounts
    });

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { title, task };
            const response = await axios.post(`${apiurl}task`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getTodo(); // fetch updated tasks after creating a new task
            setTitle(''); // clear the input fields
            setTask('');
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const onDelete = async (id) => {

        try {
            console.log(id);
            const response = await axios.delete(`${apiurl}deletetask/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getTodo();
            toast.success(response.data.message);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    const complete = async (id) => {
        try {
         
            const response = await axios.put(
                apiurl+`completetask/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getTodo();
            toast.success(response.data.message);
        } catch (error) {
            
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred while completing the task.');
            }
        }
    };
    



    return (
        <>
            
            <div className='flex flex-col w-screen items-center'>
                <div className='border p-5 mb-3'>
                    <h1>Todo Task</h1>
                    <form onSubmit={onSubmitForm}>
                        <label>Title</label>
                        <input
                            className='border mx-3 my-2 px-2'
                            placeholder='Title'
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Task</label>
                        <input
                            className='border mx-3 my-2 px-2'
                            placeholder='Task'
                            type='text'
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                        />
                        <input
                            className='bg-green-500 text-white font-bold hover:bg-sky-700 py-2 px-4 rounded-xl'
                            type='submit'
                            value='Add'
                        />
                    </form>
                </div>
                <h1>Task List Here</h1>
                <table cellPadding="2px" cellSpacing="0" border="2">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Task</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 &&
                            tasks.map((task, index) => (
                                <tr key={index}>
                                    <td className='px-8 py-1'>{task.title}</td>
                                    <td className='px-8 py-1'>{task.task}</td>
                                    {task.status === "pending" ? (<td className='px-8 py-1'>
                                        <button className="px-3 bg-sky-600 mx-3 rounded-xl py-2 font-bold text-white " onClick={() => setEditTask(task, setEdit(true))}>Edit</button>
                                        <button className="px-3 bg-red-600 rounded-xl py-2 font-bold text-white" onClick={() => onDelete(task._id)}>Delete</button>
                                    </td>) : ''}
                                    <td>
                                        <button className="px-3 bg-green-600 rounded-xl py-2 font-bold text-white" onClick={() => complete(task._id)}>{task.status === "complete" ? "completed" : "complete"}</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {edit && <Edittask task={editTask} getTodo={getTodo} setEdit={setEdit} />}
            </div>
            <ToastContainer />
        </>
    );
};

export default Todo;
