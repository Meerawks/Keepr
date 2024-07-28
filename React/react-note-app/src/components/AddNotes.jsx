import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function AddNotes() {

  const [title, setTitle]= useState('')
  const [body, setBody]= useState('')
  const [category, setCategory]= useState('')
  const [submit, setSubmit] = useState(false)
  const [exception, setException] = useState('')

  let navigate = useNavigate(); 

  const newNote = {
    title : title,
    body : body,
    category : category
  }

  const handleSubmit = (e) => {
    if(!title)
      setException("Please enter Content")
    if(!body)
      setException("Please enter a Title")
    if(!category)
      setException("Select a Category")
    if(title && body && category)
      console.log(newNote)
      axios.post("http://127.0.0.1:8000/notes/" , newNote)
      .then(res=> {
        console.log (res.data)
        toast.success('A new note has been added')
        setSubmit(true)
        setTimeout(() => {
          setSubmit(false);
          let path = `/`; 
          navigate(path);
        }, 2000);
      })
      .catch(err => {console.log(err.message)})
    
  }

  return (
    <>
    <ToastContainer theme='dark'/>
    <div>
       {
        submit &&  <p className=' text-center text-green-500'>Note was added successfully!</p>
       }
    <div className='flex flex-col h-auto w-4/5 mx-10 lg:w-3/5 xl:w-1/3 ml-auto mr-auto m-10 p-5 gap-10 bg-zinc-900 rounded-md shadow-md'>
      
        <h1 className='bg-zinc-900 text-2xl font-bold text-center'>Add New Note</h1>
        <div className='flex flex-col bg-zinc-900 gap-2'>
            <label className='bg-zinc-900 text-lg' htmlFor='title'>Title</label>
            <input className='bg-zinc-900 border border-gray-700 p-2 rounded-md text-sm' type='text' placeholder='Enter note&apos;s title' id='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div className='flex flex-col bg-zinc-900 gap-2'>
         <label className='bg-zinc-900 text-lg' htmlFor='content'>Content</label>
         <input className='bg-zinc-900 border  border-gray-700 p-2 rounded-md text-sm' type='textarea' placeholder='Enter note&apos;s content' id='content' value={body} onChange={(e)=>setBody(e.target.value)}/>
        </div>
        <div className='flex flex-col gap-2 bg-zinc-900'>
         <label className='bg-zinc-900 text-lg' htmlFor='category'>Note's Category</label>
         <select className='bg-zinc-900 border  border-gray-700 text-slate-400  text-sm pl-2 pr-2 py-2 border-solid rounded-md' value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All Notes</option>
            <option value="BUSINESS">Business</option>
            <option value="PERSONAL">Personal</option>
            <option value="IMPORTANT">Important</option>
            </select>
        </div>
        <button className='bg-slate-400 w-40 px-5 border-solid rounded-md h-10 text-slate-900 self-center mybtn' onClick={handleSubmit}>
            Add Note
        </button>
      
    </div>
    </div>
    </>
  )
}
