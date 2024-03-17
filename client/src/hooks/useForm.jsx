// dependencies
import { useState } from "react";

/**
 * take object as argument and handle input change, handle form reset and return input state
 * @param {*} initialState : expecting object
 * @returns return input state, input change handler & reset form handler
 */
const useForm = (initialState) => {
  // input state management
  const [input, setInput] = useState(initialState);

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form reset
  const resetForm = () => {
    setInput(initialState);
  };

  // return input state, input change handler & reset form handler
  return { input, handleInputChange, resetForm };
};

export default useForm;
