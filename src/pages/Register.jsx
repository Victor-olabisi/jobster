import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../component/Logo";
import FormRow from "../component/FormRow";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    if (
      !values.email ||
      !values.password ||
      (!values.isMember && !values.name)
    ) {
      toast.error("please fill all input");
    }
    if (values.isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name: name, email: email, password: password }));
  };
  
  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
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
        <p>
          {values.isMember ? 'don"t have an account yet' : "already a member"}
          <button className="member-btn" onClick={toggleMember}>
            {values.isMember ? "register" : "login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
