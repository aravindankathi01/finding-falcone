import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import { saveResult } from "../utils/SaveResult";

const ResultPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const result = useSelector((store) => store.result.isFound);
  const { time_taken, status, planet_name } = result;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'success') {
      enqueueSnackbar('You have successfully found Falcone', { variant: 'success' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <div className="grid place-content-center">
      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center w-screen">
          <p className="text-xl text-slate-800 font-semibold my-3 text-center">Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</p>
          <h2 className="text-2xl text-slate-600 font-semibold my-3">Time taken: {time_taken.time}</h2>
          <h3 className="text-2xl text-slate-600 font-semibold my-3">Planet Found: {planet_name}</h3>
        </div>
      ) : (
        <h1 className="flex flex-col items-center justify-center w-screen text-3xl text-slate-500 font-semibold my-3 text-center">SAD... Not Found 🥺</h1>
      )}
      <div className="flex justify-center items-center w-screen my-20">
        <Link
          onClick={()=>{dispatch(saveResult({}))}}
          to="/"
          className="font-semibold text-3xl p-2 bg-gradient-to-r from-slate-200 to-slate-700 shadow-2xl rounded-md text-white"
        >
          Play Again
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
