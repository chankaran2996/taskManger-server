import express from "express";
import { client } from "../index.js";
import { auth } from "../middleware/auth.js";
import {
  deleteMethod,
  getMethod,
  getMethodByID,
  postMethod,
  putMethodByID,
} from "../services/notes.service.js";

const router = express.Router();

router.post("/", auth, async function (request, response) {
  const createData = request.body;

  const createDone = await postMethod(createData);

  response.send(createDone);
});

router.get("/own/:id", auth, async function (request, response) {
  
    try {
    const allDatas = await getMethod(request);
    response.send(allDatas);
  } catch (e) {
    console.log(e);
  }

});

router.get("/:id", auth, async function (request, response) {
  const { id } = request.params;

  const singleData = await getMethodByID(id); ///// step: 1

  singleData
    ? response.send(singleData)
    : response.status(404).send({ message: "Data not found" });
});

router.put("/:id", auth, async function (request, response) {
  const { id } = request.params;

  const updateRequest = request.body;

  const updateDone = await putMethodByID(id, updateRequest);

  response.send(updateDone);
});

router.delete("/:id", auth, async function (request, response) {
  const { id } = request.params;

  const deleteDone = await deleteMethod(id);

  deleteDone.deletedCount > 0
    ? response.send({ message: "Deleted Successfully Done" })
    : response.status(404).send({ message: "Data Not Found" });
});

export default router;
