import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function EditNote() {

  const [searchParams, setSearchParams] = useSearchParams()
  let navigate = useNavigate(); 
  const [title, setTitle]= useState('')
  const [body, setBody]= useState('')
  const [category, setCategory]= useState('')

  const newNote = {
    title : title,
    body : body,
    category : category
  }

  const id = searchParams.get('id')
  function editNote(){
   
    console.log(`http://127.0.0.1:8000/notes/${id}/`)
    console.log(newNote)
    axios.put(`http://127.0.0.1:8000/notes/${id}/`, newNote)
    .then(res=> {
      console.log (res.data)
      toast.success('Note has been updated')
      setTimeout(() => {
        let path = `/`; 
        navigate(path);
      }, 2000);
    })
    .catch(err => {console.log(err.message)})
  }

  useEffect(()=>{
    const id = searchParams.get('id')
    axios.get(`http://127.0.0.1:8000/notes/${id}/`)
    .then(res=>{
        console.log(res.data)
        setTitle(res.data.title)
        setBody(res.data.body)
        setCategory(res.data.category)
    })
    .catch(err=>{
      console.log(err.message)
    })
  
  },[id])


  return (
    <>
    <ToastContainer theme="dark" />
    <div className='flex flex-col w-4/5 mx-10 lg:w-3/5 xl:w-1/3 ml-auto mr-auto m-10 p-5 gap-10 bg-zinc-900 rounded-md shadow-md'>
    <h1 className='bg-zinc-900 text-2xl font-bold text-center'>Update Note</h1>
    <div className='flex flex-col bg-zinc-900 gap-2'>
        <label className='bg-zinc-900 text-lg' htmlFor='title'  >Title</label>
        <input className='bg-zinc-900 border border-gray-700 p-2 rounded-md text-sm' type='text' id='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </div>
    <div className='flex flex-col bg-zinc-900 gap-2'>
     <label className='bg-zinc-900 text-lg' htmlFor='content'>Content</label>
     <input className='bg-zinc-900 border  border-gray-700 p-2 rounded-md text-sm' type='textarea' value={body} onChange={(e)=>setBody(e.target.value)} id='content' />
    </div>
    <div className='flex flex-col gap-2 bg-zinc-900'>
     <label className='bg-zinc-900 text-lg' htmlFor='category'  >Note's Category</label>
     <select className='bg-zinc-900 border  border-gray-700 text-slate-400  text-sm pl-2 pr-2 py-2 border-solid rounded-md' value={category}  onChange={(e)=>setCategory(e.target.value)}>
        <option value="">All Notes</option>
        <option value="BUSINESS">Business</option>
        <option value="PERSONAL">Personal</option>
        <option value="IMPORTANT">Important</option>
        </select>
    </div>
    <button className='bg-slate-400 w-40 px-5 border-solid rounded-md h-10 text-slate-900 self-center mybtn' onClick={editNote}>
        Update
    </button>
</div>
</>
  )
}
