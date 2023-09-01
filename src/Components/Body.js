import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveResult } from "../utils/SaveResult";
import { useSnackbar } from "notistack";
import Shimmer from "./Shimmer";

const Body = () => {
  const navigate = useNavigate();
  const [isReset, setIsReset] = useState(false);
  const [planetsData, setPlanetsData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState([]);
  const [time, setTime] = useState(0);
  const [planetsOptions, setPlanetsOptions] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const [vehiclesOptions, setVehiclesOptions] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await fetchPlanets();
      await fetchVehicles();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPlanets.length === selectedVehicles.length) {
      timeTaken(selectedPlanets, selectedVehicles);
      // console.log(time);
    }
    // console.log(selectedVehicles);
  }, [selectedVehicles, selectedPlanets]);

  function timeTaken(planets, vehicles) {
    // console.log(">time taken", planets, vehicles);
    let time = 0;
    for (let i = 0; i < planets.length; i++) {
      time += planets[i]?.distance / vehicles[i]?.speed;
    }
    setTime(time);
    return time;
  }

  function handleVehiclesData(event, ke) {
    const { value } = event.target;
    const selected = vehiclesData.filter((item) => value === item.name);
    setSelectedVehicles([...selectedVehicles, selected[0]]);

    const updatedFilteredVehicles = vehiclesOptions[ke].map((vehicle) => {
      if (vehicle.name === value) {
        return { ...vehicle, total_no: vehicle.total_no - 1 };
      }
      return vehicle;
    });

    setVehiclesOptions({
      ...vehiclesOptions,
      [ke]: updatedFilteredVehicles,
      [ke + 1]: updatedFilteredVehicles,
    });
  }

  function handleChange(event, ke) {
    const { value } = event.target;
    const selected = planetsData.filter((item) => value === item.name);

    if (selectedPlanets.length === selectedVehicles.length + 1) {
      selectedPlanets.pop();
      setSelectedPlanets([...selectedPlanets, selected[0]]);
    } else if (selectedPlanets.length === selectedVehicles.length) {
      setSelectedPlanets([...selectedPlanets, selected[0]]);
    }

    let left = planetsOptions[ke].filter((item) => {
      return item.name !== value;
    });
    setPlanetsOptions({ ...planetsOptions, [ke + 1]: left });
    isReset &&
      setVehiclesOptions({
        1: vehiclesData,
        2: [],
        3: [],
        4: [],
      });
    // console.log(">>isReset",isReset)
    setIsReset(false);
  }

  function validation() {
    if (selectedPlanets.length === 4 && selectedVehicles.length === 4) {
      return true;
    }
    return false;
  }

  async function postData() {
    if (validation()) {
      try {
        const planets = selectedPlanets.map((item) => item.name);
        const vehicles = selectedVehicles.map((item) => item.name);
        const tokendummy = await getToken();
        const body = {
          token: tokendummy.token,
          planet_names: planets,
          vehicle_names: vehicles,
        };

        const response = await fetch("https://findfalcone.geektrust.com/find", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          let data = await response.json();
          // console.log(data)
          if (data.status === "success") {
            data = { ...data, time_taken: { time } };
            dispatch(saveResult(data));
          }
        } else {
          console.log("Request failed", response.status);
        }
      } catch (error) {
        console.log("API Failure:", error.message);
        enqueueSnackbar(error.message, { variant: "error" });
        return null;
      }
    } else {
      // console.log(
      //   "To move further please select all destinations and respective vehicles available"
      // );
      enqueueSnackbar(
        "To move further please select all destinations and respective vehicles available",
        { variant: "warning" }
      );
    }
  }

  async function getToken() {
    try {
      const response = await fetch("https://findfalcone.geektrust.com/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(">>> token", data);
        return data;
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log("API Failure:", error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      return null;
    }
  }

  async function fetchPlanets() {
    try {
      const response = await fetch("https://findfalcone.geektrust.com/planets");
      const data = await response.json();
      setPlanetsData(data);
      setPlanetsOptions({ ...planetsOptions, 1: data });
      return data;
    } catch (error) {
      console.log("API Failure:", error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      return null;
    }
  }

  async function fetchVehicles() {
    try {
      const response = await fetch(
        "https://findfalcone.geektrust.com/vehicles"
      );
      const data = await response.json();
      setVehiclesData(data);
      setVehiclesOptions({ ...vehiclesOptions, 1: data });
      return data;
    } catch (error) {
      console.log("API Failure:", error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      return null;
    }
  }

  if (planetsData.length === 0) return <Shimmer />;

  const dropdowns = Array.from({ length: 4 }, (_, index) => (
    <Dropdown
      key={index + 1}
      ke={index + 1}
      data={planetsOptions[index + 1]}
      handleData={handleChange}
      vehicles={vehiclesOptions[index + 1]}
      handleVehicles={handleVehiclesData}
      isReset={isReset}
      selectedVehicles={selectedVehicles}
      selectedData={selectedPlanets}
      planetsOptions={planetsOptions}
      vehiclesOptions={vehiclesOptions}
    />
  ));

  return (
    <>
      <div className='flex justify-center items-center w-screen my-10'>
        <h2 className='text-2xl text-slate-800 text-center p-2'>
          Select planets you want to search in:
        </h2>
      </div>
      <div className='flex justify-center my-8'>
        <button
          className='font-semibold text-3xl rounded-md p-2 bg-gradient-to-r from-slate-700 to-white text-white shadow-2xl'
          onClick={() => {
            setSelectedVehicles([]);
            setSelectedPlanets([]);
            setVehiclesOptions({
              1: [],
              2: [],
              3: [],
              4: [],
            });
            setPlanetsOptions({
              1: planetsData,
              2: [],
              3: [],
              4: [],
            });
            setIsReset(true);
          }}>
          Reset
        </button>
      </div>

      <div className='flex justify-center'>
        <div className='grid md:grid-cols-4 grid-cols-2 gap-3 md:gap:5 w-auto h-auto'>
          {dropdowns}
        </div>
      </div>

      <h1 className='text-3xl font-semibold text-slate-800 flex justify-center mb-6'>
        Time taken: {time}
      </h1>

      <div className='flex justify-center items-center w-screen'>
        <div
          // to={validation() && "/results"}
          className='font-semibold text-3xl rounded-md p-2 bg-gradient-to-r from-slate-700 to-white text-white shadow-2xl'
          onClick={() => {
            postData();
            validation && navigate("/results");
          }}>
          Find Falcone
        </div>
      </div>
    </>
  );
};

export default Body;
