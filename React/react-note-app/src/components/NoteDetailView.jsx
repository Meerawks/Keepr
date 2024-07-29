import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export default function NoteDetailView({notes}) {

  const [note, setNote] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const date = new Date(note.updated);
  const updatedate =date.getDate() + " " + (date.toLocaleString('default', { month: 'long' })) + " " + date.getFullYear() +  " at " +  date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
  const date2 = new Date(note.created);
  const createdate=date2.getDate() + " " + (date2.toLocaleString('default', { month: 'long' })) + " " + date2.getFullYear() +  " at " +  date2.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

  let navigate = useNavigate(); 
  const id = searchParams.get('id')


  useEffect(()=>{
    
    axios.get(`https://oyster-app-mrdrl.ondigitalocean.app/notes/${id}`)
    .then(res=>{
        console.log(res.data)
        setNote(res.data)
    })
    .catch(err=>{
      console.log(err.message)
    })
  
  },[])

  function deleteNote(){
    const id = searchParams.get('id')
    axios.delete(`https://oyster-app-mrdrl.ondigitalocean.app/notes/${id}`)
    .then(res=>{
      console.log("Deleted Successfully")
      toast.warning("Note has been deleted")
      setTimeout(() => {
        let path = `/`; 
        navigate(path);
      }, 2000);
    })
    .catch(err=>{
      console.log(err.message)
    })
  }

  return (
    <>
    <ToastContainer theme="dark" />
      {
        note.length!==0 ? (
          <div className='mt-10 flex flex-col w-3/4 ml-auto mr-auto md:w-2/4 lg:w-2/4 mx-10 p-5 bg-zinc-900 rounded-md gap-10 shadow-md'>
        <div className=' bg-zinc-900 flex flex-col'>
            <div className='flex flex-col gap-5 lg:flex-row bg-zinc-900 items-center justify-between'>
            <p className='bg-zinc-900 text-2xl sm:text-3xl md:text-4xl font-bold'>{note.title}</p>
            <div className='bg-zinc-900 flex flex-row items-center gap-5'>
             
              <a href={`/edit-note/${note.slug}?id=${note.id}`}><button className='bg-slate-400 px-5 border-solid rounded-md h-10 text-slate-900 mybtn text-sm md:text-base'> Update</button></a>
              <button  className='bg-rose-400 px-5 border-solid rounded-md h-10 text-slate-900 mybtncancel text-center flex items-center gap-2 text-sm md:text-base' onClick={deleteNote}>Delete</button>
            </div>
            </div>
            <div className='bg-zinc-900 flex flex-col lg:flex-row gap-2 lg:gap-5 mt-4'>
            <p className='bg-zinc-900 text-xs opacity-50'>Created: {createdate}</p>
            <p className='bg-zinc-900 text-xs opacity-50'>Last updated:  {updatedate}</p>
            </div>
        </div>
        <div className='bg-zinc-900'>
            <p className='bg-zinc-900 text-md text-justify opacity-80'>{note.body}</p>
        </div>
        <div className='bg-zinc-900 flex  gap-2'>
        {
            note.category =='BUSINESS' ? <img className='w-5 bg-zinc-900' src='/business.svg' alt='Business Symbol' /> : note.category=='PERSONAL' ? <img className='w-3.5 bg-zinc-900' src='/personal.svg' alt='personal Symbol' /> : <img className='w-5 bg-zinc-900' src='/important.svg' alt='important Symbol' />
          }
            <p className='bg-zinc-900'> {note.category &&  note.category.slice(0,1) + note.category.slice(1).toLowerCase()}</p>
        </div>
    </div>
        ) :
        <div className='mt-10 flex flex-col w-3/4 ml-auto mr-auto md:w-2/4 lg:w-2/4 mx-10 p-5 bg-zinc-900 rounded-md gap-10 shadow-md'>
        <div className=' bg-zinc-900 flex flex-col'>
        <h1 className="flex flex-col justify-center items-center gap-5"> <img className="w-10 rotate" src="../spinner.svg"/></h1>
        </div>
    </div>
        
      }
    </>
  )
}
