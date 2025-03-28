import { motion } from 'framer-motion';

export function RecipeCardSkeleton() {
  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-video bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
      </div>
    </motion.div>
  );
} 