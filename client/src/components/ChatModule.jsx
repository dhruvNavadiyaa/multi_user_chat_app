import React from 'react'
import '../css/Utility.css'

export default function ChatModule() {
    return (
        <div className='p-10  container h-screen bg-neutral-800'  >

            <div className="flex flex-col bg-neutral-900 h-full      rounded-2xl text-white">

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

                <div class="p-4 grow rounded-xl overflow-y-scroll vertical-scroll"id="messageContainer">
                    <div class="my-1  flex items-center float-start clear-both" id="leftMessage">
                        <p class=" underline text-xs">dhruv</p>&nbsp;&nbsp;
                        <p class="px-4 py-2 text-slate-300 rounded-lg bg-slate-600 ">Hii!</p>
                    </div>
                    <div class="my-1  flex items-center float-end clear-both" id="rightMessage">
                        <p class="px-4 py-2 text-slate-300 rounded-lg bg-slate-600">hello!</p>&nbsp;&nbsp;
                        <p class="text-xl">.</p>
                    </div>
                </div>

                <div class="p-4 ">
                    <form action="" id="form" class="flex">
                        <input type="text" placeholder="Please enter message here!"
                            class="me-3 px-5 py-2 rounded-lg w-full bg-neutral-800 text-slate-300 focus:outline-none"
                            id="messageInput" />
                        <button class="px-5 py-2 rounded-lg bg-neutral-600 shadow-2xl	text-neutral-300 hover:bg-neutral-700">Send</button>
                    </form>
                </div>

            </div>

        </div>
    )
}
