import validator from "validator";

const checkUserName = (username) => {
  if (!username || username.trim() === "") {
    return "Username is required";
  }
  if (!validator.isAlphanumeric(username, "en-US", { ignore: " " })) {
    return "Username must contain only letters and numbers";
  }
  return null;
};

const checkPassword = (password) => {
  if (!password || password.trim() === "") {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validatingLogin = (username, password) => {
  const errors = [];

  const usernameError = checkUserName(username);
  const passwordError = checkPassword(password);

  if (usernameError) errors.push({ msg: usernameError });
  if (passwordError) errors.push({ msg: passwordError });

  return errors;
};
