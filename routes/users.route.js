
import express from "express";
import { client } from "../index.js";
import { emailfinding, hashedMethod, signUpMethod } from "../services/users.service.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const router = express.Router()

router.post("/signup", async function (request, response) {

    const { userName, email, password} = request.body;

    const checking = await emailfinding(email);

    if (checking) {
        response.status(400).send({ status:400, message: "This data is already  exists 😕 !!!" })
    } else if (password.length >= 8) {
        const hashedPassword = await hashedMethod(password)

        const signUpDone = await signUpMethod(userName, email, hashedPassword)

        response.status(200).send(signUpDone);
    } else {
        response.status(400).send({ status:400, message: " Password must be given 8 characters 😕 !!! " })
    }
})

router.post("/login", async function (request, response) {
    const { email, password } = request.body;

    const loginCheck = await client.db("Career-fair").collection("users").findOne({ email: email })

    if (loginCheck) {

        const storedPassword = loginCheck.password;

        const isPasswordCheck = await bcrypt.compare(password, storedPassword);

        if (isPasswordCheck) {

            const token = JWT.sign({ id: loginCheck.id }, process.env.SECRET_KEY) //// <--- Secret Key

            response.status(200).send({ message: "Successfully Login !!😃🙂", secretToken: token, userEmail: loginCheck.email  })
        } else {
            response.status(400).json({ status: 400, message: "Password is wrong !" })
        }

    } else {
        response.status(400).json({ status: 400, message: "Email is wrong !" })
    }
})

export default router;
