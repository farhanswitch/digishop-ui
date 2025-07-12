import validator from "validator";

export const validatingRegister = (form) => {
  const errors = [];

  const {
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    phoneNumber,
  } = form;

  if (!username || !validator.isLength(username, { min: 6, max: 15 })) {
    errors.push({ msg: "Username must be 6-15 characters" });
  } else if (!validator.isAlphanumeric(username)) {
    errors.push({ msg: "Username must only contain letters and numbers" });
  }

  if (!firstName || !validator.isLength(firstName, { min: 3, max: 50 })) {
    errors.push({ msg: "First name must be 3-50 characters" });
  }

  if (lastName && !validator.isLength(lastName, { max: 50 })) {
    errors.push({ msg: "Last name must be 0-50 characters" });
  }

  if (!password || password.trim() === "") {
    errors.push({ msg: "Password is required" });
  } else {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      errors.push({
        msg: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
  }

  if (!confirmPassword || confirmPassword.trim() === "") {
    errors.push({ msg: "Confirm password is required" });
  } else if (password !== confirmPassword) {
    errors.push({ msg: "Password and confirm password must match" });
  }

  if (!email || !validator.isEmail(email)) {
    errors.push({ msg: "Email must be a valid email address" });
  }

  if (!phoneNumber || !validator.isLength(phoneNumber, { min: 10, max: 15 })) {
    errors.push({ msg: "Phone number must be 10-15 digits" });
  } else if (!validator.isNumeric(phoneNumber)) {
    errors.push({ msg: "Phone number must contain only digits" });
  }

  return errors;
};
