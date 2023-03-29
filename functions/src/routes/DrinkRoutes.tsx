import express, {Request, Response} from "express";
import {getClient} from "../routes/db";
import {ObjectId} from "mongodb";

import {Drink} from "../models/DrinkModel";

export const cocktailRoutes = express.Router();

cocktailRoutes.get("/", async (req:Request, res:Response) => {
    const to = req.query.to as string;
  
    const mongoQuery: any = {};
    // if a to was specified, add it to the mongo query
    if (to) {
      mongoQuery.to = to; // { to: "Grant" }
    }
  
    try {
      const client = await getClient();
      const results = await client.db().collection<Drink>("drink").find(mongoQuery).toArray();
  
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  cocktailRoutes.get("/", async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db("DrinkCollection").collection<Drink>("drink").findOne({_id: new ObjectId(id)});
  
      if (!result) {
        return res.status(404).send("Drink not found");
      }
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  cocktailRoutes.post("/favorites", async (req:Request, res:Response) => {
    const id = req.params.id;
   
    const newDrink = {
      newDrinkId: id,
      strDrink: req.body.strDrink,
      strGlass: req.body.strGlass,
      strIngredient1: req.body.strIngredient,
      strMeasure1: req.body.strMeasure,
      strInstructions: req.body.strInstructions,
      strImageSource: req.body.strImageSource,
    } as unknown as Drink;
  
    try {
      const client = await getClient();
  
      await client.db("UserSubmittedDrinks").collection<Drink>("favorites").insertOne(newDrink);
  
      return res.status(201).json(newDrink);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  cocktailRoutes.put("/", async (req:Request, res:Response) => {
    const id = req.params.id;
    const cockTail = req.body as Drink;
   
  
    try {
      const client = await getClient();
      const result = await client.db().collection<Drink>("drinks").replaceOne({strDrink: new String(id)}, cockTail);
  
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

  cocktailRoutes.delete("/", async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db().collection<Drink>("drinks").deleteOne({strDrink: new String(id)});
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