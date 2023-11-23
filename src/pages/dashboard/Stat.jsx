import { useSelector, useDispatch } from 'react-redux'
import { showStat } from '../../features/all-jobs/allJobs'
import { useEffect } from 'react'
import StatContainer from '../../component/StatContainer'
import ChartContainer from '../../component/ChartContainer'
// import Wrapper from '../../assets/wrappers/'



const Stat = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(showStat())
 },[])
  const { isLoading, stats, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  if (isLoading) {
    return <div className="loading loading-center"></div>
  }
  return (
    <>
      <StatContainer />
      {monthlyApplications.length > 0 && <ChartContainer/>}
    </>
  )
}
export default Stat