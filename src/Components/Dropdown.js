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
  selectedData
}) => {
  const [vehiclesHidden, setVehiclesHidden] = useState({
    "1": false,
    "2": false,
    "3": false,
    "4": false
  });
  const [selectedPlanet, setSelectedPlanet] = useState({
    "1": [],
    "2": [],
    "3": [],
    "4": []
  });

  useEffect(() => {
    if (isReset) {
      setSelectedPlanet((prevSelectedPlanet) => ({
        "1": [],
        "2": [],
        "3": [],
        "4": []
      }));
      setVehiclesHidden({
        "1": false,
        "2": false,
        "3": false,
        "4": false
      });
    }
  }, [isReset]);

  const {enqueueSnackbar} = useSnackbar()

  const handleDropdownChange = (event) => {
    handleData(event, ke);
    const dict = data.filter((item) => item.name === event.target.value);
    setSelectedPlanet((prevSelectedPlanet) => ({
      ...prevSelectedPlanet,
      [ke]: dict[0]
    }));
    setVehiclesHidden({ ...vehiclesHidden, [ke]: true });
  };

  return (
    <div className="box-border h-60 w-36">
      <div>
        <label
          htmlFor={`Destination-${ke}`}
          className="flex justify-center items-center text-slate-950 font-semibold"
        >
          Destination-{ke}
        </label>
        <select
          name={`Destination-${ke}`}
          id={`Destination-${ke}`}
          onChange={handleDropdownChange}
          className="p-2 mx-5 text-slate-600 font-medium"
        >
          <option value="">Select</option>
          {data.map((item, ind) => {
            return (
              <option
                key={ind}
                value={item.name}
                className="text-slate-700 font-medium"
              >
                {item.name}
              </option>
            );
          })}
        </select>
      </div>

      {vehiclesHidden[ke] && (
        <div className="px-1" style={{ whiteSpace: "nowrap" }}>
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
                      if (selectedData.length === selectedVehicles.length + 1) {
                        handleVehicles(event, ke);
                      } else {
                        enqueueSnackbar('User is not allowed to move to same planet twice', { variant: 'warning' });
                      }
                    }}
                    disabled={isOptionDisabled}
                  />
                  <label
                    htmlFor={`Destination-${ke}-${vehicle.name}`}
                    className={`ml-2 font-semibold ${
                      isOptionDisabled ? "text-slate-300" : " text-slate-700"
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
