import { useContext, createContext, useEffect, useState } from 'react';
import axios from 'axios';

const JobsContext = createContext();
const LocationFilterContext = createContext();

export function useJobs() {
  return useContext(JobsContext);
}

export function useFilterLocation() {
  return useContext(LocationFilterContext);
}

const JobsProvider = ({ children }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [curLocationFilter, setCurLocationFilter] = useState([]);
  const [curTeamFilter, setCurTeamFilter] = useState([]);
  const [curCompanyFilter, setCurCompanyFilter] = useState([]);

  async function getData() {
    await axios
      .get('/all-jobs')
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setJobs(res);
        setAllJobs(res);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const addLocationFilter = (location) => {
    setJobs(jobs.filter((job) => job.location.includes(location)));

    // Update location filter state
    let temp = curLocationFilter;
    temp.push(location);
    setCurLocationFilter(temp);
  };

  const removeLocationFilter = (location) => {
    let temp = curLocationFilter.filter((loc) => {
      return loc !== location;
    });
    
    setCurLocationFilter(temp);
  };

  const reapplyFilters = () => {
    let temp = [];
    for (let job of allJobs) {
      if (
        (curLocationFilter.length === 0 ||
          curLocationFilter.includes(job.location)) &&
        (curCompanyFilter.length === 0 ||
          curCompanyFilter.includes(job.name)) &&
        (curTeamFilter.length === 0 || curTeamFilter.includes(job.teamTag))
      ) {
        temp.push(job);
      }
    }
    setJobs(temp);
  };

  useEffect(() => {
    reapplyFilters();
  }, [curLocationFilter, curCompanyFilter, curTeamFilter]);

  return (
    <JobsContext.Provider value={jobs}>
      <LocationFilterContext.Provider
        value={{ add: addLocationFilter, remove: removeLocationFilter }}
      >
        {children}
      </LocationFilterContext.Provider>
    </JobsContext.Provider>
  );
};

export default JobsProvider;
