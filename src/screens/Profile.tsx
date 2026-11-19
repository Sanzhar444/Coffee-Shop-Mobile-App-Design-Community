
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

type Props = {
  email: string;
  onLogin: () => void;
  onLogout: () => void;
};

export default function Profile({ email, onLogin, onLogout }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мой профиль</Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>♙</Text>
        </View>

        <Text style={styles.name}>
          {email ? 'Добро пожаловать!' : 'Гость'}
        </Text>
        <Text style={styles.email}>
          {email || 'Войдите в аккаунт'}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={email ? onLogout : onLogin}
        >
          <Text style={styles.buttonText}>
            {email ? 'Выйти из аккаунта' : 'Войти / Регистрация'}
          </Text>
        </TouchableOpacity>
      </View>

      {['Мои заказы', 'Избранное', 'Адрес доставки', 'Настройки'].map(
        (item, index) => (
          <View style={styles.menu} key={item}>
            <Text style={styles.menuText}>
              {['📦', '♡', '📍', '⚙'][index]}   {item}
            </Text>
            <Text style={styles.arrow}>›</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    color: COLORS.dark,
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 22,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 40, color: COLORS.brown },
  name: {
    color: COLORS.dark,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 14,
  },
  email: { color: COLORS.gray, marginTop: 6 },
  button: {
    backgroundColor: COLORS.brown,
    borderRadius: 13,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold' },
  menu: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: { color: COLORS.dark, fontSize: 14 },
  arrow: { color: COLORS.gold, fontSize: 20 },
});
