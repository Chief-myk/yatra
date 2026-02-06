export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const validatePhone = (phone) => {
  const pattern = /^[0-9+\-\s()]{10,}$/;
  return pattern.test(phone.replace(/\D/g, ''));
};

export const validatePassport = (passport) => {
  const pattern = /^[A-Z0-9]{6,12}$/;
  return pattern.test(passport);
};

export const validateName = (name) => {
  return name.length >= 2 && name.length <= 50;
};

export const validateDateOfBirth = (dob) => {
  const date = new Date(dob);
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 120);
  
  return date <= today && date >= minDate;
};

export const validatePassportExpiry = (expiry) => {
  const expiryDate = new Date(expiry);
  const today = new Date();
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(today.getMonth() + 6);
  
  return expiryDate > sixMonthsFromNow;
};

// Comprehensive form validator
export const validatePassengerForm = (formData) => {
  const errors = {};

  if (!validateName(formData.firstName)) {
    errors.firstName = 'First name must be 2-50 characters';
  }

  if (!validateName(formData.lastName)) {
    errors.lastName = 'Last name must be 2-50 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (formData.dateOfBirth && !validateDateOfBirth(formData.dateOfBirth)) {
    errors.dateOfBirth = 'Please enter a valid date of birth';
  }

  if (formData.passportNumber && !validatePassport(formData.passportNumber)) {
    errors.passportNumber = 'Please enter a valid passport number';
  }

  if (formData.passportExpiry && !validatePassportExpiry(formData.passportExpiry)) {
    errors.passportExpiry = 'Passport must be valid for at least 6 months';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};