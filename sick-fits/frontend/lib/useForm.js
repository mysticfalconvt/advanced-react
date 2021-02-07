import { useState } from "react";

export default function useForm(initial = {}) {
  // create state object for inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      value[0] = e.target.files;
    }

    setInputs({
      // existing state
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""]),
    );
    setInputs(blankState);
  }
  // return what we want to surface
  return {
    inputs,
    handleChange,
    clearForm,
    resetForm,
  };
}
