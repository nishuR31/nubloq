export default function cookieOptions(type = "access") {
  return {
    httpOnly: true,
    secure: false,
    maxAge:
      1000 * 60 * 60 * 24 * (type.toLowerCase().trim() === "access" ? 1 : 7), // 1 day
    sameSite: "Lax", //"None"
  };
}
