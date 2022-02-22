import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import {
  useJobs,
  useFilterRole,
  useFilterLocation,
} from '../context/JobsProvider';

const Filter = () => {
  const DEFAULT_LOCATIONS = [
    'New York City, NY',
    'San Francisco, CA',
    'Los Angeles, CA',
    'Atlanta, GA',
    'Remote',
  ];

  const jobs = useJobs();

  const addFilterLocation = useFilterLocation()['add'];
  const removeFilterLocation = useFilterLocation()['remove'];
  const addFilterRole = useFilterRole()['add'];
  const removeFilterRole = useFilterRole()['remove'];

  const [viewRoleDropdown, setViewRoleDropdown] = useState(false);
  const [curRole, setCurRole] = useState('');
  const [savedRoles, setSavedRoles] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const allRoles = jobs.map((job) => job.role);

  const [viewLocationDropdown, setViewLocationDropdown] = useState(false);
  const [curLocation, setCurLocation] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  const allLocations = jobs.map((job) => job.location);

  const roleInputChange = (e) => {
    roleDropdownOptions(e);
    setViewRoleDropdown(true);
    setCurRole(e.target.value);
  };

  const roleDropdownOptions = (e) => {
    const entered = e.target.value.toUpperCase();
    let options = [];
    for (let role of allRoles) {
      
      if (role.toUpperCase().includes(entered) && !options.includes(role)) options.push(role);

      if (options.length === 5) {
        break;
      }
    }
    setRoleOptions(options);
  };

  const selectRole = (e) => {
    addFilterRole(e.target.textContent);
    setCurRole(e.target.textContent);
    setViewRoleDropdown(false);

    let temp = savedRoles;
    temp.push(e.target.textContent);
    setSavedRoles(temp);
  };

  const removeSavedRole = (e) => {
    setSavedRoles(savedRoles.filter((rol) => rol !== e.currentTarget.value));
    removeFilterRole(e.currentTarget.value);
  };

  const locationDropdownOptions = (e) => {
    const entered = e.target.value.toUpperCase();
    let options = [];
    for (let loc of allLocations) {
      if (loc.toUpperCase().includes(entered) && !options.includes(loc)) options.push(loc);

      if (options.length === 5) {
        break;
      }
    }
    setLocations(options);
  };

  const locationInputChange = (e) => {
    locationDropdownOptions(e);
    setViewLocationDropdown(true);
    setCurLocation(e.target.value);
  };

  const selectLocation = (e) => {
    addFilterLocation(e.target.textContent);
    setCurLocation(e.target.textContent);
    setViewLocationDropdown(false);

    let temp = savedLocations;
    temp.push(e.target.textContent);
    setSavedLocations(temp);
  };

  const removeSavedLocation = (e) => {
    setSavedLocations(
      savedLocations.filter((loc) => loc !== e.currentTarget.value)
    );
    removeFilterLocation(e.currentTarget.value);
  };

  return (
    <div className="rounded-md w-full row-span-1 grid grid-rows-1 bg-gray-100">
      <div className="w-5/6 justify-self-center grid grid-rows-3">
        <div className="grid grid-cols-2 row-span-1">
          <h2 className="justify-self-center self-center font-bold text-xl">
            Search for jobs
          </h2>
          <div className="self-center">
            <div className="block relative">
              <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Job title, keywords, or company"
                class="appearance-none rounded rounded-l border border-gray-400 border-b block pl-8 pr-6 py-2 w-3/4 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="max-w-md mx-auto">
            <label for="select" class="font-semibold block py-2">
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
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 ml-2"
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
                        class="block p-1 border-transparent border-l-4 hover:border-blue-600 hover:bg-gray-100"
                      >
                        {location}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <label for="select" class="font-semibold block py-2">
              Role:
            </label>
            <div class="relative">
              <div class="h-8 bg-white flex border-b-2 border-indigo-500  items-center">
                <input
                  value={curRole}
                  placeholder="Select"
                  name="select"
                  id="select"
                  class="px-4 appearance-none outline-none text-gray-800 w-full"
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
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 ml-2"
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
                class={`absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200 ${
                  viewRoleDropdown ? '' : 'hidden'
                }`}
              >
                <div class="cursor-pointer group">
                  {roleOptions.map((role) => {
                    return (
                      <p
                        onClick={selectRole}
                        class="block p-1 border-transparent border-l-4 hover:border-blue-600 hover:bg-gray-100"
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
        <div class="row-span-1"></div>
      </div>
    </div>
  );
};

export default Filter;
