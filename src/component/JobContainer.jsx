import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../features/all-jobs/allJobs";
import { useEffect } from "react";

const JobContainer = () => {
    

    const { isLoading, jobs } = useSelector((store) => store.allJobs);
    const dispatch = useDispatch();
     useEffect(() => {
       dispatch(getAllJobs());
     }, []);
  
  if (isLoading) {
    return (
      <Wrapper>
        <div className="loading loading-center"></div>
      </Wrapper>
    );
  }
  if (jobs.length === 0) {
      return <Wrapper>
          <h2>no jOB to display </h2>
      </Wrapper>
  }
   
  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
      );
    // return <h2>job container</h2>
};
export default JobContainer;
