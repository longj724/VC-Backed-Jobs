import { useContext, createContext, useEffect, useState } from 'react';
import axios from 'axios';

const JobsContext = createContext();
const LocationFilterContext = createContext();
const RoleFilterContext = createContext();

export function useJobs() {
  return useContext(JobsContext);
}

export function useFilterLocation() {
  return useContext(LocationFilterContext);
}

export function useFilterRole() {
  return useContext(RoleFilterContext);
}

const JobsProvider = ({ children }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [curLocationFilter, setCurLocationFilter] = useState([]);
  const [curRoleFilter, setCurRoleFilter] = useState([]);

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

  const addRoleFilter = (role) => {
    setJobs(jobs.filter((job) => job.role.includes(role)));

    let temp = curRoleFilter;
    temp.push(role);
    setCurRoleFilter(temp);
  };

  const removeRoleFilter = (role) => {
    let temp = curRoleFilter.filter((rl) => {
      return rl !== role;
    });

    setCurRoleFilter(temp);
  };

  const reapplyFilters = () => {
    let temp = [];
    for (let job of allJobs) {
      if (
        (curLocationFilter.length === 0 ||
          curLocationFilter.some((loc) => job.location.includes(loc))) &&
        (curRoleFilter.length === 0 || curRoleFilter.some((role) => job.role.includes(role)))
      ) {
        temp.push(job);
      }
    }
    setJobs(temp);
  };

  useEffect(() => {
    console.log('in useEffect');
    reapplyFilters();
  }, [curLocationFilter, curRoleFilter]);

  return (
    <JobsContext.Provider value={jobs}>
      <LocationFilterContext.Provider
        value={{ add: addLocationFilter, remove: removeLocationFilter }}
      >
        <RoleFilterContext.Provider
          value={{ add: addRoleFilter, remove: removeRoleFilter }}
        >
          {children}
        </RoleFilterContext.Provider>
      </LocationFilterContext.Provider>
    </JobsContext.Provider>
  );
};

export default JobsProvider;
