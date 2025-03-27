
import Auth from "../models/auth.js";

export const isEmailTaken = async (email) => {
  try {
    const existingUser = await Auth.findOne({ where: { email } });
    return !!existingUser;  
  } catch (error) {
    console.error("Error checking email exist:", error);
  }
};
