import React, { useState, useEffect } from "react";

const Dropdown = ({ data, ke, handleData, vehicles, handleVehicles, isReset }) => {
  const [vehiclesHidden, setVehiclesHidden] = useState(
    {
      "1": false,
      "2": false,
      "3": false,
      "4": false
    } 
  );
  const [selectedPlanet, setSelectedPlanet] = useState({
    "1": [],
    "2": [],
    "3": [],
    "4": []
  });

  useEffect(()=>{
    if (isReset) {
      setSelectedPlanet((prevSelectedPlanet) => ({
        "1": [],
        "2": [],
        "3": [],
        "4": []
      }));
      setVehiclesHidden(
        {
          "1": false,
          "2": false,
          "3": false,
          "4": false
        } 
      )
    }
  },[isReset])

  

  const handleDropdownChange = (event) => {
  
    handleData(event, ke);
    const dict = data.filter((item) => item.name === event.target.value);
    setSelectedPlanet((prevSelectedPlanet) => ({
      ...prevSelectedPlanet,
      [ke]: dict[0],
    
    }));
    setVehiclesHidden({...vehiclesHidden,[ke]:true});

  };

  return (
    <div className="relative">
      <div className="flex flex-col mb-4">
        <label htmlFor={`Destination-${ke}`} className="mr-2">
          Destination-{ke}
        </label>
        <select
          name={`Destination-${ke}`}
          id={`Destination-${ke}`}
          onChange={handleDropdownChange}
          className="p-2 border"
        >
          <option value="">Select</option>
          {data.map((item, ind) => {
            return (
              <option key={ind} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>

        {vehiclesHidden[ke] && (
          <div
            className="absolute mt-20 flex flex-col"
            style={{ whiteSpace: "nowrap" }}
          >
            <label htmlFor={`Vehicle-${ke}`} className="mr-2"></label>
            {vehicles.map((vehicle, index) => {
              const isOptionDisabled = vehicle.total_no === 0;
              const isDistanceValid =
                selectedPlanet[ke].name.length &&
                vehicle.max_distance >= selectedPlanet[ke].distance;
               
              return (
                isDistanceValid && (
                  <div key={index} className="ml-2">
                    <input
                      type="radio"
                      id={`Destination-${ke}-${vehicle.name}`}
                      name={`Destination-${ke}`}
                      value={vehicle.name}
                      onChange={(event) => {
                        handleVehicles(event, ke);
                      }}
                      disabled={isOptionDisabled}
                    />
                    <label
                      htmlFor={`Destination-${ke}-${vehicle.name}`}
                      className="ml-2"
                    >
                      {vehicle.name + vehicle.total_no}
                    </label>
                    <br />
                  </div>
                )
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
