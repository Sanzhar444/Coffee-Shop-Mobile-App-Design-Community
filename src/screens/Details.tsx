
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CoffeeProduct } from '../data';
import { COLORS } from '../theme';

type Props = {
  product: CoffeeProduct;
  onBack: () => void;
  onAdd: () => void;
};

export default function Details({ product, onBack, onAdd }: Props) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Назад</Text>
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.info}>
        <Text style={styles.infoText}>Свежеприготовленный напиток</Text>
        <Text style={styles.infoText}>Качество Premium</Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.price}>
          {product.price.toLocaleString('ru-RU')} ₸
        </Text>
        <TouchableOpacity style={styles.button} onPress={onAdd}>
          <Text style={styles.buttonText}>Добавить в корзину</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  back: {
    color: COLORS.brown,
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 18,
  },
  image: {
    width: '100%',
    height: 290,
    borderRadius: 22,
    backgroundColor: COLORS.light,
  },
  category: {
    color: COLORS.gold,
    marginTop: 22,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  name: {
    color: COLORS.dark,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 12,
  },
  info: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 16,
    marginTop: 22,
  },
  infoText: {
    color: COLORS.brown,
    marginVertical: 5,
  },
  bottom: {
    marginTop: 25,
    marginBottom: 30,
  },
  price: {
    color: COLORS.dark,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.brown,
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
