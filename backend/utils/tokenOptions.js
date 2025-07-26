export default function tokenOptions(type) {
  return {
    expiresIn: type.toLowerCase().trim() === "access" ? "1d" : "7d", // token valid for 1 day
    issuer: "nishu", // who issued the token
    subject: "token option with expiry", // subject of the token
    audience: "nishu's backend user", // intended audience
  };
}
