import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FoodItem {
    country: string;
    name: string;
    description: string;
    imageUrl?: string;
    recipeSteps: Array<string>;
    foodType: FoodType;
}
export enum FoodType {
    snacks = "snacks",
    sweets = "sweets",
    iceCream = "iceCream",
    pastries = "pastries",
    drinks = "drinks"
}
export interface backendInterface {
    addFoodItem(name: string, country: string, foodType: FoodType, description: string, recipeSteps: Array<string>, imageUrl: string | null): Promise<void>;
    filterByCountry(country: string): Promise<Array<FoodItem>>;
    filterByFoodType(foodType: FoodType): Promise<Array<FoodItem>>;
    getFoodItem(name: string): Promise<FoodItem>;
    listAllFoodItems(): Promise<Array<FoodItem>>;
    seedRealData(): Promise<void>;
}
