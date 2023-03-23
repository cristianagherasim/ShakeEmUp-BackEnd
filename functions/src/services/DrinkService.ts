import DrinkModel from "../models/DrinkModel";
import axios from "axios"

const baseUrl = "www.thecocktaildb.com/api/json/v1/1/"

export function fetchDrink():Promise<DrinkModel[]> {
    return axios.get<DrinkModel[]>(`${baseUrl}/newfavorite`)
    .then(res => res.data)
}