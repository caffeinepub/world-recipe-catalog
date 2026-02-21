import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { FoodItem, FoodType } from '../backend';
import { toast } from 'sonner';

export function useListAllFoodItems() {
  const { actor, isFetching } = useActor();

  return useQuery<FoodItem[]>({
    queryKey: ['foodItems', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllFoodItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFilterByCountry(country: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<FoodItem[]>({
    queryKey: ['foodItems', 'country', country],
    queryFn: async () => {
      if (!actor || !country) return [];
      return actor.filterByCountry(country);
    },
    enabled: !!actor && !isFetching && !!country,
  });
}

export function useFilterByFoodType(foodType: FoodType | null) {
  const { actor, isFetching } = useActor();

  return useQuery<FoodItem[]>({
    queryKey: ['foodItems', 'foodType', foodType],
    queryFn: async () => {
      if (!actor || !foodType) return [];
      return actor.filterByFoodType(foodType);
    },
    enabled: !!actor && !isFetching && !!foodType,
  });
}

export function useAddFoodItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      country: string;
      foodType: FoodType;
      description: string;
      recipeSteps: string[];
      imageUrl: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addFoodItem(
        data.name,
        data.country,
        data.foodType,
        data.description,
        data.recipeSteps,
        data.imageUrl
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foodItems'] });
      toast.success('Recipe added successfully!');
    },
    onError: (error) => {
      toast.error('Failed to add recipe: ' + error.message);
    },
  });
}

export function useSeedRealData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.seedRealData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foodItems'] });
      toast.success('Real recipes loaded successfully!');
    },
    onError: (error) => {
      toast.error('Failed to load recipes: ' + error.message);
    },
  });
}
