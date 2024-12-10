import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router';
import {useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { Copy} from "lucide-react";

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state)=> state.paste.pastes);
  
  const paste = allPastes.find((p) => p._id===id);


  return (
    <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0'>
            <div className='flex flex-col gap-y-5 items-start'>

                <div className='w-full flex flex-row gap-x-4 justify-between items-center'>
                    <input className={`w-full bg-gray-200 text-black placeholder-neutral-700 border border-input rounded-md p-2`}
                        type="text" placeholder='Enter Title' value={paste.title}
                        disabled />
                </div>

                <div className={`w-full flex flex-col bg-gray-100 items-start relative rounded-md bg-opacity-20 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}>

                    <div className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-0.5 border-b border-[rgba(128,121,121,0.3)]`}>
                        <div className="w-full flex gap-x-[6px] items-center select-none group">
                            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
                            <div className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`} />
                            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
                        </div>

                        <button
                            className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                            onClick={() => {
                                navigator.clipboard.writeText(paste.content);
                                toast.success("Copied to Clipboard", {
                                    position: "top-right",
                                });
                            }}>
                            <Copy className="group-hover:text-sucess-500" size={18} />
                        </button>
                    </div>

                    <div className={`w-full rounded-t flex border-b border-[rgba(128,121,121,0.3)]`}>
                        <div className='bg-neutral-900 p-2 text-right min-w-[10px] text-white overflow-hidden'
                            style={{ whiteSpace: 'pre-wrap' }}>
                            {paste.content.split('\n').map((_, index) => index + 1).join('\n')}
                        </div> 
                        <textarea className='bg-neutral-800 p-2 min-w-[500px] w-full focus:outline-none' rows="15" value={paste.content} placeholder='Enter content here...'
                            disabled />
                    </div>

                </div>

            </div>
        </div>
  )
}

export default ViewPaste
 