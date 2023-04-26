import { useState } from 'react';
import { omit } from 'lodash';
import constants from '../../Helpers/en';

const useForm = (callback) => {
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case 'billing_first_name':
      case 'billing_last_name':
        if (!new RegExp(/^[a-zA-Z ]+$/).test(value)) {
          // we will set the error state
          setErrors({
            ...errors,
            [name]: constants.ONLY_ALPHABETS_ERROR_MESSAGE,
          });
        } else {
          // set the error state empty or remove the error for username input
          let newObj = omit(errors, name);
          setErrors(newObj);
        }
        break;

      case 'billing_user_email':
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            [name]: constants.INVALIAD_EMAIL_ERROR_MESSAGE,
          });
        } else {
          let newObj = omit(errors, name);
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);
    //Let's set these values in state

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert('There is an Error!');
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
