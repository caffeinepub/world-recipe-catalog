import { useState } from 'react';
import { FoodCard } from './FoodCard';
import { FilterControls } from './FilterControls';
import { RecipeView } from './RecipeView';
import { useListAllFoodItems, useFilterByCountry, useFilterByFoodType } from '../hooks/useQueries';
import { FoodItem, FoodType } from '../backend';
import { Loader2 } from 'lucide-react';

export function FoodCatalog() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [foodTypeFilter, setFoodTypeFilter] = useState<FoodType | null>(null);

  const allItemsQuery = useListAllFoodItems();
  const countryQuery = useFilterByCountry(countryFilter);
  const foodTypeQuery = useFilterByFoodType(foodTypeFilter);

  // Determine which query to use based on active filters
  const activeQuery = countryFilter
    ? countryQuery
    : foodTypeFilter
    ? foodTypeQuery
    : allItemsQuery;

  const { data: foodItems = [], isLoading } = activeQuery;

  // Extract unique countries and food types for filters
  const allItems = allItemsQuery.data || [];
  const countries = Array.from(new Set(allItems.map((item) => item.country))).sort();

  const handleClearFilters = () => {
    setCountryFilter(null);
    setFoodTypeFilter(null);
  };

  if (selectedFood) {
    return <RecipeView food={selectedFood} onBack={() => setSelectedFood(null)} />;
  }

  return (
    <div className="space-y-8">
      <FilterControls
        countries={countries}
        selectedCountry={countryFilter}
        selectedFoodType={foodTypeFilter}
        onCountryChange={setCountryFilter}
        onFoodTypeChange={setFoodTypeFilter}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-terracotta" />
        </div>
      ) : foodItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            No recipes found. Try adjusting your filters or add some recipes!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((item, index) => (
            <FoodCard
              key={`${item.name}-${index}`}
              food={item}
              onRecipeClick={() => setSelectedFood(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
