import React from 'react'

const Shimmer = () => {
  return (
    <>
    <div className="flex justify-center items-center w-screen my-10">
        <h2 className="text-2xl text-slate-800 text-center p-2">
          Select planets you want to search in:
        </h2>
      </div>
      <div className="flex justify-center my-8">
        <button
          className="font-semibold text-3xl rounded-full p-2 bg-gradient-to-r from-slate-700 to-white text-white shadow-2xl"
        >
          Reset
        </button>
      </div>
    <div className="flex justify-center">
    <div className="grid md:grid-cols-4 grid-cols-2 gap-3 md:gap:5 w-auto h-auto">
      <div className="border-2 border-slate-500 w-36 h-14"></div>
      <div className="border-2 border-slate-500 h-14 w-36"></div>
      <div className="border-2 border-slate-500 h-14 w-36"></div>
      <div className="border-2 border-slate-500 h-14 w-36"></div>
    </div>
  </div>
  <h1 className="text-3xl font-semibold text-slate-800 flex justify-center mb-6 mt-20">
        Time taken:
      </h1>
      <div className="flex justify-center items-center w-screen">
        <button
          className="font-semibold text-3xl rounded-full p-2 bg-gradient-to-r from-slate-700 to-white text-white shadow-2xl"
        >
          Find Falcone
        </button>
      </div>
  </>
  )
}

export default Shimmer