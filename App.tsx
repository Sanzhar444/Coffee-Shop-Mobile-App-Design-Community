
import React, { useState } from 'react';
import { View, StyleSheet, Alert, SafeAreaView, StatusBar } from 'react-native';

import { COLORS } from './src/theme';
import { CoffeeProduct } from './src/data';
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import Login from './src/components/Login';

import Home from './src/screens/Home';
import Catalog from './src/screens/Catalog';
import Cart, { CartItem } from './src/screens/Cart';
import Profile from './src/screens/Profile';
import Details from './src/screens/Details';

export default function App() {
  const [activeTab, setActiveTab] = useState('Главная');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');

  const addToCart = (product: CoffeeProduct) => {
    setCart((old) => {
      const found = old.find((item) => item.product.id === product.id);

      if (found) {
        return old.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...old, { product, quantity: 1 }];
    });

    Alert.alert('Добавлено', `${product.name} добавлен в корзину`);
  };

  const changeQuantity = (id: number, amount: number) => {
    setCart((old) =>
      old
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const checkout = () => {
    if (!cart.length) {
      Alert.alert('Корзина пуста');
      return;
    }

    Alert.alert('Заказ принят!', 'Спасибо за ваш заказ.');
    setCart([]);
    setActiveTab('Главная');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderScreen = () => {
    if (showLogin) {
      return (
        <Login
          onBack={() => setShowLogin(false)}
          onLogin={(userEmail) => {
            setEmail(userEmail);
            setShowLogin(false);
            setActiveTab('Профиль');
          }}
        />
      );
    }

    if (selectedProduct) {
      return (
        <Details
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAdd={() => addToCart(selectedProduct)}
        />
      );
    }

    switch (activeTab) {
      case 'Каталог':
        return (
          <Catalog
            onAdd={addToCart}
            onSelect={setSelectedProduct}
          />
        );

      case 'Корзина':
        return (
          <Cart
            cart={cart}
            onChange={changeQuantity}
            onCheckout={checkout}
          />
        );

      case 'Профиль':
        return (
          <Profile
            email={email}
            onLogin={() => setShowLogin(true)}
            onLogout={() => setEmail('')}
          />
        );

      default:
        return (
          <Home
            onAdd={addToCart}
            onSelect={setSelectedProduct}
            onCatalog={() => setActiveTab('Каталог')}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {!showLogin && !selectedProduct && (
        <Header
          cartCount={cartCount}
          onCartPress={() => setActiveTab('Корзина')}
        />
      )}

      <View style={styles.content}>
        {renderScreen()}
      </View>

      {!showLogin && !selectedProduct && (
        <BottomNav
          activeTab={activeTab}
          onChange={setActiveTab}
          cartCount={cartCount}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
});
