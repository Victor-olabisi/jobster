const FormRowSelect = ({list,name,value, labelText, handleChange}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select name={name} id="status" value={value} className="form-select" onChange={handleChange}>
        {list.map((itemValue, index) => {
          return (
            <option value={itemValue} key={index}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}
export default FormRowSelect