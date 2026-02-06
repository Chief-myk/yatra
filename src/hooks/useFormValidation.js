import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = 'This field is required';
        } else if (value.length < 2) {
          error = 'Must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^[0-9+\-\s()]{10,}$/.test(value)) {
          error = 'Invalid phone number';
        }
        break;

      case 'passportNumber':
        if (!value.trim()) {
          error = 'Passport number is required';
        } else if (!/^[A-Z0-9]{6,12}$/.test(value)) {
          error = 'Invalid passport number format';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return !error;
  };

  const validateForm = (formData) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'passportNumber'];
    let isValid = true;
    const newErrors = {};

    requiredFields.forEach(field => {
      const fieldError = validateField(field, formData[field]);
      if (!fieldError) {
        newErrors[field] = errors[field] || 'This field is required';
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
    }

    return isValid;
  };

  return {
    errors,
    validateField,
    validateForm,
    setErrors
  };
};

export default useFormValidation;