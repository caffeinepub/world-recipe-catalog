import { FoodItem } from '../backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ChefHat } from 'lucide-react';
import { getCategoryIcon } from './CategoryIcons';

interface RecipeViewProps {
  food: FoodItem;
  onBack: () => void;
}

export function RecipeView({ food, onBack }: RecipeViewProps) {
  const IconComponent = getCategoryIcon(food.foodType);

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-6 text-terracotta hover:text-terracotta-dark hover:bg-terracotta/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </Button>

      <Card className="bg-white shadow-xl border-2 border-sage/20">
        <CardHeader className="bg-gradient-to-r from-terracotta/10 to-sage/10 border-b-2 border-sage/20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-3xl font-bold text-terracotta mb-3">
                {food.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-sage text-cream text-base px-4 py-1">
                  {food.country}
                </Badge>
                <Badge variant="outline" className="border-terracotta text-terracotta text-base px-4 py-1">
                  {food.foodType}
                </Badge>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {food.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <img
                src={IconComponent}
                alt={food.foodType}
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 pb-8">
          <div className="flex items-center gap-2 mb-6">
            <ChefHat className="w-6 h-6 text-terracotta" />
            <h3 className="text-2xl font-bold text-terracotta">Recipe Steps</h3>
          </div>

          <ol className="space-y-4">
            {food.recipeSteps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta text-cream flex items-center justify-center font-bold text-lg shadow-md">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-base leading-relaxed text-foreground">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
