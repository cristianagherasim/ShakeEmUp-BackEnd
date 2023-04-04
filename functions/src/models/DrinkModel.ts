// After making an API call in Postman, you can copy the code and using 
// CTRL+Shift+P here in VS Code use 'Paste as JSON' to help create the model

// Notice that there are up to 15 ingredients and measures per drink, though not all
// cocktails will use that many so we will have to account for that in the Details page

// Their JSON code is setup so the base level is Root and then contains Drink[]
// In some places this requires using Root (not an array) and others Drink[] (an array)

export interface Root {
   drinks: Drink[]
 }
 export interface Drink {
  isUserGen: boolean,
  idDrink: string
   strDrink: string
   strDrinkAlternate: any
   strTags: any
   strVideo: any
   strCategory: string
   strIBA: any
   strAlcoholic: string
   strGlass: string
   strInstructions: string
   strInstructionsES: any
   strInstructionsDE: string
   strInstructionsFR: any
   strInstructionsIT: string
   "strInstructionsZH-HANS": any
   "strInstructionsZH-HANT": any
   strDrinkThumb: string
   strIngredient1: string
   strIngredient2: string
   strIngredient3: string
   strIngredient4: string
   strIngredient5: any
   strIngredient6: any
   strIngredient7: any
   strIngredient8: any
   strIngredient9: any
   strIngredient10: any
   strIngredient11: any
   strIngredient12: any
   strIngredient13: any
   strIngredient14: any
   strIngredient15: any
   strMeasure1: string
   strMeasure2: string
   strMeasure3: string
   strMeasure4: string
   strMeasure5: string
   strMeasure6: string
   strMeasure7: string
   strMeasure8: any
   strMeasure9: any
   strMeasure10: any
   strMeasure11: any
   strMeasure12: any
   strMeasure13: any
   strMeasure14: any
   strMeasure15: any
   strImageSource: string
   strImageAttribution: any
   strCreativeCommonsConfirmed: string
   dateModified: any
 }
