import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { useJobs } from '../context/JobsProvider';

const Board = () => {
  const jobs = useJobs()['filteredJobs'];
  const [pageNumber, setPageNumber] = useState(0);

  const jobsPerPage = 10;
  const pagesVisited = pageNumber * jobsPerPage;
  const pageCount = Math.ceil(jobs.length / jobsPerPage);

  const displayJobs = jobs
    .slice(pagesVisited, pagesVisited + jobsPerPage)
    .map((job) => {
      return (
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {job.name.charAt(0).toUpperCase() + job.name.substring(1)}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{job.role}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{job.team}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{job.location}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{job.firm}</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
              ></span>
              <span className="relative hover:cursor-pointer" >
                <a
                  href={'https://crunchbase.com/organization/' + job.name}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-2"
                >
                  Crunchbase
                </a>
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </span>
            </span>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
              ></span>
              <span className="relative hover:cursor-pointer" >
                <a
                  href={'https://linkedin.com/company/' + job.name.toLowerCase() + '/'}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-2"
                >
                  LinkedIn
                </a>
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </span>
            </span>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span className="relative hover:cursor-pointer" >
                <a
                  href={job.board === 'Greenhouse' ? 'https://boards.greenhouse.io' + job.link : job.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-2"
                >
                  Apply
                </a>
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </span>
            </span>
          </td>
        </tr>
      );
    });

  const nextPage = () => {
    if (pageNumber !== pageCount - 1) {
      setPageNumber((prevState) => prevState + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber !== 0) {
      setPageNumber((prevState) => prevState - 1);
    }
  };

  return (
    <div className="p-12 rounded-md w-full row-span-2">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Funded By
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Crunchbase
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  LinkedIn
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Application Link
                </th>
              </tr>
            </thead>
            <tbody>{displayJobs}</tbody>
          </table>
          <div className="px-4 py-4 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing page {pageNumber + 1} to {pageCount} of {jobs.length}{' '}
              Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={prevPage}
                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
              >
                Prev
              </button>
              &nbsp; &nbsp;
              <button
                onClick={nextPage}
                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
