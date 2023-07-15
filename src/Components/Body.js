import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveResult } from "../utils/SaveResult";

const Body = () => {
  const [isReset,setIsReset] = useState(false)
  const [planetsData, setPlanetsData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [time, setTime] = useState(0);
  const [options, setOptions] = useState({
    "1": [],
    "2": [],
    "3": [],
    "4": []
  });
  const [vehiclesOptions, setVehiclesOptions] = useState({
    "1": [],
    "2": [],
    "3": [],
    "4": []
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await fetchPlanets();
      await fetchVehicles();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedData.length === selectedVehicles.length) {
      timeTaken(selectedData, selectedVehicles);
      // console.log(time);
    }
  }, [selectedVehicles, selectedData]);

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

    setFilteredVehicles(updatedFilteredVehicles);
    setVehiclesOptions({
      ...vehiclesOptions,
      [ke]: updatedFilteredVehicles,
      [ke + 1]: updatedFilteredVehicles
    });
  }

  function handleChange(event, ke) {
    const { value } = event.target;
    const selected = planetsData.filter((item) => value === item.name);
    setSelectedData([...selectedData, selected[0]]);
    
    let left = options[ke].filter((item) => {
      return item.name !== value;
    });
    setOptions({ ...options, [ke + 1]: left });
    isReset&&setVehiclesOptions({
      "1": vehiclesData,
      "2": [],
      "3": [],
      "4": []
    })
    console.log(">>isReset",isReset)
    setIsReset(false)
  }

  function validation() {
    if (selectedData.length === 4 && selectedVehicles.length === 4) {
      return true;
    }
    return false;
  }

  async function postData() {
    if (validation()) {
      try {
        const planets = selectedData.map((item) => item.name);
        const vehicles = selectedVehicles.map((item) => item.name);
        const tokendummy = await getToken();
        const body = {
          token: tokendummy.token,
          planet_names: planets,
          vehicle_names: vehicles
        };

        const response = await fetch("https://findfalcone.geektrust.com/find", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          let data = await response.json();
          // console.log(data)
          data = { ...data, time_taken: { time } };
          dispatch(saveResult(data));
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.log("API Failure:", error.message);
        return null;
      }
    } else {
      console.log(
        "To move further please select all destinations and respective vehicles avaliable"
      );
    }
  }

  async function getToken() {
    try {
      const response = await fetch("https://findfalcone.geektrust.com/token", {
        method: "POST",
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(">>> token", data);
        return data;
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log("API Failure:", error.message);
      return null;
    }
  }

  async function fetchPlanets() {
    try {
      const response = await fetch("https://findfalcone.geektrust.com/planets");
      const data = await response.json();
      setPlanetsData(data);
      setOptions({ ...options, "1": data });
      return data;
    } catch (error) {
      console.log("API Failure");
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
      setFilteredVehicles(data);
      setVehiclesOptions({ ...vehiclesOptions, "1": data });
      return data;
    } catch (error) {
      console.log("API Failure");
      return null;
    }
  }

  if (planetsData.length === 0) return null;

  const dropdowns = Array.from({ length: 4 }, (_, index) => (
    <Dropdown
      key={index + 1}
      ke={index + 1}
      data={options[index + 1]}
      handleData={handleChange}
      vehicles={vehiclesOptions[index + 1]}
      handleVehicles={handleVehiclesData}
      isReset={isReset}
    />
  ));

  return (
    <>
      <div className="flex justify-center items-center w-screen my-10">
        <h2 className="text-2xl text-slate-800">
          Select planets you want to search in:
        </h2>
      </div>
      <div className="flex justify-end mx-12">
        <button
          className="font-semibold text-3xl rounded-full p-2 bg-gradient-to-r from-black to-white text-white shadow-2xl"
          onClick={() => {
            setSelectedVehicles([]);
            setSelectedData([]);
            setVehiclesOptions({
              "1": [],
              "2": [],
              "3": [],
              "4": []
            });
            setOptions({
              "1": planetsData,
              "2": [],
              "3": [],
              "4": []
            });
            setIsReset(true)
          }}
        >
          Reset
        </button>
      </div>

      <div className="flex justify-center items-center w-screen my-2 gap-10">
        {dropdowns}
      </div>

      <h1 className="text-3xl font-semibold text-slate-800 flex justify-end mx-12">
        Time taken: {time}
      </h1>

      <div className="flex justify-center items-center w-screen my-20">
        <Link
          to={validation() && "/results"}
          className="font-semibold text-3xl rounded-full p-2 bg-gradient-to-r from-black to-white text-white shadow-2xl"
          onClick={postData}
        >
          Find Falcone
        </Link>
      </div>
    </>
  );
};

export default Body;
