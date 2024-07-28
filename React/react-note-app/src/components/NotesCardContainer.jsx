import React from 'react'
import NotesCard from './NotesCard'

export default function NotesCardContainer({notes}) {

  
  return (
    <div >
        <div className='flex flex-wrap mt-28 justify-center gap-10'>
        {notes.map(note => <NotesCard key={note.id} note={note} />)}
            
        </div>
    </div>
  )
}
