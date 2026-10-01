// Simple, readable email check: something@something.something
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => EMAIL_REGEX.test(email.trim());

// Returns an object of field -> error message. Empty object means valid.
export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';

  if (!password) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
  return errors;
}

export function validateSignup({ name, email, password }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Name is required.';

  if (!email.trim()) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';

  if (!password) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
  return errors;
}
