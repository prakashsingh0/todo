import axios from 'axios';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { apiurl } from '../apiurl';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const response = await axios.get(apiurl + `logout`, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            });
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user")
            toast.success(response?.data?.message);
            navigate('/');
        } catch (error) {
            console.error(error.response?.data?.error?.message);
            toast.error(error.response?.data?.error?.message)
        }
    };

    return (
        <>

            <div className='flex justify-between pt-3 font-bold' style={{ backgroundColor: "#808080", color: 'white', border: '1px solid black', height: '50px', justifyItems: 'center' }}>
                <div style={{ marginLeft: '2rem' }}>
                    <Link className="mx-1" to='/home/profile'>profile</Link>
                    <Link className="mx-1" to='/home/todo'>Todo</Link>
                </div>
                <button onClick={logoutHandler} style={{ marginRight: '2rem', cursor: 'pointer' }}>Log Out</button>

            </div>
            <div className=' flex' style={{ height: '90vh' }}>

                <Outlet />
                <ToastContainer />
            </div>

        </>
    );
};

export default Header;
