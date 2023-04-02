import {Drink} from "../models/DrinkModel";
import axios from "axios"

const baseUrl = "https://us-central1-shakeemup-c22e5.cloudfunctions.net/api"

export function fetchDrink():Promise<Drink[]> {
    return axios.get<Drink[]>(`${baseUrl}/`)
    .then(res => res.data)
}

export function addDrink(DrinkModel:Drink):Promise<Drink> {
   
    return axios.post<Drink>(`${baseUrl}/favorites`, DrinkModel)
    .then(res => res.data);
}
  
  export function fetchDrinkTo(user: string):Promise<Drink[]> {
    
    return axios.get<Drink[]>(`${baseUrl}/`, {
      params: { to: user }
    })
    .then(res => res.data)
}