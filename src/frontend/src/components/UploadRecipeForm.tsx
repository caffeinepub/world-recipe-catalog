import { useState } from 'react';
import { useAddFoodItem } from '../hooks/useQueries';
import { FoodType } from '../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Loader2 } from 'lucide-react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface UploadRecipeFormProps {
  onSuccess: () => void;
}

const foodTypeOptions = [
  { value: FoodType.sweets, label: 'Sweets' },
  { value: FoodType.iceCream, label: 'Ice Cream' },
  { value: FoodType.snacks, label: 'Snacks' },
  { value: FoodType.pastries, label: 'Pastries' },
  { value: FoodType.drinks, label: 'Drinks' },
];

export function UploadRecipeForm({ onSuccess }: UploadRecipeFormProps) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [country, setCountry] = useState('');
  const [foodType, setFoodType] = useState<FoodType | ''>('');
  const [description, setDescription] = useState('');
  const [recipeSteps, setRecipeSteps] = useState<string[]>(['']);

  const addMutation = useAddFoodItem();

  const handleAddStep = () => {
    setRecipeSteps([...recipeSteps, '']);
  };

  const handleRemoveStep = (index: number) => {
    if (recipeSteps.length > 1) {
      setRecipeSteps(recipeSteps.filter((_, i) => i !== index));
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...recipeSteps];
    newSteps[index] = value;
    setRecipeSteps(newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !country.trim() || !foodType || !description.trim()) {
      return;
    }

    const validSteps = recipeSteps.filter((step) => step.trim() !== '');
    if (validSteps.length === 0) {
      return;
    }

    addMutation.mutate(
      {
        name: name.trim(),
        country: country.trim(),
        foodType: foodType as FoodType,
        description: description.trim(),
        recipeSteps: validSteps,
        imageUrl: imageUrl.trim() || null,
      },
      {
        onSuccess: () => {
          setName('');
          setImageUrl('');
          setCountry('');
          setFoodType('');
          setDescription('');
          setRecipeSteps(['']);
          onSuccess();
        },
      }
    );
  };

  const isValid =
    name.trim() &&
    country.trim() &&
    foodType &&
    description.trim() &&
    recipeSteps.some((step) => step.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-terracotta">Add New Recipe</DialogTitle>
        <DialogDescription className="text-base">
          Share your favorite recipe with the world!
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-base font-semibold text-terracotta">
            Recipe Name *
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Chocolate Chip Cookies"
            className="mt-2 border-sage/30"
            required
          />
        </div>

        <div>
          <Label htmlFor="imageUrl" className="text-base font-semibold text-terracotta">
            Image URL (optional)
          </Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="e.g., /assets/generated/my-food.png or https://example.com/image.jpg"
            className="mt-2 border-sage/30"
          />
        </div>

        <div>
          <Label htmlFor="country" className="text-base font-semibold text-terracotta">
            Country of Origin *
          </Label>
          <Input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g., United States"
            className="mt-2 border-sage/30"
            required
          />
        </div>

        <div>
          <Label htmlFor="foodType" className="text-base font-semibold text-terracotta">
            Food Type *
          </Label>
          <Select value={foodType} onValueChange={(value) => setFoodType(value as FoodType)}>
            <SelectTrigger className="mt-2 border-sage/30">
              <SelectValue placeholder="Select a food type" />
            </SelectTrigger>
            <SelectContent>
              {foodTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description" className="text-base font-semibold text-terracotta">
            Description *
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe..."
            className="mt-2 min-h-24 border-sage/30"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-base font-semibold text-terracotta">Recipe Steps *</Label>
            <Button
              type="button"
              onClick={handleAddStep}
              variant="outline"
              size="sm"
              className="border-sage text-sage hover:bg-sage/10"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Step
            </Button>
          </div>
          <div className="space-y-3">
            {recipeSteps.map((step, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-shrink-0 w-8 h-10 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <Input
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  className="flex-1 border-sage/30"
                />
                {recipeSteps.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={!isValid || addMutation.isPending}
          className="flex-1 bg-terracotta hover:bg-terracotta-dark text-cream font-semibold"
        >
          {addMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            'Add Recipe'
          )}
        </Button>
      </div>
    </form>
  );
}
