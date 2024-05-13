import React, { useEffect, useState } from 'react'
import '../css/Utility.css'
import { io } from 'socket.io-client'

export default function Home() {

    const userData = {
        name: null,
        id: null
    }
    // const allUsers = []
    const [allUsers, setAllUsers] = useState([])

    let socket
    const connection = async () => {
        
        if (userData.name) {
            socket = io('http://localhost:8000');

            socket.on('connect', () => {
                console.log(socket.id);
                userData.id = socket.id;
                socket.emit("user-joined", userData);
            });

            socket.on("new-user-joined", data => {
                setAllUsers(prevUsers => [...prevUsers, { id: data.id, name: data.name }]);
            });
            socket.on("current-users", data => {
                setAllUsers(data);
            });
        }
        else {
            userData.name = prompt("Please enter your name!");
        }
    }

    useEffect(() => {
        connection()
        return () => {
            socket.emit("disconnect", userData)
        }
    }, [])

    return (
        <div className='flex h-screen p-10 bg-neutral-800'>

            <div className='h-full me-5 px-5 rounded-2xl bg-neutral-900 ' style={{ width: '30vw' }}>
                <div>
                    <input type="text" className=' w-full my-10 p-2 text-white rounded-lg bg-neutral-700 focus:outline-none'
                        placeholder='Search!' />
                </div>
                <div className='text-white'>

                    <p className='mb-5 text-slate-400'>Direct Message</p>

                    {/* ALL Users */}
                    <div className=''>
                        {
                            allUsers.map((item) => {
                                return (
                                    <div className='flex items-center py-2 px-2 my-3 rounded-lg  hover:bg-neutral-800' >
                                        <img src='https://www.svgrepo.com/show/527946/user-circle.svg' alt=""
                                            className='w-12 h-12 rounded-full object-cover'
                                        />
                                        <div className='ms-2'>
                                            <p className='mb-1 font-bold'>{item.name}</p>
                                            <p className='text-sm text-slate-400'>{item.id}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </div>


            {/* CHAT MODULE */}
            <div className='container h-full'  >

                <div className="flex flex-col bg-neutral-900 h-full   rounded-2xl text-white">

                    {/* USER DETAILS */}
                    <div className='rounded-2xl border-b bg-neutral-900'>
                        <div className='flex items-center py-2 px-2 my-2 rounded-lg' >
                            <img src='https://www.svgrepo.com/show/527946/user-circle.svg' alt=""
                                className='w-12 h-12 rounded-full object-cover'
                            />
                            <div className='ms-4'>
                                <p className='mb-1 font-bold'>dhruv</p>
                                <p className='text-sm text-green-600'>Online...</p>
                            </div>
                            <div className='ms-auto text-3xl me-5'>...</div>
                        </div>
                    </div>

                    {/* CHATS */}
                    <div className="p-4 grow rounded-xl overflow-y-scroll vertical-scroll" id="messageContainer">
                        <div className="my-1  flex items-center float-start clear-both" id="leftMessage">
                            <p className=" underline text-xs">dhruv</p>&nbsp;&nbsp;
                            <p className="px-4 py-2 text-slate-300 rounded-lg bg-slate-600 ">Hii!</p>
                        </div>
                        <div className="my-1  flex items-center float-end clear-both" id="rightMessage">
                            <p className="px-4 py-2 text-slate-300 rounded-lg bg-slate-600">hello!</p>&nbsp;&nbsp;
                            <p className="text-xl">.</p>
                        </div>
                    </div>

                    {/* MESSAGE SEND OPTIONS */}
                    <div className="p-4 ">
                        <form action="" id="form" className="flex">
                            <input type="text" placeholder="Please enter message here!"
                                className="me-3 px-5 py-2 rounded-lg w-full bg-neutral-800 text-slate-300 focus:outline-none"
                                id="messageInput" />
                            <button className="px-5 py-2 rounded-lg bg-neutral-600 shadow-2xl	text-neutral-300 hover:bg-neutral-700">Send</button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}
