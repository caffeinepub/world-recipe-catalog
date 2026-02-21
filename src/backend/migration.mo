import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type FoodType = {
    #sweets;
    #iceCream;
    #snacks;
    #drinks;
    #pastries;
  };

  type OldFoodItem = {
    name : Text;
    country : Text;
    foodType : FoodType;
    description : Text;
    recipeSteps : [Text];
  };

  type NewFoodItem = {
    name : Text;
    country : Text;
    foodType : FoodType;
    description : Text;
    recipeSteps : [Text];
    imageUrl : ?Text;
  };

  type OldActor = { foodItems : Map.Map<Text, OldFoodItem> };
  type NewActor = { foodItems : Map.Map<Text, NewFoodItem> };

  public func run(old : OldActor) : NewActor {
    let newFoodItems = old.foodItems.map<Text, OldFoodItem, NewFoodItem>(
      func(_name, oldFoodItem) {
        {
          oldFoodItem with
          imageUrl = null;
        };
      }
    );
    { foodItems = newFoodItems };
  };
};
