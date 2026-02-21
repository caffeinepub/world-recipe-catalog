import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import { FoodType } from '../backend';

interface FilterControlsProps {
  countries: string[];
  selectedCountry: string | null;
  selectedFoodType: FoodType | null;
  onCountryChange: (country: string | null) => void;
  onFoodTypeChange: (foodType: FoodType | null) => void;
  onClearFilters: () => void;
}

const foodTypeOptions = [
  { value: FoodType.sweets, label: 'Sweets' },
  { value: FoodType.iceCream, label: 'Ice Cream' },
  { value: FoodType.snacks, label: 'Snacks' },
  { value: FoodType.pastries, label: 'Pastries' },
  { value: FoodType.drinks, label: 'Drinks' },
];

export function FilterControls({
  countries,
  selectedCountry,
  selectedFoodType,
  onCountryChange,
  onFoodTypeChange,
  onClearFilters,
}: FilterControlsProps) {
  const hasActiveFilters = selectedCountry || selectedFoodType;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-2 border-sage/20">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-terracotta" />
        <h2 className="text-lg font-semibold text-terracotta">Filter Recipes</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Country
          </label>
          <Select
            value={selectedCountry || 'all'}
            onValueChange={(value) => onCountryChange(value === 'all' ? null : value)}
          >
            <SelectTrigger className="bg-cream border-sage/30">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Food Type
          </label>
          <Select
            value={selectedFoodType || 'all'}
            onValueChange={(value) =>
              onFoodTypeChange(value === 'all' ? null : (value as FoodType))
            }
          >
            <SelectTrigger className="bg-cream border-sage/30">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {foodTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="border-terracotta/30 text-terracotta hover:bg-terracotta/10"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
