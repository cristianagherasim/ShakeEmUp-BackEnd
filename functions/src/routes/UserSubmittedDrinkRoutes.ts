import express, {Request, Response} from "express";
import {getClient} from "./db";
import {ObjectId} from "mongodb";

import {UserDrink} from "../models/UserDrinkModel";

export const cocktailRoutes = express.Router();

cocktailRoutes.get("/", async (req:Request, res:Response) => {
    
  
    try {
      const client = await getClient();
      const results = await client.db("UserSubmittedDrinks").collection<UserDrink>("userDrinks").find({}).toArray();
  
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  cocktailRoutes.get("/:id", async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db("UserSubmittedDrinks").collection<UserDrink>("userDrinks").findOne({_id: new ObjectId(id)});
  
      if (!result) {
        return res.status(404).send("Drink not found");
      }
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  cocktailRoutes.post("/", async (req:Request, res:Response) => {
    const id = req.params.id;
   
    const newDrink = {
      newDrinkId: id,
      strDrink: req.body.strDrink,
      strGlass: req.body.strGlass,
      strIngredient1: req.body.strIngredient,
      strMeasure1: req.body.strMeasure,
      strInstructions: req.body.strInstructions,
      strImageSource: req.body.strImageSource,
    } as unknown as UserDrink;
  
    try {
      const client = await getClient();
  
      await client.db("UserSubmittedDrinks").collection<UserDrink>("userDrinks").insertOne(newDrink);
  
      return res.status(201).json(newDrink);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  //put is update something that already exists
  cocktailRoutes.put("/:id", async (req:Request, res:Response) => {
    const id = req.params.id;
    const cockTail = req.body as UserDrink;
   
  
    try {
      const client = await getClient();
      const result = await client.db("UserSubmittedDrinks").collection<UserDrink>("userDrinks").replaceOne({_id: new ObjectId(id)}, cockTail);
  
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

  cocktailRoutes.delete("/:id", async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db("UserSubmittedDrinks").collection<UserDrink>("userDrinks").deleteOne({_id: new ObjectId(id)});
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