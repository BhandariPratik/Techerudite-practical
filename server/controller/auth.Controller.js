
import dotenv from "dotenv";
dotenv.config();
import Auth from '../models/auth.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isEmailTaken } from "../service/auth.service.js";
import sendVerificationEmail from "../utils/sendVerificationMail.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("API called");

  try {
    //Check email 
    const emailExists = await isEmailTaken(email);
    if (emailExists) {
      return res.status(409).json({ message: "Email already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const user = await Auth.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await sendVerificationEmail(user.email, token);

    res.status(201).json({
      message: "Auth registered. verify your email.",
      userId: user.id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


// Email Verification
export const verifyEmail = async (req, res) => {
  const token = req.params.token;
  console
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Auth.update({ verified: true }, { where: { id: decoded.id } });

    res.send("Email verified! You can log in now.");
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Auth.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "Auth not found" });

  if (!user.verified) return res.status(400).json({ message: "Please verify your email first" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({ message: "Login successful", token });
};
