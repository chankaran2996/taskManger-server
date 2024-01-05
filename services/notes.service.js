import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function postMethod(createData) {
    return await client.db("Career-fair").collection("notes").insertOne(createData)
}

export async function getMethod(request) {
    return await client.db("Career-fair").collection("notes").find({ email: request.params.id }).toArray();
}

export async function getMethodByID(id) {
    console.log("*****", id)
    return await client.db("Career-fair").collection("notes").findOne({ _id: new ObjectId(id) });
}

export async function putMethodByID(id, updateRequest) {
    return await client.db("Career-fair").collection("notes").updateOne({ _id: new ObjectId(id) }, { $set: updateRequest });
}

export async function deleteMethod(id) {
    return await client.db("Career-fair").collection("notes").deleteOne({ _id: new ObjectId(id) });
}


