/** @format */

import { Badge } from '@/components/UI/badge';
import { Utensils, Flame, AlertTriangle } from 'lucide-react';

interface TagDisplayProps {
  tags: {
    ingredients: string[];
    flavors: string[];
    restrictions: string[];
  };
}

export function TagDisplay({ tags }: TagDisplayProps) {
  const hasAnyTags =
    tags.ingredients.length > 0 ||
    tags.flavors.length > 0 ||
    tags.restrictions.length > 0;

  if (!hasAnyTags) return null;

  return (
    <div className='flex flex-wrap gap-1.5 mb-2'>
      {tags.ingredients.map((tag) => (
        <Badge key={tag} className='flex items-center gap-1 bg-green-700'>
          <Utensils className='size-3' />
          {tag}
        </Badge>
      ))}
      {tags.flavors.map((tag) => (
        <Badge key={tag} className='flex items-center gap-1 bg-orange-700'>
          <Flame className='size-3' />
          {tag}
        </Badge>
      ))}
      {tags.restrictions.map((tag) => (
        <Badge key={tag} className='flex items-center gap-1 bg-sky-700'>
          <AlertTriangle className='size-3' />
          {tag}
        </Badge>
      ))}
    </div>
  );
}
