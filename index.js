import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import notesRouter from "./routes/notes.route.js";
import usersRouter from "./routes/users.route.js";
import cors from "cors";

dotenv.config()
const app = express();
const PORT = process.env.PORT;

////// 👇⬇ This is MongoDB Connection Process
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
///// 👇⬇ top-level await
await client.connect()
console.log("MongoDB is Successfully connected");

//// XML Jsn Text
//// middleware - express.json() inbuilt middleware - JSON ---> JS Object
//// 👇⬇ app.use --> Intercepts --> applies express.json() ( Inbuilt middleware )
app.use(express.json());
app.use(cors({
    origin:"*"
}));

app.get("/", function (request, response) {

    response.send("Hi 👋😃 Welcome to Note's app")
});


app.use("/notes", notesRouter)
app.use("/users", usersRouter)


app.listen(PORT, () => console.log(`The Server started : ${PORT}`));

export { client }