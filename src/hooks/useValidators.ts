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

  return {
    validateRequired,
    validateLength
  }
}

export default useValidators;