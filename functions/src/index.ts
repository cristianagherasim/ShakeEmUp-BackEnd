import * as functions from "firebase-functions";
import express, {Application} from "express";
import cors from "cors";

import { cocktailRoutes } from "./routes/UserSubmittedDrinkRoutes";


const app:Application = express();
app.use(cors());
app.use(express.json());

app.use("/userDrinks", cocktailRoutes)

export const api = functions.https.onRequest(app);

//test