import { useState } from "react";
import  '../../styles/formInput.css'



const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {  label, errorMessage, onchange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  

  return (
<>
   
    <div className="form-outline mb-2">
      <label className="form-label" htmlFor={inputProps.name}  >{label}</label>
      <input  className="form-control form-control-lg fi" {...inputProps}
        onChange={onchange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()} />
      <span className="fs">{errorMessage}</span>
    </div>
    </>
  );
};

export default FormInput;