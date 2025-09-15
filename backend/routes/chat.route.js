import express from "express";
const router = express.Router();

import { chat, deleteThread, getAllThreads, getThread } from "../controller/thread.controller.js";
import { Thread } from "../models/thread.model.js";

router.post("/chat", chat);
router.get("/thread", getAllThreads);
router.get("/thread/:threadId", getThread);
router.delete("/thread/:threadId", deleteThread);

router.post('/test', async(req, res)=>{

    const threadId = "new12";
    const title = "newThread";

     const thread =  new Thread({
         threadId:threadId,
         title:title
     });
    const result  = await thread.save();
    console.log(result);
    res.send(result);

});

export default router;