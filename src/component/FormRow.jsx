const FormRow = ({name, type, handleChange, value}) => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    
    </div>
  );
}
export default FormRow