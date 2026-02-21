import { FoodType } from '../backend';

const iconMap: Record<FoodType, string> = {
  [FoodType.sweets]: '/assets/generated/icon-sweets.dim_128x128.png',
  [FoodType.iceCream]: '/assets/generated/icon-icecream.dim_128x128.png',
  [FoodType.snacks]: '/assets/generated/icon-snacks.dim_128x128.png',
  [FoodType.pastries]: '/assets/generated/icon-maindish.dim_128x128.png',
  [FoodType.drinks]: '/assets/generated/icon-maindish.dim_128x128.png',
};

export function getCategoryIcon(foodType: FoodType): string {
  return iconMap[foodType] || iconMap[FoodType.snacks];
}
