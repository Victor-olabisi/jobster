import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormRow from '../../component/FormRow'
import { toast } from 'react-toastify'
import { updateUserProfile } from '../../features/user/userSlice'

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [profileDetails, setProfileDetails] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || ' ',
    location:user?.location || ' '
    
  })
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setProfileDetails({...profileDetails, [name]:value})
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const {name,lastName, location, email}= profileDetails
    if (!name || !lastName || !location || !email) {
      toast.error('please fill all input')
      return
    }
    dispatch(updateUserProfile({ name, email, lastName, location }));
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            handleChange={handleChange}
            value={profileDetails.name}
          />
          <FormRow
            type="text"
            name="lastName"
            handleChange={handleChange}
            labelText="last name"
            value={profileDetails.lastName}
          />
          <FormRow
            type="text"
            name="location"
            handleChange={handleChange}
            value={profileDetails.location}
          />

          <FormRow
            type="email"
            name="email"
            handleChange={handleChange}
            value={profileDetails.email}
          />
          <button type='submit' className="btn" disabled={isLoading}>{isLoading ? 'saving...' : 'save'}</button>
        </div>
      </form>
    </Wrapper>
  );
}
export default Profile