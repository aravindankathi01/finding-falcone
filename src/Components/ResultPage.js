import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import {saveResult} from "../utils/SaveResult"
const ResultPage = () => {
  const dispatch = useDispatch()
 const Result = useSelector((store)=>{ return store.result.isFound})
 console.log(Result)
 const {time_taken,status,planet_name} = Result
  return (
    <div className="grid place-content-center">
       {(status === "success") ?<div className="flex flex-col items-center justify-center w-screen">
        <p className='text-xl text-slate-600 font-semibold my-3'>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</p>
        <h2 className='text-2xl text-slate-600 font-semibold my-3'>Time taken :{time_taken.time}</h2>
        <h3 className='text-2xl text-slate-600 font-semibold my-3'>Planet_Found:{planet_name}</h3>
      </div>:
      <h1 className="flex flex-col items-center justify-center w-screen text-3xl text-red-500 font-semibold my-3">Not Found 🥺</h1>
      }
      <div className="flex justify-center items-center w-screen my-20">
        <Link to="/" className="font-semibold text-3xl rounded-full p-2 bg-gradient-to-r from-black to-white text-white shadow-2xl" 
          onClick = {()=>{
            dispatch(saveResult({}))
          }}
          >
          Play Again
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
