import React from 'react'

export default function NotesCard({note}) {

  const date = new Date(note.updated);
  const newdate =date.getDate() + " " + (date.toLocaleString('default', { month: 'long' })) + " " + date.getFullYear() +  " at " +  date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

  return (
    <div className='flex flex-col w-full md:w-3/4 lg:w-1/4 mx-10 p-5 bg-zinc-900 rounded-md gap-5 shadow-md'>
        <div className=' bg-zinc-900 flex flex-col'>
            <div className='flex bg-zinc-900 justify-between items-center'>
            <a href={`/notes/${note.slug}?id=${note.id}`}><p className='bg-zinc-900 text-2xl'>{note.title}</p></a>
            <div className='hidden lg:inline lg:w-4 lg:h-4 lg:rounded-full' style={{backgroundColor : note.category == 'BUSINESS' ? '#959cfc' : note.category=='PERSONAL' ? "#8c767d" : '#e34b7e' }}>

            </div>
            </div>
            
            <p className='bg-zinc-900 text-xs opacity-50'>{newdate}</p>
        </div>
        <div className='bg-zinc-900'>
            <p className='bg-zinc-900 text-sm opacity-80'>{note.body.split(" ").slice(0,20).join(" ")}</p>
        </div>
        <div className='bg-zinc-900 flex  gap-2'>
          {
            note.category =='BUSINESS' ? <img className='w-5 bg-zinc-900' src='/business.svg' alt='Business Symbol' /> : note.category=='PERSONAL' ? <img className='w-3.5 bg-zinc-900' src='/personal.svg' alt='personal Symbol' /> : <img className='w-5 bg-zinc-900' src='/important.svg' alt='important Symbol' />
          }
            <p className='bg-zinc-900 capitalize'>{note.category.slice(0,1) + note.category.slice(1).toLowerCase() }</p>
        </div>
    </div>
  )
}
