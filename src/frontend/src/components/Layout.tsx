import { Plus, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { UploadRecipeForm } from './UploadRecipeForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useSeedRealData } from '../hooks/useQueries';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const seedMutation = useSeedRealData();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <header className="relative">
        <div className="h-64 md:h-80 overflow-hidden">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="Global Cuisine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" />
        </div>
        
        {/* Header Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="bg-terracotta/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <ChefHat className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Global Recipe</h1>
            </div>
            <p className="text-lg text-cream/90 text-center">Discover flavors from around the world</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          <Button
            onClick={() => seedMutation.mutate()}
            disabled={seedMutation.isPending}
            variant="secondary"
            className="bg-sage text-cream hover:bg-sage-dark shadow-lg"
          >
            {seedMutation.isPending ? 'Loading...' : 'Load Recipes'}
          </Button>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="bg-terracotta text-cream hover:bg-terracotta-dark shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Recipe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream">
              <UploadRecipeForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-terracotta text-cream py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Global Recipe. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-cream/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
