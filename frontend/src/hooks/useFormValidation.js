import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value, validationMessage, form } = evt.target;

    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage };
    });

    setIsValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsValid(false);
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });
  }, []);

  return { values, errors, isValid, handleChange, reset, setValue };
}
