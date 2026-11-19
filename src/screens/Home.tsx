
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { CoffeeProduct } from '../data';
import { getProducts } from '../services/products';
import ProductCard from '../components/ProductCard';
import { COLORS, SHADOW } from '../theme';

type Props = {
  onAdd: (product: CoffeeProduct) => void;
  onSelect: (product: CoffeeProduct) => void;
  onCatalog: () => void;
};

export default function Home({ onAdd, onSelect, onCatalog }: Props) {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const result = await getProducts();
        setProducts(result);
      } catch (err) {
        console.log('Home products error:', err);
        setError('Не удалось загрузить товары');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heading}>
        <Text style={styles.greeting}>ДОБРО ПОЖАЛОВАТЬ В</Text>
        <Text style={styles.title}>AROMA CRAFT.</Text>
        <Text style={styles.subtitle}>
          Ваш любимый кофе начинается здесь
        </Text>
      </View>

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200',
        }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.heroTag}>SPECIAL COFFEE</Text>

          <Text style={styles.heroTitle}>
            Искусство{'\n'}идеального кофе
          </Text>

          <Text style={styles.heroDescription}>
            Создано с любовью. Для вашего настроения.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={onCatalog}
          >
            <Text style={styles.heroButtonText}>
              Открыть меню →
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.promo}>
        <View style={styles.promoText}>
          <Text style={styles.promoTag}>
            ПРЕДЛОЖЕНИЕ НЕДЕЛИ
          </Text>

          <Text style={styles.promoTitle}>
            -10% на первый заказ
          </Text>

          <Text style={styles.promoDescription}>
            Используйте промокод WELCOME10
          </Text>
        </View>

        <Text style={styles.promoEmoji}>☕</Text>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            Популярное
          </Text>

          <Text style={styles.sectionSubtitle}>
            Выбор наших гостей
          </Text>
        </View>

        <TouchableOpacity onPress={onCatalog}>
          <Text style={styles.seeAll}>
            Все товары →
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Загрузка товаров...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.messageContainer}>
          <Text style={styles.error}>
            {error}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              setError('');

              getProducts()
                .then(setProducts)
                .catch(() => setError('Не удалось загрузить товары'))
                .finally(() => setLoading(false));
            }}
          >
            <Text style={styles.retry}>
              Попробовать снова
            </Text>
          </TouchableOpacity>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Товары пока отсутствуют
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.products}
        >
          {products.slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => onSelect(product)}
              onAdd={() => onAdd(product)}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.quote}>
        <Text style={styles.quoteMark}>“</Text>

        <Text style={styles.quoteText}>
          Хороший кофе — это маленькое удовольствие,
          которое делает день лучше.
        </Text>

        <Text style={styles.quoteAuthor}>
          — AROMA CRAFT
        </Text>
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginTop: 8,
    marginBottom: 20,
  },
  greeting: {
    color: COLORS.gold,
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: 'bold',
  },
  title: {
    color: COLORS.dark,
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 5,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 6,
  },
  hero: {
    height: 270,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 23,
  },
  heroImage: {
    borderRadius: 23,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(35, 20, 12, 0.48)',
    justifyContent: 'center',
    padding: 22,
    borderRadius: 23,
  },
  heroTag: {
    color: '#E6C49D',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: 'bold',
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 31,
    lineHeight: 38,
    fontWeight: 'bold',
    marginTop: 13,
  },
  heroDescription: {
    color: '#F3E8DC',
    fontSize: 12,
    marginTop: 10,
  },
  heroButton: {
    backgroundColor: '#D9B995',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 19,
  },
  heroButtonText: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 12,
  },
  promo: {
    marginTop: 18,
    padding: 17,
    backgroundColor: '#E9D9C8',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoText: {
    flex: 1,
  },
  promoTag: {
    color: COLORS.gold,
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  promoTitle: {
    color: COLORS.dark,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 7,
  },
  promoDescription: {
    color: COLORS.gray,
    fontSize: 10,
    marginTop: 5,
  },
  promoEmoji: {
    fontSize: 43,
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 15,
  },
  sectionTitle: {
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 4,
  },
  seeAll: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: 'bold',
  },
  products: {
    paddingTop: 5,
    paddingBottom: 15,
    paddingRight: 5,
  },
  messageContainer: {
    paddingVertical: 25,
    alignItems: 'center',
  },
  message: {
    color: COLORS.gray,
    fontSize: 13,
  },
  error: {
    color: '#C0392B',
    fontSize: 13,
  },
  retry: {
    color: COLORS.gold,
    fontWeight: 'bold',
    marginTop: 12,
  },
  quote: {
    backgroundColor: COLORS.brown,
    borderRadius: 20,
    padding: 22,
    marginTop: 15,
    ...SHADOW,
  },
  quoteMark: {
    color: COLORS.beige,
    fontSize: 43,
    height: 35,
  },
  quoteText: {
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
  },
  quoteAuthor: {
    color: COLORS.beige,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 14,
  },
  bottomSpace: {
    height: 25,
  },
});

