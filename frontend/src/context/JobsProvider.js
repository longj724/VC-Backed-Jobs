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
  const [curLocationFilter, setCurLocationFilter] = useState('');
  const [curTeamFilter, setCurTeamFilter] = useState('');
  const [curCompanyFilter, setCurCompanyFilter] = useState('');

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

  const filterByLocation = (location) => {
    setJobs(jobs.filter((job) => job.location.includes(location)));
  };

  return (
    <JobsContext.Provider value={jobs}>
      <LocationFilterContext.Provider value={filterByLocation}>
        {children}
      </LocationFilterContext.Provider>
    </JobsContext.Provider>
  );
};

export default JobsProvider;
