import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const Dropdown = ({
  data,
  ke,
  handleData,
  vehicles,
  handleVehicles,
  isReset,
  selectedVehicles,
  selectedData,
  planetsOptions,
  vehiclesOptions
}) => {
  const [vehiclesHidden, setVehiclesHidden] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);

  useEffect(() => {
    if (isReset) {
      setSelectedPlanet(null);
      setVehiclesHidden(false);
    }
  }, [isReset]);

  const { enqueueSnackbar } = useSnackbar();

  const handleDropdownChange = (event) => {
    handleData(event, ke);
    const dict = data.filter((item) => item.name === event.target.value);
    setSelectedPlanet(dict[0]);
    setVehiclesHidden(true);
  };

  const handleVehicleChange = (event) => {
    if (selectedData.length === selectedVehicles.length + 1) {
      handleVehicles(event, ke);
    } else {
      enqueueSnackbar(
        "User is not allowed to move to same planet twice",
        { variant: "warning" }
      );
    }
  };

  useEffect(() => {
    setFilteredVehicles(vehiclesOptions[ke] || []);
  }, [vehiclesOptions, ke]);

  return (
    <div className="box-border h-60 w-36">
      <select
        name={`Destination-${ke}`}
        id={`Destination-${ke}`}
        onChange={handleDropdownChange}
        className="p-2 my-2 text-slate-600 font-medium w-32"
      >
        <option value="">Select</option>
        {data.map((item, ind) => (
          <option
            key={ind}
            value={item.name}
            className="text-slate-700 font-medium"
          >
            {item.name}
          </option>
        ))}
      </select>

      {vehiclesHidden && (
        <div className="px-1" style={{ whiteSpace: "nowrap" }}>
          <label htmlFor={`Vehicle-${ke}`} className="mr-2"></label>
          {filteredVehicles.map((vehicle, index) => {
            const isOptionDisabled = vehicle.total_no === 0;
            const isDistanceValid =
              selectedPlanet && vehicle.max_distance >= selectedPlanet.distance;

            return (
              isDistanceValid && (
                <div key={index} className="ml-2">
                  <input
                    type="radio"
                    id={`Destination-${ke}-${vehicle.name}`}
                    name={`Destination-${ke}`}
                    value={vehicle.name}
                    onChange={handleVehicleChange}
                    disabled={isOptionDisabled}
                  />
                  <label
                    htmlFor={`Destination-${ke}-${vehicle.name}`}
                    className={`ml-2 font-semibold ${
                      isOptionDisabled ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {vehicle.name + " " + vehicle.total_no}
                  </label>
                  <br />
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
