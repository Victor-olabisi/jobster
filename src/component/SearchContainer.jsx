import { useSelector, useDispatch } from "react-redux";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import Wrapper from "../assets/wrappers/SearchContainer";
import { clearFilter , handleChange} from "../features/all-jobs/allJobs";
const SearchContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  
  const handleSearch = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(value);
    dispatch(handleChange({name,value}))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilter())
  };
  return (
    <Wrapper>
      <form className="form">
        {/* <h2>search</h2> */}
        <div className="form-center">
          <FormRow
            name="search"
            value={search}
            type="search"
            handleChange={handleSearch}
          />
          <FormRowSelect
            name="searchStatus"
            labelText="status"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            name="searchType"
            list={["all", ...jobTypeOptions]}
            handleChange={handleSearch}
            value={searchType}
            labelText="job type"
          />
          <FormRowSelect
            name="sort"
            list={sortOptions}
            handleChange={handleSearch}
            value={sort}
          />
          <button className="btn btn-block btn-danger" type="button" onClick={handleSubmit}>
            clear filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
