import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../features/all-jobs/allJobs";
import { useEffect } from "react";
import PageBtnContainer from "./PageBtnContainer";

const JobContainer = () => {
  const { isLoading, jobs, numOfPages, totalJobs } = useSelector(
    (store) => store.allJobs
  );
  console.log(jobs);
  console.log(totalJobs);
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
    return (
      <Wrapper>
        <h2>no jOB to display </h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs}job{totalJobs > 1 && "s"} foundssss
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
  // return <h2>job container</h2>
};
export default JobContainer;
