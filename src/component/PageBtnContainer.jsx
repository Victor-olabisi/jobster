import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { changePage } from "../features/all-jobs/allJobs";

const PageBtnContainer = () => {
  const dispatch = useDispatch();
  const {isLoading, numOfPages, page } = useSelector((store) => {
    return store.allJobs
  });
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  // prev btn
  const prevBtn = () => {
    let newPage = page - 1
    if (newPage <1) {
      newPage = numOfPages
    }
    dispatch(changePage(newPage))
  }
  // next btn
  const nextBtn = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    dispatch(changePage(newPage))
  }
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevBtn}> <HiChevronDoubleLeft /> prev</button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return <button className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} key={pageNumber} onClick={()=>dispatch(changePage(pageNumber))}>{pageNumber}</button>
        })}
      </div>
      <button className="next-btn" onClick={nextBtn}><HiChevronDoubleRight/> next</button>
    </Wrapper>
  );
};
export default PageBtnContainer;
