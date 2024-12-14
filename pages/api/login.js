import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Use env variable for production
const VALID_PINS = process.env.VALID_PINS
  ? process.env.VALID_PINS.split(",").map((pin) => pin.trim())
  : [];

export default function handler(req, res) {
  const { pin } = req.body;

  console.log("Received PIN:", pin); // Add logging for debugging

  // Check if the provided PIN is in the list of valid PINs
  if (VALID_PINS.includes(pin)) {
    // Create JWT token
    const token = jwt.sign({ user: "admin" }, SECRET_KEY, { expiresIn: "1h" });

    // Set the token in an HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure cookie in production
        maxAge: 60 * 60, // 1 hour
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: "Login successful" });
  } else {
    console.log("Invalid PIN");
    res.status(401).json({ message: "Invalid PIN" });
  }
}
