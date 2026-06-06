export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

export const usernamePattern = /^[A-Za-z0-9]+$/;

export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 8 || password.length > 72) {
    return "Password must be 8 to 72 characters";
  }
  if (!passwordPattern.test(password)) {
    return "Password needs uppercase, lowercase, number, and special character";
  }
  return "";
}

export function validateUsername(username) {
  if (!username) return "Username is required";
  if (username.length < 4 || username.length > 72) {
    return "Username must be 4 to 72 characters";
  }
  if (!usernamePattern.test(username)) {
    return "Username can contain only letters and numbers";
  }
  return "";
}

export function validateEmail(email) {
  if (!email) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address";
  return "";
}

export function validateMax(value, max, label) {
  if (value && value.length > max) return `${label} must be ${max} characters or less`;
  return "";
}
