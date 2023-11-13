import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../component/Logo";
import FormRow from "../component/FormRow";
const initialState = {
  name: "",
  email: "",
  password: "",
  ismember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
  const  name = e.target.name
    const value = e.target.value
    console.log(name);
    console.log(value);
    setValues({ ...values, [name]: value })
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={{ onSubmit }} className="form">
        <Logo />
        <h3>login</h3>
        <FormRow
          type={"text"}
          name={"name"}
          value={values.name}
          handleChange={handleChange}
        />
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
      </form>
    </Wrapper>
  );
};
export default Register;
