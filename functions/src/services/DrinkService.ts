import DrinkModel from "../models/DrinkModel";
import axios from "axios"

const baseUrl = "www.thecocktaildb.com/api/json/v1/1/"

export function fetchDrink():Promise<DrinkModel[]> {
    return axios.get<DrinkModel[]>(`${baseUrl}/newfavorite`)
    .then(res => res.data)
}

export function addDrink(DrinkModel:DrinkModel):Promise<DrinkModel> {
    //might need to come back and put something after the "/" like on line 7 
    return axios.post<DrinkModel>(`${baseUrl}/`, DrinkModel)
    .then(res => res.data);
  }
  
  export function fetchDrinkTo(user: string):Promise<DrinkModel[]> {
    //might need to come back and put something after the "/" like on line 7 
    return axios.get<DrinkModel[]>(`${baseUrl}/`, {
      params: { to: user }
    })
    .then(res => res.data)
  }