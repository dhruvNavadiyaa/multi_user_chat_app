import React, { useEffect, useState } from 'react'
import '../css/Utility.css'
import { io } from 'socket.io-client'

let socket;
export default function Home() {

    // const userData = {name: null,id: null}
    // const allUsers = []
    const [userData, setUserData] = useState({ name: null, id: null });
    const [allUsers, setAllUsers] = useState([])
    const [currentChatUser, setCurrentChatUser] = useState()
    const [message, setMessage] = useState()

    const appendLeft = (data) => {
        const messageContainer = document.getElementById(`_${data.chatUserId}`)
        const messageElement = document.createElement('div')
        messageElement.classList.add('my-1', 'inline', 'flex', 'items-center', 'float-start', 'clear-both')
        messageElement.innerHTML = `<p class=" underline text-xs">.</p>&nbsp;&nbsp;<p class="px-4 py-2 text-slate-300 rounded-lg bg-slate-600 ">${data.message}</p>`
        messageContainer?.appendChild(messageElement)
    }
    const appendRight = (data) => {
        const messageContainer = document.getElementById(`_${data.chatUserId}`)
        const messageElement = document.createElement('div')
        messageElement.classList.add('my-1', 'inline', 'flex', 'items-center', 'float-end', 'clear-both')
        messageElement.innerHTML = ` <p class="px-4 py-2 text-slate-300 rounded-lg bg-slate-600">${data.message}</p>&nbsp;&nbsp<p class=" underline text-xs">.</p>`
        messageContainer?.appendChild(messageElement)
    }

    let name, id;

    const connection = async () => {
        name = prompt("Please enter your name!");
        if (name) {
            const newSocket = io('http://localhost:8000');

            newSocket.on('connect', () => {
                id = newSocket.id;
                console.log(id);
                setUserData({ name, id });
                newSocket.emit("user-joined", { name, id });
            });

            newSocket.on("new-user-joined", data => {
                setAllUsers(prevUsers => [...prevUsers, { id: data.id, name: data.name }]);
            });
            newSocket.on("current-users", data => {
                setAllUsers(data);
            });
            socket = newSocket;
        }
    }

    socket?.on("current-users", data => {
        setAllUsers(data);
        // console.log(data)
        // console.log(id)
    });

    const sendMessage = (e) => {
        e.preventDefault()
        let chatUserId = currentChatUser.id
        // console.log(chatUserId, message)
        socket.emit("message", { chatUserId, message })
        appendRight({ chatUserId, message })
        setMessage("")
    }

    useEffect(() => {
        connection()
        socket.on("receive-msg", data => {
            console.log(data)
            appendLeft(data)
        })
        return () => {
            if (socket) {
                // socket.emit("disconnect", userData)
                socket.disconnect();
            }
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
                                if (item.id !== userData.id) {
                                    // console.log(currentChatUser)
                                    return (
                                        <div className='flex items-center py-2 px-2 my-3 rounded-lg  hover:bg-neutral-800' key={item.id} onClick={() => { setCurrentChatUser(item) }}>
                                            <img src='https://www.svgrepo.com/show/527946/user-circle.svg' alt=""
                                                className='w-12 h-12 rounded-full object-cover'
                                            />
                                            <div className='ms-2'>
                                                <p className='mb-1 font-bold'>{item.name}</p>
                                                <p className='text-sm text-slate-400'>{item.id}</p>
                                            </div>
                                        </div>
                                    )
                                }

                            })
                        }

                    </div>

                </div>
            </div>


            {/* CHAT MODULE */}
            {
                allUsers.map((item) => {
                    // console.log(item.id)
                    return (
                        <div className='container h-full'  hidden={item.id !== currentChatUser?.id}>

                            <div className="flex flex-col bg-neutral-900 h-full   rounded-2xl text-white">

                                {/* USER DETAILS */}
                                <div className='rounded-2xl border-b bg-neutral-900'>
                                    <div className='flex items-center py-2 px-2 my-2 rounded-lg' >
                                        <img src='https://www.svgrepo.com/show/527946/user-circle.svg' alt=""
                                            className='w-12 h-12 rounded-full object-cover'
                                        />
                                        <div className='ms-4'>
                                            <p className='mb-1 font-bold'>{currentChatUser?.name || "user"}</p>
                                            <p className='text-sm text-green-600'>{currentChatUser?.id} is Online... </p>
                                        </div>
                                        <div className='ms-auto text-3xl me-5'>...</div>
                                    </div>
                                </div>

                                {/* CHATS */}

                                <div className="p-4 grow rounded-xl overflow-y-scroll vertical-scroll" id={`_${item.id}`}></div>

                                {/* MESSAGE SEND OPTIONS */}
                                <div className="p-4 ">
                                    <form action="" id="form" className="flex" onSubmit={(e) => { sendMessage(e) }}>
                                        <input type="text" placeholder="Please enter message here!"
                                            className="me-3 px-5 py-2 rounded-lg w-full bg-neutral-800 text-slate-300 focus:outline-none"
                                            id="messageInput"
                                            onChange={(e) => { setMessage(e.target.value) }}
                                            value={message}
                                        />
                                        <button className="px-5 py-2 rounded-lg bg-neutral-600 shadow-2xl	text-neutral-300 hover:bg-neutral-700" type='submit'>Send</button>
                                    </form>
                                </div>

                            </div>

                        </div>
                    )
                })
            }

        </div>
    )
}
