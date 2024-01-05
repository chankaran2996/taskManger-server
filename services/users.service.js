import { client } from "../index.js";
import bcrypt from "bcrypt";

export async function signUpMethod(userName, email, hashedPassword) {
  return await client.db("Career-fair").collection("users").insertOne({ userName: userName, email: email, password: hashedPassword, roleId: 0 });
}

export async function hashedMethod(password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export async function emailfinding(email) {
  return await client.db("Career-fair").collection("users").findOne({ email: email })
}
