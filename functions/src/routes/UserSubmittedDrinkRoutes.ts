import express, {Request, Response} from "express";
import {getClient} from "./db";
import {ObjectId} from "mongodb";
import { Drink } from "../models/DrinkModel";



export const cocktailRoutes = express.Router();

cocktailRoutes.get("/", async (req:Request, res:Response) => {
    
  
    try {
      const client = await getClient();
      const results = await client.db("UserSubmittedDrinks").collection<Drink>("userDrinks").find({}).toArray();
  
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  cocktailRoutes.get("/:id", async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
      const client = await getClient();
      const result = await client.db("UserSubmittedDrinks").collection<Drink>("userDrinks").findOne({_id: new ObjectId(id)});
  
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
      _id: req.body._id,
      newDrinkId: id,
      // strDrink: req.body.strDrink,
      // strGlass: req.body.strGlass,
      // strIngredient1: req.body.strIngredient1,
      // strMeasure1: req.body.strMeasure,
      // strInstructions: req.body.strInstructions,
      // strImageSource: req.body.strImageSource,
      idDrink: req.body.idDrink,
      strDrink: req.body.strDrink,
      strDrinkAlternate: req.body.strDrinkAlternate,
      strTags: req.body.strTags,
      strVideo: req.body.strVideo,
      strCategory: req.body.strCategory,
      strIBA: req.body.strIBA,
      strAlcoholic: req.body.strAlcoholic,
      strGlass: req.body.strGlass,
      strInstructions: req.body.strInstructions,
      strInstructionsES: req.body.strInstructionsES,
      strInstructionsDE: req.body.strInstructionsDE,
      strInstructionsFR: req.body.strInstructionsFR,
      strInstructionsIT: req.body.strInstructionsIT,
     // "strInstructionsZH-HANS": any
     // "strInstructionsZH-HANT": any
      strDrinkThumb: req.body.strDrinkThumb,
      strIngredient1: req.body.strIngredient1,
      strIngredient2: req.body.strIngredient2,
      strIngredient3: req.body.strIngredient3,
      strIngredient4: req.body.strIngredient4,
      strIngredient5: req.body.strIngredient5,
      strIngredient6: req.body.strIngredient6,
      strIngredient7: req.body.strIngredient7,
      strIngredient8: req.body.strIngredient8,
      strIngredient9: req.body.strIngredient9,
      strIngredient10: req.body.strIngredient10,
      strIngredient11: req.body.strIngredient11,
      strIngredient12: req.body.strIngredient12,
      strIngredient13: req.body.strIngredient13,
      strIngredient14: req.body.strIngredient14,
      strIngredient15: req.body.strIngredient15,
      strMeasure1: req.body.strMeasure1,
      strMeasure2: req.body.strMeasure2,
      strMeasure3: req.body.strMeasure3,
      strMeasure4: req.body.strMeasure4,
      strMeasure5: req.body.strMeasure5,
      strMeasure6: req.body.strMeasure6,
      strMeasure7: req.body.strMeasure7,
      strMeasure8: req.body.strMeasure8,
      strMeasure9: req.body.strMeasure9,
      strMeasure10: req.body.strMeasure10,
      strMeasure11: req.body.strMeasure11,
      strMeasure12: req.body.strMeasure12,
      strMeasure13: req.body.strMeasure13,
      strMeasure14: req.body.strMeasure14,
      strMeasure15: req.body.strMeasure15,
      strImageSource: req.body.strImageSource,
      strImageAttribution: req.body.strImageAttribution,
      strCreativeCommonsConfirmed: req.body.strCreativeCommonsConfirmed,
      dateModified: req.body.dateModified,
      isUserGen: true,
    } as unknown as Drink;
  
    try {
      const client = await getClient();
  
      await client.db("UserSubmittedDrinks").collection<Drink>("userDrinks").insertOne(newDrink);
  
      return res.status(201).json(newDrink);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  
  //put is update something that already exists
  cocktailRoutes.put("/:id", async (req:Request, res:Response) => {
    const id = req.params.id;
    const cockTail = req.body as Drink;
   
  
    try {
      const client = await getClient();
      const result = await client.db("UserSubmittedDrinks").collection<Drink>("userDrinks").replaceOne({_id: new ObjectId(id)}, cockTail);
  
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
      const result = await client.db("UserSubmittedDrinks").collection<Drink>("userDrinks").deleteOne({_id: new ObjectId(id)});
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