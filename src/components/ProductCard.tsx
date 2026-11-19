
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CoffeeProduct } from '../data';
import { COLORS, SHADOW } from '../theme';

type Props = {
  product: CoffeeProduct;
  onPress: () => void;
  onAdd: () => void;
};

export default function ProductCard({ product, onPress, onAdd }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {product.description}
        </Text>

        <View style={styles.bottom}>
          <Text style={styles.price}>
            {product.price.toLocaleString('ru-RU')} ₸
          </Text>

          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    width: '100%',        // Экранның толық енін алады
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,     // Карточкалардың арасына бос орын қалдырады
    ...SHADOW,
  },

  image: {
    width: '100%',
    height: 145,
    backgroundColor: COLORS.light,
  },
  info: {
    padding: 14,
  },
  category: {
    color: COLORS.gold,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  name: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 5,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  price: {
    color: COLORS.brown,
    fontSize: 15,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: COLORS.brown,
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: COLORS.white,
    fontSize: 23,
    lineHeight: 26,
  },
});
