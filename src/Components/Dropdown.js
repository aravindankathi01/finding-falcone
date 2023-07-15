import React, { useState } from "react";

const Dropdown = ({ data, ke, handleData, vehicles, handleVehicles }) => {
  const [vehiclesHidden, setVehiclesHidden] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState({});

  const handleDropdownChange = (event) => {
    handleData(event, ke);
    setVehiclesHidden(true);
    const dict = data.filter((item) => item.name === event.target.value);
    setSelectedPlanet(dict[0]);
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
          
        {vehiclesHidden && (
        <div
          className="absolute mt-20 flex flex-col"
          style={{ whiteSpace: "nowrap" }}
        >
          <label htmlFor={`Vehicle-${ke}`} className="mr-2"></label>
          {vehicles.map((vehicle, index) => {
            const isOptionDisabled = vehicle.total_no === 0; // Check if the number of available vehicles is zero

            return (
              vehicle.max_distance >= selectedPlanet.distance && (
                <div key={index} className="ml-2">
                  <input
                    type="radio"
                    id={`Destination-${ke}-${vehicle.name}`}
                    name={`Destination-${ke}`}
                    value={vehicle.name}
                    onChange={(event) => {
                      handleVehicles(event, ke);
                    }}
                    disabled={isOptionDisabled} // Disable the option if the number of available vehicles is zero
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
