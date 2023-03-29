import {Drink} from "../models/DrinkModel";
import axios from "axios"

const baseUrl = "https://us-central1-shakeemup-c22e5.cloudfunctions.net/api"

export function fetchDrink():Promise<Drink[]> {
    return axios.get<Drink[]>(`${baseUrl}/`)
    .then(res => res.data)
}

export function addDrink(DrinkModel:Drink):Promise<Drink> {
    //might need to come back and put something after the "/" like on line 7 
    return axios.post<Drink>(`${baseUrl}/favorites`, DrinkModel)
    .then(res => res.data);
  }
  
  export function fetchDrinkTo(user: string):Promise<Drink[]> {
    //might need to come back and put something after the "/" like on line 7 
    return axios.get<Drink[]>(`${baseUrl}/`, {
      params: { to: user }
    })
    .then(res => res.data)
  }