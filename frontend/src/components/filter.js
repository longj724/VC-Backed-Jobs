import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
  const [viewTeamDropdown, setViewTeamDropdown] = useState(false);
  const [curTeamValue, setcurTeamValue] = useState('');

  const roleInputChange = (e) => {
    setViewTeamDropdown(true);
    setcurTeamValue(e.target.value);
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
                placeholder="Job Title, keywords, or company"
                class="appearance-none rounded rounded-l border border-gray-400 border-b block pl-8 pr-6 py-2 w-3/4 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="max-w-md mx-auto">
            <label for="select" class="font-semibold block py-2">
              Company:
            </label>
            <div class="relative">
              <div class="h-8 bg-white flex border-b-2 border-indigo-500  items-center">
                <input
                  value={curTeamValue}
                  placeholder="Select"
                  name="select"
                  id="select"
                  class="px-4 appearance-none outline-none text-gray-800 w-full"
                  onChange={roleInputChange}
                  autoComplete="off"
                />
                <button
                  onClick={() => setcurTeamValue('')}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 mr-2"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="h-3 border"></div>
                <button
                  onClick={() => setViewTeamDropdown(false)}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 ml-2"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
              <div
                class={`absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200 ${
                  viewTeamDropdown ? '' : 'hidden'
                }`}
              >
                <div class="cursor-pointer group">
                  <p class="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                    Python
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <label for="select" class="font-semibold block py-2">
              Location:
            </label>

            <div class="relative">
              <div class="h-8 bg-white flex border-b-2 border-indigo-500  items-center">
                <input
                  value={curTeamValue}
                  placeholder="Select"
                  name="select"
                  id="select"
                  class="px-4 appearance-none outline-none text-gray-800 w-full"
                  onChange={roleInputChange}
                  autoComplete="off"
                />
                <button
                  onClick={() => setcurTeamValue('')}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 mr-2"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="h-3 border"></div>
                <button
                  onClick={() => setViewTeamDropdown(false)}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 ml-2"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
              <div
                class={`absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200 ${
                  viewTeamDropdown ? '' : 'hidden'
                }`}
              >
                <div class="cursor-pointer group">
                  <p class="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                    Python
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <label for="select" class="font-semibold block py-2">
              Team:
            </label>
            <div class="relative">
              <div class="h-8 bg-white flex border-b-2 border-indigo-500  items-center">
                <input
                  value={curTeamValue}
                  placeholder="Select"
                  name="select"
                  id="select"
                  class="px-4 appearance-none outline-none text-gray-800 w-full"
                  onChange={roleInputChange}
                  autoComplete="off"
                />
                <button
                  onClick={() => setcurTeamValue('')}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 mr-2"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="h-3 border"></div>
                <button
                  onClick={() => setViewTeamDropdown(false)}
                  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600 ml-2"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
              <div
                class={`absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200 ${
                  viewTeamDropdown ? '' : 'hidden'
                }`}
              >
                <div class="cursor-pointer group">
                  <p class="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
                    Python
                  </p>
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
