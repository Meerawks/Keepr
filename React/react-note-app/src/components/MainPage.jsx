import React from 'react'
import NotesCardContainer from './NotesCardContainer'
import Filter from './Filter'
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


export default function MainPage({searchNotes, searchText}) {

  const [notes, setNotes] = useState([])

  const [filteredText, setFilteredText] = useState("")

  const filteredNotes = filteredText=='BUSINESS' ? notes.filter(note=> note.category=='BUSINESS') : filteredText=='PERSONAL' ? notes.filter(note=> note.category=='PERSONAL')
   : filteredText =='IMPORTANT' ? notes.filter(note=> note.category=='IMPORTANT') : notes

  const handleFilteredText = (val) => {
    setFilteredText(val)
  
  };

  useEffect(()=>{
    axios.get("https://oyster-app-mrdrl.ondigitalocean.app/notes/")
    .then(res=>{
        console.log(res.data)
        setNotes(res.data)
    })
    .catch(err=>{
      console.log(err.message)
    })
  }, [])

  return (
    <>
    <Filter  filteredText={filteredText} handleFilteredText={handleFilteredText} />
   
    {!searchText.length==0 ? (<NotesCardContainer notes={searchNotes}/>): notes.length!==0 ? (<NotesCardContainer notes={filteredNotes}/>): <h1 className="flex flex-col justify-center items-center gap-5 mt-10"> <img className="w-10 rotate" src="../spinner.svg"/></h1>}

    </>
  )
}
