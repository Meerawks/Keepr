import React from 'react'

export default function Navbar({searchText, handleSearchText}) {
  return (
    <div className='flex justify-between h-20 mt-5 mx-10'>
        <a href="/"><h1 className='text-4xl highlight text-slate-400 mytext'>Keepr</h1></a>
        <div className='w-1/3'>
        <div className="mb-3 ">
          <div className="absolute left-0 right-0 ml-auto mr-auto px-10  top-20  md:top-0 md:relative mb-4 flex md:w-full items-stretch border-solid">
              <input
                
                  type="search"
                  className=" relative m-0 block flex-auto rounded-md border border-solid border-slate-400 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-red-600 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2" 
                  value={searchText}
                  onChange={(e)=>{handleSearchText(e.target.value)}}
                  />

              {/* <!--Search icon--> */}
              <span
                  className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                  id="basic-addon2">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 fill-slate-400">
                      <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd" />
                  </svg>
              </span>
          </div>
      </div>
        </div>
        <a href='/add-note'><button className='bg-slate-400 w-40 px-5 border-solid rounded-md h-10 text-slate-900 mybtn'>Add Note ➕</button></a>
    </div>
  )
}
