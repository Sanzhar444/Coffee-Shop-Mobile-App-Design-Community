
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CoffeeProduct } from '../data';
import { COLORS } from '../theme';

export type CartItem = {
  product: CoffeeProduct;
  quantity: number;
};

type Props = {
  cart: CartItem[];
  onChange: (id: number, amount: number) => void;
  onCheckout: () => void;
};

export default function Cart({ cart, onChange, onCheckout }: Props) {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Корзина</Text>
      <Text style={styles.subtitle}>Ваш заказ</Text>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛍</Text>
          <Text style={styles.emptyTitle}>Пока здесь пусто</Text>
          <Text style={styles.emptyText}>
            Добавьте что-нибудь вкусное из каталога.
          </Text>
        </View>
      ) : (
        <>
          {cart.map((item) => (
            <View style={styles.item} key={item.product.id}>
              <Text style={styles.emoji}>☕</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.name}>{item.product.name}</Text>
                <Text style={styles.price}>
                  {item.product.price.toLocaleString('ru-RU')} ₸
                </Text>
                <View style={styles.controls}>
                  <TouchableOpacity
                    style={styles.control}
                    onPress={() => onChange(item.product.id, -1)}
                  >
                    <Text>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.control}
                    onPress={() => onChange(item.product.id, 1)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.summary}>
            <Text style={styles.totalLabel}>Итого</Text>
            <Text style={styles.total}>
              {total.toLocaleString('ru-RU')} ₸
            </Text>
            <TouchableOpacity style={styles.checkout} onPress={onCheckout}>
              <Text style={styles.checkoutText}>Оформить заказ</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  empty: {
    alignItems: 'center',
    marginTop: 75,
  },
  emptyIcon: { fontSize: 55 },
  emptyTitle: {
    color: COLORS.dark,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
  },
  emptyText: {
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
  },
  item: {
    backgroundColor: COLORS.white,
    borderRadius: 17,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: { fontSize: 40, marginRight: 15 },
  itemInfo: { flex: 1 },
  name: { color: COLORS.dark, fontSize: 16, fontWeight: 'bold' },
  price: { color: COLORS.gold, marginTop: 5 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  control: {
    backgroundColor: COLORS.light,
    width: 29,
    height: 29,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: { marginHorizontal: 14, color: COLORS.dark },
  summary: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  totalLabel: { color: COLORS.gray },
  total: {
    color: COLORS.dark,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 7,
  },
  checkout: {
    backgroundColor: COLORS.brown,
    padding: 16,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 18,
  },
  checkoutText: { color: COLORS.white, fontWeight: 'bold' },
});
