import { Form } from 'react-bootstrap';

const InputFields = ({
  inputLabel,
  inputName,
  inputValue,
  inputType,
  inputRequired,
  inputWrapperClass,
  inputInfoText,
  inputPlaceholder,
  inputClass,
  handleInputOnChange,
  ...props
}) => {
  return (
    <Form.Group className={`${inputWrapperClass ? inputWrapperClass : ''}`}>
      {inputLabel && <Form.Label htmlFor={inputName}>{inputLabel}</Form.Label>}
      <Form.Control
        type={inputType ? inputType : 'text'}
        className={`form-control ${inputClass}`}
        name="inputName"
        value={inputValue}
        placeholder={inputPlaceholder}
        onChange={() => handleInputOnChange}
        required={inputRequired ? inputRequired : false}
        {...props}
      />
      {inputInfoText && <Form.Text>{inputInfoText}</Form.Text>}
    </Form.Group>
  );
};
export default InputFields;
