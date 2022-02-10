import * as EmailValidator from 'email-validator';

const useValidators = () => {
  const validateRequired = (value: any): boolean => {
    if (!value || (value && value.toString().trim() === '')) {
      return false
    } else {
      return true;
    }
  }

  const validateLength = (value: any, min: number, max?: number): boolean => {
    let isValid = true;
    if (value.toString().length < min) {
      isValid = false;
    }

    if (max && value.toString().length > max) {
      isValid = false
    }

    return isValid
  }

  const validateEmail = (value: string): boolean => {
    return EmailValidator.validate(value);
  }

  return {
    validateRequired,
    validateLength,
    validateEmail
  }
}



export default useValidators;