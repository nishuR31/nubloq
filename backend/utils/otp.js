export let OTP = () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};

export let expiry = (minutes = 5) => {
  return Date.now() + 1000 * 60 * minutes;
};
