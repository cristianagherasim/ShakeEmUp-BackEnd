import express, {Request, Response} from "express";
import {getClient} from "../routes/db";
//import {ObjectId} from "../routes/db";

import DrinkModel from "../models/DrinkModel";

export const shoutOutRoutes = express.Router();

shoutOutRoutes.get("/", async (req:Request, res:Response) => {
    const to = req.query.to as string;
  
    const mongoQuery: any = {};
    // if a to was specified, add it to the mongo query
    if (to) {
      mongoQuery.to = to; // { to: "Grant" }
    }
  
    try {
      const client = await getClient();
      const results = await client.db().collection<DrinkModel>("drink").find(mongoQuery).toArray();
  
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).send(error);
    }
  });