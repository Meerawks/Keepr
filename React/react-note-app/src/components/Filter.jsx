import React from 'react'

export default function Filter({filteredText,handleFilteredText}) {
  return (
    <div className='absolute left-10 top-32 md:static md:flex md:mt-0 md:w-1/3 ml-auto mr-auto  flex-col gap-2'>
        <p className='ml-2 text-sm font-light mb-1'>Filter</p>
        <select className='bg-zinc-900 border  border-gray-700 text-slate-400 pl-2 pr-2 py-2 border-solid rounded-md text-lg' onChange={(e)=>{handleFilteredText(e.target.value)}}>
            <option value="">All Notes</option>
            <option value="BUSINESS">Business</option>
            <option value="PERSONAL">Personal</option>
            <option value="IMPORTANT">Important</option>
        </select>
    </div>
  )
}
