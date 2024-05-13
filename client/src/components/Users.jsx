import React from 'react'

export default function users() {
    return (
        <div className='h-screen px-5 border-e border-slate-900 bg-neutral-900	' style={{ width: '30vw' }}>
            <div>
                <input type="text" className=' w-full my-10 p-2 text-white rounded-lg bg-neutral-700 focus:outline-none'
                    placeholder='Search!' />
            </div>
            <div className='text-white'>

                <p className='mb-5 text-slate-400'>Direct Message</p>

                {/* Users */}
                <div className=''>

                    <div className='flex items-center py-2 px-2 my-3 rounded-lg  hover:bg-neutral-800' >
                        <img src='https://www.svgrepo.com/show/527946/user-circle.svg' alt=""
                            className='w-12 h-12 rounded-full object-cover'
                        />
                        <div className='ms-2'>
                            <p className='mb-1 font-bold'>dhruv</p>
                            <p className='text-sm text-slate-400'>How are you!</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
