import Navbar from "./components/Navbar"
import MainPage from "./components/MainPage"
import AddNotes from "./components/AddNotes"
import NoteDetailView from "./components/NoteDetailView"
import EditNote from "./components/EditNote"

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  
  const [notes, setNotes]=useState([])
  const [loading, setLoading]=useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchNotes, setSearchNotes]=useState([])

  const handleSearchText =(val)=>{
    setSearchText(val)
    console.log(searchText)
    axios.get(`https://oyster-app-mrdrl.ondigitalocean.app/notes-search/?search=${searchText}`)
    .then(res=>{
      console.log(res.data)
      setSearchNotes(res.data)
  })
  .catch(err=>{
    console.log(err.message)
  })
  }

  useEffect(()=>{
    handleSearchText("")
    axios.get("https://oyster-app-mrdrl.ondigitalocean.app/notes/")
    .then(res=>{
        console.log(res.data)
        setNotes(res.data)
        setLoading(false)
    })
    .catch(err=>{
      console.log(err.message)
      setLoading(true)
    })
  }, [])

  return (
    <>
    {loading ?  
    <h1 className="flex flex-col justify-center items-center h-screen gap-5">Fetching data from API  <img className="w-10 rotate" src="./spinner.svg"/></h1>
   
     : 
     
     <Router>
     <Navbar searchText={searchText} handleSearchText={handleSearchText} />
     <Routes>
       <Route exact path="" element={<MainPage searchNotes={searchNotes}  searchText={searchText} handleSearchText={handleSearchText} />}/>
       <Route exact path="https://66a7c7a1488af83ec7d98fbf--mellifluous-daffodil-9a7a9d.netlify.app/add-note" element={<AddNotes />}/>
       <Route exact path="/notes/:slug" element={<NoteDetailView notes={notes} />}/>
       <Route exact path="/edit-note/:id" element={<EditNote />}/>
     </Routes>
   </Router>

     }

    </>
  )
}

export default App
