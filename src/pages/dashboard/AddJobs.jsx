import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import FormRow from "../../component/FormRow";
import FormRowSelect from "../../component/FormRowSelect";
import { handleFormInput, clearValues } from "../../features/job/jobSlice";
import { addJobs } from "../../features/job/jobSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddJobs = () => {
  const {
    isLoading,
    company,
    position,
    jobLocation,
    isEditing,
    status,
    statusOptions,
    jobTypeOptions,
    jobType,
  } = useSelector((store) => store.job);
  const {user}= useSelector((store)=>store.user)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleFormInput({ name, value }));
  };

  useEffect(() => {
    dispatch(handleFormInput({name:'jobLocation',value:user.location}))
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("please fill all values");
      return;
    }
    dispatch(addJobs({position, company, jobLocation,jobType,status}))
  };
  return (
    <Wrapper>
      <form className="form">
        <h2>{isEditing ? "edit" : "add job"}</h2>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleChange}
          />
          <FormRowSelect
            name="status"
            value={status}
            list={statusOptions}
            handleChange={handleChange}
          />
          <FormRowSelect
            name="jobType"
            value={jobType}
            list={jobTypeOptions}
            labelText="job type"
            handleChange={handleChange}
          />

          <div className="btn-container">
            <button className="btn btn-block clear-btn" type="button" onClick={()=>dispatch(clearValues())}>
              clear{" "}
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJobs;
