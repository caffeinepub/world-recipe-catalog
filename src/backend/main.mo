import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Migration "migration";

(with migration = Migration.run)
actor {
  type FoodType = {
    #sweets;
    #iceCream;
    #snacks;
    #drinks;
    #pastries;
  };

  type FoodItem = {
    name : Text;
    country : Text;
    foodType : FoodType;
    description : Text;
    recipeSteps : [Text];
    imageUrl : ?Text;
  };

  let foodItems = Map.empty<Text, FoodItem>();

  public shared ({ caller }) func addFoodItem(
    name : Text,
    country : Text,
    foodType : FoodType,
    description : Text,
    recipeSteps : [Text],
    imageUrl : ?Text,
  ) : async () {
    let foodItem : FoodItem = {
      name;
      country;
      foodType;
      description;
      recipeSteps;
      imageUrl;
    };
    foodItems.add(name, foodItem);
  };

  public query ({ caller }) func getFoodItem(name : Text) : async FoodItem {
    switch (foodItems.get(name)) {
      case (null) { Runtime.trap("Food item not found") };
      case (?item) { item };
    };
  };

  public query ({ caller }) func listAllFoodItems() : async [FoodItem] {
    foodItems.values().toArray();
  };

  public query ({ caller }) func filterByCountry(country : Text) : async [FoodItem] {
    let filtered = List.empty<FoodItem>();

    for (foodItem in foodItems.values()) {
      if (foodItem.country == country) {
        filtered.add(foodItem);
      };
    };

    filtered.toArray();
  };

  public query ({ caller }) func filterByFoodType(foodType : FoodType) : async [FoodItem] {
    let filtered = List.empty<FoodItem>();

    for (foodItem in foodItems.values()) {
      if (foodItem.foodType == foodType) {
        filtered.add(foodItem);
      };
    };

    filtered.toArray();
  };

  // Seed authentic international food recipes
  public shared ({ caller }) func seedRealData() : async () {
    await addFoodItem(
      "Churros",
      "Spain",
      #sweets,
      "Fried-dough pastry, popular in Spain. Crispy on the outside and soft on the inside, often enjoyed with chocolate.",
      [
        "Mix 1 cup all-purpose flour with 1 cup water, 2 tbsp sugar, and a pinch of salt",
        "Heat oil to 180°C",
        "Pipe dough into hot oil using a star-shaped tip to create ridges",
        "Fry until golden brown, then roll in cinnamon sugar",
        "Serve with melted chocolate",
      ],
      null,
    );

    await addFoodItem(
      "Mochi Ice Cream",
      "Japan",
      #iceCream,
      "Ice cream wrapped in soft, chewy mochi—sticky rice dough. Popular flavors include green tea, strawberry, and vanilla.",
      [
        "Prepare mochi by mixing sweet rice flour and sugar with water. Microwave for 90 seconds, stir, and cook in 1-minute intervals until thick",
        "Dust working surface with potato starch and roll out mochi to 1/4-inch thick",
        "Cut mochi into circles",
        "Place a flattened circle on top of mini ice cream balls and wrap, pinching edges to seal",
        "Freeze until firm",
      ],
      null,
    );

    await addFoodItem(
      "Timbits",
      "Canada",
      #snacks,
      "Small fried donut-hole treats available in a variety of flavors such as powdered sugar, chocolate glazed, and apple fritter.",
      [
        "Prepare donut dough with flour, sugar, milk, baking powder, and eggs",
        "Roll dough into small 1-inch balls",
        "Heat oil to 180°C and fry in batches until golden brown",
        "Drain and coat in desired toppings: sugar, cinnamon, or glaze",
      ],
      null,
    );

    await addFoodItem(
      "Pastel de Nata",
      "Portugal",
      #pastries,
      "Classic Portuguese custard tart with flaky pastry and caramelized top.",
      [
        "Roll and fold chilled puff pastry, then cut into tart-size rounds and place in muffin tin slots",
        "Mix egg yolks, sugar, milk, cream, and vanilla to make custard",
        "Fill pastry shells with custard",
        "Bake at high heat until the top is caramelized and the pastry is golden",
      ],
      null,
    );

    await addFoodItem(
      "Bubble Tea",
      "Taiwan",
      #drinks,
      "Swiss drink featuring brewed tea, sweetened milk, and chewy tapioca pearls. Flavors include classic, taro, and fruit infusions.",
      [
        "Boil water and prepare tapioca pearls according to package instructions",
        "Brew black or green tea and sweeten with honey or syrup",
        "Add milk or flavoring of choice",
        "Layer tapioca pearls at the bottom of a glass and pour tea mixture over them",
      ],
      null,
    );

    await addFoodItem(
      "Baklava",
      "Turkey",
      #sweets,
      "Layered dessert made of phyllo pastry, nuts, and honey syrup. Known for its sweet, sticky flavor and flaky texture.",
      [
        "Layer sheets of phyllo pastry with melted butter and crushed nuts (typically pistachios or walnuts)",
        "Cut into diamonds and bake until golden",
        "Prepare a sugar and honey syrup with lemon juice and pour over the hot baklava",
        "Allow to cool and absorb syrup",
      ],
      null,
    );

    await addFoodItem(
      "Pavlova",
      "Australia",
      #sweets,
      "Meringue-based dessert named after the ballerina Anna Pavlova. Crispy on the outside, marshmallow-like inside, topped with cream and fruit.",
      [
        "Whip egg whites with sugar until stiff peaks form",
        "Shape meringue mix into a disc with a well in the center",
        "Bake at low temperature until dry and crisp outside",
        "Cool, then top with whipped cream and fresh fruit (berries, kiwi, passionfruit)",
      ],
      null,
    );

    await addFoodItem(
      "Gelato",
      "Italy",
      #iceCream,
      "Italian-style ice cream, denser and creamier than traditional ice cream with intense flavors.",
      [
        "Combine milk, cream, and sugar. Heat until sugar dissolves",
        "Gently incorporate desired flavorings (fruits, nuts, chocolate)",
        "Churn mixture in a low-speed ice cream maker",
        "Freeze to set before serving",
      ],
      null,
    );

    await addFoodItem(
      "Empanadas",
      "Argentina",
      #snacks,
      "Savory or sweet stuffed dough pockets. Fillings can include beef, chicken, cheese, or fruit.",
      [
        "Prepare dough with flour, butter, and water. Roll and cut into circles",
        "Fill with desired ingredients (e.g., spiced beef or chicken)",
        "Fold dough and seal edges",
        "Bake or fry until golden brown",
      ],
      null,
    );

    await addFoodItem(
      "Madeleines",
      "France",
      #pastries,
      "Soft, shell-shaped sponge cakes with a buttery flavor. Often served with tea.",
      [
        "Whisk eggs, sugar, and vanilla",
        "Fold in melted butter and sifted flour",
        "Pour batter into madeleine molds",
        "Bake until golden and slightly crisp on the edges",
      ],
      null,
    );
  };
};
