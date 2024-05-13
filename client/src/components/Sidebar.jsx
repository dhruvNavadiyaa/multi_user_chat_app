import React from 'react'

export default function Sidebar() {
    return (
        <div className='border-4 h-screen   ' style={{ width: '5vw' }}>
            {/* <p className='my-10 font-mediumm text-3xl'>Messages</p> */}
            <div className='flex justify-center'>
            <p className='text-3xl text-red-600'>&#x2022;</p>
            <p className='text-3xl text-green-700'>&#x2022;</p>
            <p className='text-3xl text-blue-600'>&#x2022;</p>
            </div>
        </div>
    )
}
