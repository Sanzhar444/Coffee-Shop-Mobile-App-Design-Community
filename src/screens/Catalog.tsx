
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { CoffeeProduct } from '../data';
import { getProducts } from '../services/products';
import ProductCard from '../components/ProductCard';
import { COLORS } from '../theme';

type Props = {
  onAdd: (product: CoffeeProduct) => void;
  onSelect: (product: CoffeeProduct) => void;
};

export default function Catalog({ onAdd, onSelect }: Props) {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const result = await getProducts();
      setProducts(result);
    } catch (err) {
      console.log('Catalog API error:', err);
      setError('Не удалось загрузить товары');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(
    () => ['Все', ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filtered = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === 'Все' || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Наше меню</Text>
      <Text style={styles.subtitle}>
        Найдите свой любимый вкус
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Поиск кофе и десертов..."
        placeholderTextColor={COLORS.gray}
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {categories.map((item) => {
          const active = category === item;

          return (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.category,
                active && styles.activeCategory,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  active && styles.activeCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {loading ? (
        <View style={styles.message}>
          <ActivityIndicator size="large" color={COLORS.gold} />
          <Text style={styles.messageText}>
            Загрузка товаров...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.message}>
          <Text style={styles.errorText}>{error}</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadProducts}
          >
            <Text style={styles.retryText}>
              Попробовать снова
            </Text>
          </TouchableOpacity>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.message}>
          <Text style={styles.emptyIcon}>☕</Text>
          <Text style={styles.messageText}>
            Товары не найдены
          </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => onSelect(product)}
              onAdd={() => onAdd(product)}
            />
          ))}
        </View>
      )}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: COLORS.dark,
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subtitle: {
    color: COLORS.gray,
    marginTop: 5,
    marginBottom: 20,
  },
  search: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: COLORS.dark,
    marginBottom: 17,
  },
  categories: {
    flexGrow: 0,
    marginBottom: 5,
  },
  category: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 20,
    marginRight: 9,
  },
  categoryText: {
    color: COLORS.brown,
    fontSize: 12,
  },
  activeCategory: {
    backgroundColor: COLORS.brown,
  },
  activeCategoryText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
    grid: {
    flexDirection: 'column', // Бір бағанмен тізіп шығарады
    marginTop: 20,
  },

  message: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 45,
  },
  messageText: {
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: {
    color: '#C0392B',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.brown,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  emptyIcon: {
    fontSize: 40,
  },
  bottomSpace: {
    height: 30,
  },
});

