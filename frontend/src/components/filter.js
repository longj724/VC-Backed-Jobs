import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

import {
  useJobs,
  useFilterRole,
  useFilterLocation,
} from '../context/JobsProvider';
import axios from 'axios';

const Filter = () => {
  const DEFAULT_LOCATIONS = [
    'New York City, NY',
    'San Francisco, CA',
    'Los Angeles, CA',
    'Atlanta, GA',
    'Remote',
  ];

  const jobs = useJobs()['filteredJobs'];

  const addFilterLocation = useFilterLocation()['add'];
  const removeFilterLocation = useFilterLocation()['remove'];
  const addFilterRole = useFilterRole()['add'];
  const removeFilterRole = useFilterRole()['remove'];

  const [viewRoleDropdown, setViewRoleDropdown] = useState(false);
  const [curRole, setCurRole] = useState('');
  const [savedRoles, setSavedRoles] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const allRoles = useJobs()['allJobs'].map((job) => job.role);

  const [viewLocationDropdown, setViewLocationDropdown] = useState(false);
  const [curLocation, setCurLocation] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  // let allLocations = useJobs()['allJobs'].map((job) => job.location);

  const roleInputChange = (e) => {
    roleDropdownOptions(e);
    setViewRoleDropdown(true);
    setCurRole(e.target.value);
  };

  const roleDropdownOptions = (e) => {
    const entered = e.target.value.toUpperCase();
    let options = [];
    for (let role of allRoles) {
      if (role.toUpperCase().includes(entered) && !options.includes(role))
        options.push(role);

      if (options.length === 5) {
        break;
      }
    }
    setRoleOptions(options);
  };

  const selectRole = (e) => {
    addFilterRole(e.target.textContent);
    setCurRole('');
    setViewRoleDropdown(false);

    let temp = savedRoles;
    temp.push(e.target.textContent);
    setSavedRoles(temp);
  };

  const removeSavedRole = (e) => {
    setSavedRoles(savedRoles.filter((rol) => rol !== e.currentTarget.value));
    removeFilterRole(e.currentTarget.value);
  };

  const locationDropdownOptions = async (value) => {
    const response = await axios.get('/location-options/' + value);
    const data = await response.data;
    let options = data.predictions.map((opt) => opt.description);
    setLocations(options);
  };

  const debounceLDO = _.debounce(locationDropdownOptions, 500);

  const locationInputChange = (e) => {
    debounceLDO(e.target.value);
    setViewLocationDropdown(true);
    setCurLocation(e.target.value);
  };

  const selectLocation = (e) => {
    // New York City, NY, USA -> New York City, NY
    const removeCountryName = e.target.textContent
      .split(',')
      .slice(0, -1)
      .join();
    addFilterLocation(removeCountryName);

    setCurLocation('');
    setViewLocationDropdown(false);

    let temp = savedLocations;
    temp.push(e.target.textContent);
    setSavedLocations(temp);
  };

  const removeSavedLocation = (e) => {
    setSavedLocations(
      savedLocations.filter((loc) => loc !== e.currentTarget.value)
    );

    const removeCountryName = e.currentTarget.value
      .split(',')
      .slice(0, -1)
      .join();
    removeFilterLocation(removeCountryName);
  };

  return (
    <div className="rounded-md w-full row-span-1 grid grid-rows-1 bg-gray-100">
      <div className="w-5/6 justify-self-center grid grid-rows-3">
        <div className="row-span-1 mt-5">
          <h1 className="font-bold text-xl inline">VC Backed Jobs</h1>
        </div>
        <div className="row-span-1 flex justify-start gap-20">
          <h2 className="justify-self-center self-center font-bold text-lg">
            Search for jobs
          </h2>
          <div className="">
            <label for="select" className="font-semibold block py-2">
              Location:
            </label>

            <div className="relative">
              <div className="h-8 bg-white flex border-b-2 border-indigo-500  items-center">
                <input
                  value={curLocation}
                  placeholder="Select"
                  name="select"
                  id="select"
                  className="px-4 appearance-none outline-none text-gray-800 w-full"
                  onChange={locationInputChange}
                  autoComplete="off"
                />
                <button
                  onClick={() => setCurLocation('')}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 mr-2"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="h-3 border"></div>
                <button
                  onClick={() => setViewLocationDropdown(!viewLocationDropdown)}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 ml-2 mr-2"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
              <div
                className={`bg-white flex border-b-2 flex-wrap gap-2 justify-center p-2 ${
                  savedLocations.length === 0 ? 'hidden' : ''
                }`}
              >
                {savedLocations.map((location) => {
                  return (
                    <div className="bg-indigo-200 p-1 rounded">
                      <p
                        className="inline mr-2 text-sm
                        "
                      >
                        {location}
                      </p>
                      <button
                        onClick={removeSavedLocation}
                        value={location}
                        className="cursor-pointer outline-none focus:outline-none transition-all text-gray-500 hover:text-gray-800 mr-2"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div
                className={`absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200 ${
                  viewLocationDropdown ? '' : 'hidden'
                }`}
              >
                <div className="cursor-pointer">
                  {locations.map((location) => {
                    return (
                      <p
                        onClick={selectLocation}
                        className="block p-1 border-transparent border-l-4 hover:border-blue-600 hover:bg-gray-100"
                      >
                        {location}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <label for="select" className="font-semibold block py-2">
              Role:
            </label>
            <div className="relative">
              <div className="h-8 bg-white flex border-b-2 border-indigo-500  items-center">
                <input
                  value={curRole}
                  placeholder="Select"
                  name="select"
                  id="select"
                  className="px-4 appearance-none outline-none text-gray-800 w-full"
                  onChange={roleInputChange}
                  autoComplete="off"
                />
                <button
                  onClick={() => setCurRole('')}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 mr-2"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="h-3 border"></div>
                <button
                  onClick={() => setViewRoleDropdown(false)}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 ml-2 mr-2"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
              <div
                className={`bg-white flex border-b-2 flex-wrap gap-2 justify-center p-2 ${
                  savedRoles.length === 0 ? 'hidden' : ''
                }`}
              >
                {savedRoles.map((role) => {
                  return (
                    <div className="bg-indigo-200 p-1 rounded">
                      <p
                        className="inline mr-2 text-sm
                        "
                      >
                        {role}
                      </p>
                      <button
                        onClick={removeSavedRole}
                        value={role}
                        className="cursor-pointer outline-none focus:outline-none transition-all text-gray-500 hover:text-gray-800 mr-2"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div
                className={`absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200 ${
                  viewRoleDropdown ? '' : 'hidden'
                }`}
              >
                <div className="cursor-pointer group">
                  {roleOptions.map((role) => {
                    return (
                      <p
                        onClick={selectRole}
                        className="block p-1 border-transparent border-l-4 hover:border-blue-600 hover:bg-gray-100"
                      >
                        {role}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-1"></div>
      </div>
    </div>
  );
};

export default Filter;
