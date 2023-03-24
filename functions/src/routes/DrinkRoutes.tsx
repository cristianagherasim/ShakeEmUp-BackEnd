import express, {Request, Response} from "express";
import {getClient} from "../routes/db";
import {ObjectId} from "mongodb";

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

  shoutOutRoutes.get("/", async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db().collection<DrinkModel>("drink").findOne({_id: new ObjectId(id)});
  
      if (!result) {
        return res.status(404).send("Drink not found");
      }
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  shoutOutRoutes.post("/", async (req:Request, res:Response) => {
    const shoutOut = req.body as DrinkModel;
  
    try {
      const client = await getClient();
  
      await client.db().collection<DrinkModel>("drinks").insertOne(shoutOut);
  
      return res.status(201).json(shoutOut);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  shoutOutRoutes.put("/", async (req:Request, res:Response) => {
    const id = req.params.id;
    const cockTail = req.body as DrinkModel;
   
  
    try {
      const client = await getClient();
      const result = await client.db().collection<DrinkModel>("drinks").replaceOne({strDrink: new String(id)}, cockTail);
  
      if (result.modifiedCount === 0) {
        return res.status(404).send("Not found");
      } else {
        //cockTail.strDrink = new String(id);
        return res.json(cockTail);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  shoutOutRoutes.delete("/", async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db().collection<DrinkModel>("drinks").deleteOne({strDrink: new String(id)});
      if (result.deletedCount === 0) {
        return res.status(404).json({message: "Not Found"});
      } else {
        return res.status(204).end();
      }
    } catch (err) {
      console.error("FAIL", err);
      return res.status(500).json({message: "Internal Server Error"});
    }
  });