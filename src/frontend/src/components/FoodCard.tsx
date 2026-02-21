import { FoodItem } from '../backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { getCategoryIcon } from './CategoryIcons';

interface FoodCardProps {
  food: FoodItem;
  onRecipeClick: () => void;
}

export function FoodCard({ food, onRecipeClick }: FoodCardProps) {
  const IconComponent = getCategoryIcon(food.foodType);

  return (
    <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-sage/20 overflow-hidden group">
      {food.imageUrl && (
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-sage/10 to-terracotta/10">
          <img
            src={food.imageUrl}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      {!food.imageUrl && (
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-sage/20 via-cream/30 to-terracotta/20 flex items-center justify-center">
          <img
            src={IconComponent}
            alt={food.foodType}
            className="w-24 h-24 object-contain opacity-40"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-terracotta mb-2 line-clamp-2">
              {food.name}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-sage/20 text-sage-dark border-sage/30">
                {food.country}
              </Badge>
              <Badge variant="outline" className="border-terracotta/30 text-terracotta">
                {food.foodType}
              </Badge>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src={IconComponent}
              alt={food.foodType}
              className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {food.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onRecipeClick}
          className="w-full bg-terracotta hover:bg-terracotta-dark text-cream font-semibold"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}
