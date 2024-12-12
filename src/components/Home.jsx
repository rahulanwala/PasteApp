// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { Copy, PlusCircle } from "lucide-react";

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find(
                (p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            // update
            dispatch(updateToPastes(paste));
        } else {
            // create
            dispatch(addToPastes(paste));
        }

        // after creation and updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    const resetPaste = () => {
        setTitle("");
        setValue("");
        setSearchParams({});
    };

    return (
        <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0'>
            <div className='flex flex-col gap-y-5 items-start'>

                <div className='w-full flex flex-row gap-x-4 justify-between items-center'>
                    <input className={`${pasteId ? "w-[80%]" : "w-[85%]"
                        } bg-gray-200 text-black placeholder-neutral-700 border border-input rounded-md p-2`}
                        type="text" placeholder='Enter Title' value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                    <button onClick={createPaste} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2'>
                        {
                            pasteId ? "Update Paste" : "Create My Paste"
                        }
                    </button>

                    {pasteId && <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={resetPaste}>
                        <PlusCircle size={20} />
                    </button>}
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
                                navigator.clipboard.writeText(value);
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
                            {value.split('\n').map((_, index) => index + 1).join('\n')}
                        </div> 
                        <textarea className='bg-neutral-800 p-2 w-full focus:outline-none' rows="15" value={value} placeholder='Enter content here...'
                            onChange={(e) => setValue(e.target.value)} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home
