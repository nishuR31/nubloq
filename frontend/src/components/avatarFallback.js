export default function avatarFallback({ userName, firstName, lastName }) {
  let name = "";

  if (firstName?.trim?.() && lastName?.trim?.()) {
    name = `${firstName.trim()[0] ?? ""}${lastName.trim()[0] ?? ""}`;
  } else if (userName?.trim?.()) {
    name = userName.trim().slice(0, 2);
  } else {
    name = "<>";
  }

  return name.toUpperCase();
}
