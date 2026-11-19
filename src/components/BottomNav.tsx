
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

const items = [
  { name: 'Главная', icon: '⌂' },
  { name: 'Каталог', icon: '☕' },
  { name: 'Корзина', icon: '🛍' },
  { name: 'Профиль', icon: '♙' },
];

type Props = {
  activeTab: string;
  onChange: (tab: string) => void;
  cartCount: number;
};

export default function BottomNav({
  activeTab,
  onChange,
  cartCount,
}: Props) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const active = activeTab === item.name;

        return (
          <TouchableOpacity
            key={item.name}
            style={styles.item}
            onPress={() => onChange(item.name)}
          >
            <View>
              <Text style={[styles.icon, active && styles.activeIcon]}>
                {item.icon}
              </Text>

              {item.name === 'Корзина' && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>

            <Text style={[styles.label, active && styles.activeLabel]}>
              {item.name}
            </Text>

            {active && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  icon: {
    fontSize: 21,
    color: COLORS.gray,
  },
  activeIcon: {
    color: COLORS.brown,
  },
  label: {
    color: COLORS.gray,
    fontSize: 10,
    marginTop: 4,
  },
  activeLabel: {
    color: COLORS.brown,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: 25,
    height: 3,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },
  badge: {
    position: 'absolute',
    right: -9,
    top: -5,
    backgroundColor: COLORS.gold,
    minWidth: 16,
    height: 16,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
});
