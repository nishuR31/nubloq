export default function avatarFallback({ userName, firstName, lastName }) {
  let name;

  // Check if both first and last name are provided
  if (firstName && lastName) {
    name = firstName.trim()[0] + lastName.trim()[0];
  } else if (userName) {
    // Fallback: take first 2 chars from userName
    name = userName.trim().slice(0, 2);
  } else {
    name = "??"; // default fallback
  }

  return name.toUpperCase();
}
