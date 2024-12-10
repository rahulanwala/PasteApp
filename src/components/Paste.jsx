// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { Calendar, Copy, Eye, PencilLine, Share, Trash2 } from "lucide-react";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
    const pastes = useSelector((state)=>state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste)=>paste.title.toLowerCase().
        includes(searchTerm.toLowerCase())
    )

    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId))
    }

  return (
    <div className='w-full'>
      <input className='p-2 rounded-xl w-full mt-10 bg-gray-200 text-black placeholder-neutral-700' 
      type='search' placeholder='Search paste here' value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)} /> 

        <div className="w-full mt-10 bg-gray-100 rounded-md bg-opacity-20 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
            
            <h3 className="px-4 text-4xl font-semibold border-b border-w border-[rgba(128,121,121,0.3)] pb-2">
                All Pastes
            </h3>
            
            <div className='flex flex-col gap-5 m-5 w-full'>
                {
                    filteredData.length > 0 ?
                    filteredData.map(
                        (paste) => {
                            return (
                                <><div className='border rounded-md w-[97%] p-2 justify-between flex flex-col sm:flex-row'>

                                    <div className='flex flex-col items-start m-3 mt-1 gap-2'>
                                        <p className='font-semibold text-3xl'>{paste.title}</p>
                                        <p className='font-normal text-md line-clamp-3 max-w-[40%] text-[#707070]'>{paste.content}</p>
                                    </div>

                                    <div className="flex flex-col gap-y-4 sm:items-end pt-3">
                                        <div className='flex flex-row gap-4 place-content-evenly'>
                                            <button className='p-3'>
                                                <Link to={`/?pasteId=${paste?._id}`}>
                                                    <PencilLine
                                                        className="text-white group-hover:text-blue-500"
                                                        size={20}
                                                    />
                                                </Link>
                                            </button>
                                            <button className='p-3'>
                                                <Link to={`/pastes/${paste?._id}`}>
                                                    <Eye
                                                        className="text-white group-hover:text-orange-500"
                                                        size={20}
                                                    />
                                                </Link>
                                            </button>
                                            <button className='p-3' onClick={() => handleDelete(paste?._id)}>
                                                <Trash2
                                                    className="text-white group-hover:text-pink-500"
                                                    size={20}
                                                />
                                            </button>
                                            <button className='p-3' onClick={() =>{
                                                navigator.clipboard.writeText(paste?.content)
                                                toast.success("Copied to Clipboard",{
                                                    position: "top-right",
                                                })}}>
                                                    <Copy
                                                        className="text-white group-hover:text-green-500"
                                                        size={20}
                                                    />
                                                </button>
                                            <button className='p-3' onClick={() =>{
                                                toast.error("Share option is not available yet.")}}>
                                                <Share
                                                    className="text-white group-hover:text-green-500"
                                                    size={20}
                                                />
                                            </button>
                                        </div>
                                        <div className='gap-x-2 flex '>
                                            <Calendar className="text-white" size={25} />
                                            {FormatDate(paste.createdAt)}
                                        </div>
                                        
                                    </div>
                                </div></>
                            )
                        }
                    ): (
                        <div className="text-2xl text-center w-full text-chileanFire-500">
                          No Data Found
                        </div>
                      )
                }
            </div>
        </div>
    </div>
  )
}

export default Paste
