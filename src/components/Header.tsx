
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

type Props = {
  cartCount: number;
  onCartPress: () => void;
};

export default function Header({ cartCount, onCartPress }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.logo}>AROMA CRAFT.</Text>
        <Text style={styles.subtitle}>COFFEE HOUSE</Text>
      </View>

      <TouchableOpacity style={styles.cart} onPress={onCartPress}>
        <Text style={styles.cartIcon}>♧</Text>
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingTop: 50,      // Жоғарғы сағат пен камерадан төмен түсіреді
    paddingBottom: 12,   // Астыңғы жағынан сәл орын қалдырады
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    color: COLORS.dark,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitle: {
    color: COLORS.gold,
    fontSize: 9,
    letterSpacing: 4,
    marginTop: 4,
  },
  cart: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    fontSize: 23,
    color: COLORS.brown,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    minWidth: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
