import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../component/Logo";
import FormRow from "../component/FormRow";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({...values,isMember:!values.isMember})
  }

  const handleChange = (e) => {
  const  name = e.target.name
    const value = e.target.value
    console.log(name);
    console.log(value);
    setValues({ ...values, [name]: value })
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password || (!values.isMember && !values.name) ) {
     return toast.error('please fill all input')
      
    }
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit } className="form">
        <Logo />
        <h3>{values.isMember ? "login" : "register"}</h3>
        {!values.isMember && (
          <FormRow
            type={"text"}
            name={"name"}
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type={"email"}
          name={"email"}
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type={"password"}
          name={"password"}
          value={values.password}
          handleChange={handleChange}
        />

        <button className="btn btn-block" type="submit">
          submit{" "}
        </button>
        <p>{values.isMember ? 'don"t have an account yet' : 'already a member'}
          <button className="member-btn" onClick={toggleMember}>{values.isMember?'register':'login'}</button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
