
export type CoffeeProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export const products: CoffeeProduct[] = [
  {
    id: 1,
    name: 'Капучино',
    description: 'Эспрессо, молоко и нежная пенка',
    price: 1200,
    category: 'Кофе',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800',
  },
  {
    id: 2,
    name: 'Латте',
    description: 'Нежный кофе с молоком',
    price: 1400,
    category: 'Кофе',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
  },
  {
    id: 3,
    name: 'Американо',
    description: 'Классический крепкий кофе',
    price: 900,
    category: 'Кофе',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
  },
  {
    id: 4,
    name: 'Мокка',
    description: 'Кофе с шоколадом',
    price: 1600,
    category: 'Кофе',
    image: 'https://images.unsplash.com/photo-1572286258217-215cf8c2c7f8?w=800',
  },
  {
    id: 5,
    name: 'Круассан',
    description: 'Свежая французская выпечка',
    price: 800,
    category: 'Десерты',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  },
  {
    id: 6,
    name: 'Чизкейк',
    description: 'Нежный сливочный десерт',
    price: 1500,
    category: 'Десерты',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800',
  },
  {
    id: 7,
    name: 'Айс Латте',
    description: 'Холодный кофе со льдом',
    price: 1500,
    category: 'Холодный кофе',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800',
  },
  {
    id: 8,
    name: 'Фраппе',
    description: 'Освежающий холодный напиток',
    price: 1700,
    category: 'Холодный кофе',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
  },
];
