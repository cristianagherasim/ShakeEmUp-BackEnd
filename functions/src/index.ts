import * as functions from "firebase-functions";
import express, {Application} from "express";
import cors from "cors";
import { addDrink } from "./services/DrinkService";


const app:Application = express();
app.use(cors());
app.use(express.json());

app.use("/favorites", addDrink)

export const api = functions.https.onRequest(app);