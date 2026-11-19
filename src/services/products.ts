
import { supabase } from '../supabase';
import { CoffeeProduct } from '../data';

export const getProducts = async (): Promise<CoffeeProduct[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.log('Products API error:', error.message);
    throw error;
  }

  return (data ?? []).map((item) => ({
    id: Number(item.id),
    name: item.name,
    description: item.description ?? '',
    price: Number(item.price),
    category: item.category,
    image: item.image ?? '',
  }));
};

