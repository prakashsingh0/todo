
import React, { useEffect, useState } from 'react';
import { apiurl } from '../apiurl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

const Profile = () => {
    const token = sessionStorage.getItem("token")
    const [updating, setUpdating] = useState(false);
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        fetchProfile();
    });

    const fetchProfile = async () => {
        try {
            const response = await axios.get(apiurl + `getmyprofile`, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            });
            setUser(response?.data?.user);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const { fullName, email, phone } = user;
            const body = { fullName, email, phone };
            const response = await axios.put(apiurl + 'profileUpdate', body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response?.data?.message);
            setUpdating(false); // Close the update form
            fetchProfile(); // Refresh profile data
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='flex justify-center flex-col w-screen items-center'>

            <div className='border-2 p-5'>
                <h1><b>Full Name =&gt; </b>{user.fullName} </h1>
                <h1><b>User Name =&gt; </b>{user.userName} </h1>
                <h1><b>Email  =&gt; </b>{user.email} </h1>
                <h1><b>Phone Number =&gt; </b>{user.phone} </h1>
                <button className='px-4 py-1 rounded-full hover:bg-gray-200 border border-gray-400 cursor-pointer' onClick={() => setUpdating(true)}>Edit Profile</button>
            </div>
            {updating && <div tabindex="-1" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update Your Profile
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setUpdating(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form className="p-4 md:p-5" onSubmit={updateProfile}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                    <input type="text" name="fullName" id="fullName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={user.fullName} onChange={handleInputChange} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={user.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required  value={user.email} onChange={handleInputChange} />
                                </div>


                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Profile;
