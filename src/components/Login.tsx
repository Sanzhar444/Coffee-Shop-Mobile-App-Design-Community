import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {
  loginUser,
  registerUser,
  resetPassword,
} from '../services/auth';

type LoginProps = {
  onBack: () => void;
  onLogin: (email: string, password: string) => void;
};

const COLORS = {
  background: '#F5EBE0',
  card: '#FFF9F2',
  brown: '#4A2C20',
  dark: '#2C1D11',
  beige: '#D4A373',
  lightBrown: '#A98467',
  text: '#35251C',
  gray: '#8B8179',
  white: '#FFFFFF',
  border: '#E8D8C8',
};

export default function Login({ onBack, onLogin }: LoginProps) {
  const [screen, setScreen] = useState<'login' | 'register' | 'forgot'>(
    'login'
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля.');
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert('Ошибка', 'Введите правильный email.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов.');
      return;
    }

    try {
      await loginUser(email, password);
      onLogin(email.trim(), password);
    } catch (error) {
      Alert.alert(
        'Ошибка входа',
        error instanceof Error ? error.message : 'Не удалось войти.'
      );
    }
  };

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Заполните все поля.');
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert('Ошибка', 'Введите правильный email.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают.');
      return;
    }

    try {
      const result = await registerUser(email, password);

      if (result.session) {
        Alert.alert('Успешно!', 'Аккаунт создан.');
        onLogin(email.trim(), password);
      } else {
        Alert.alert(
          'Регистрация успешна!',
          'Проверьте почту и подтвердите email, затем войдите в аккаунт.'
        );
        setScreen('login');
      }
    } catch (error) {
      Alert.alert(
        'Ошибка регистрации',
        error instanceof Error ? error.message : 'Не удалось зарегистрироваться.'
      );
    }
  };

  const handleForgot = async () => {
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Введите ваш email.');
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert('Ошибка', 'Введите правильный email.');
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert('Готово!', 'Письмо отправлено на вашу почту.');
      setScreen('login');
    } catch (error) {
      Alert.alert(
        'Ошибка',
        error instanceof Error ? error.message : 'Не удалось отправить письмо.'
      );
    }
  };

  const renderInput = (
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (value: string) => void,
    options?: {
      secure?: boolean;
      toggle?: () => void;
      visible?: boolean;
      keyboardType?: 'default' | 'email-address';
      autoCapitalize?: 'none' | 'words';
    }
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={options?.secure && !options?.visible}
          keyboardType={options?.keyboardType || 'default'}
          autoCapitalize={options?.autoCapitalize || 'none'}
          autoCorrect={false}
        />

        {options?.toggle && (
          <TouchableOpacity
            onPress={options.toggle}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeText}>
              {options.visible ? 'Скрыть' : 'Показать'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>

      <View style={styles.brand}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>☕</Text>
        </View>

        <Text style={styles.logoTitle}>AROMA CRAFT</Text>
        <Text style={styles.logoSubtitle}>COFFEE & DESSERTS</Text>
      </View>

      <View style={styles.card}>
        {screen === 'login' && (
          <>
            <Text style={styles.title}>С возвращением!</Text>
            <Text style={styles.subtitle}>
              Войдите в свой аккаунт
            </Text>

            {renderInput(
              'Электронная почта',
              'example@gmail.com',
              email,
              setEmail,
              {
                keyboardType: 'email-address',
              }
            )}

            {renderInput(
              'Пароль',
              'Введите пароль',
              password,
              setPassword,
              {
                secure: true,
                visible: showPassword,
                toggle: () => setShowPassword(!showPassword),
              }
            )}

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => setScreen('forgot')}
            >
              <Text style={styles.forgotText}>
                Забыли пароль?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainButton}
              onPress={handleLogin}
            >
              <Text style={styles.mainButtonText}>Войти</Text>
            </TouchableOpacity>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                Нет аккаунта?
              </Text>

              <TouchableOpacity
                onPress={() => setScreen('register')}
              >
                <Text style={styles.switchLink}>
                  {' '}Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {screen === 'register' && (
          <>
            <Text style={styles.title}>Создать аккаунт</Text>
            <Text style={styles.subtitle}>
              Присоединяйтесь к AROMA CRAFT
            </Text>

            {renderInput(
              'Ваше имя',
              'Введите имя',
              name,
              setName,
              {
                autoCapitalize: 'words',
              }
            )}

            {renderInput(
              'Электронная почта',
              'example@gmail.com',
              email,
              setEmail,
              {
                keyboardType: 'email-address',
              }
            )}

            {renderInput(
              'Пароль',
              'Минимум 6 символов',
              password,
              setPassword,
              {
                secure: true,
                visible: showPassword,
                toggle: () => setShowPassword(!showPassword),
              }
            )}

            {renderInput(
              'Повторите пароль',
              'Введите пароль ещё раз',
              confirmPassword,
              setConfirmPassword,
              {
                secure: true,
                visible: showConfirmPassword,
                toggle: () =>
                  setShowConfirmPassword(!showConfirmPassword),
              }
            )}

            <TouchableOpacity
              style={styles.mainButton}
              onPress={handleRegister}
            >
              <Text style={styles.mainButtonText}>
                Зарегистрироваться
              </Text>
            </TouchableOpacity>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                Уже есть аккаунт?
              </Text>

              <TouchableOpacity
                onPress={() => setScreen('login')}
              >
                <Text style={styles.switchLink}> Войти</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {screen === 'forgot' && (
          <>
            <Text style={styles.title}>Восстановление пароля</Text>
            <Text style={styles.subtitle}>
              Укажите email, который использовали при регистрации.
            </Text>

            {renderInput(
              'Электронная почта',
              'example@gmail.com',
              email,
              setEmail,
              {
                keyboardType: 'email-address',
              }
            )}

            <TouchableOpacity
              style={styles.mainButton}
              onPress={handleForgot}
            >
              <Text style={styles.mainButtonText}>
                Восстановить пароль
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => setScreen('login')}
            >
              <Text style={styles.returnText}>
                ← Вернуться ко входу
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={styles.footer}>
        AROMA CRAFT © 2026
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 15,
  },
  backText: {
    color: COLORS.brown,
    fontSize: 15,
    fontWeight: 'bold',
  },
  brand: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 25,
  },
  logoCircle: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 37,
  },
  logoTitle: {
    color: COLORS.dark,
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: 3,
  },
  logoSubtitle: {
    color: COLORS.lightBrown,
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 5,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 23,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.dark,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 17,
  },
  inputLabel: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputWrapper: {
    minHeight: 52,
    backgroundColor: COLORS.background,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 50,
    paddingHorizontal: 14,
    color: COLORS.text,
    fontSize: 14,
  },
  eyeButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  eyeText: {
    color: COLORS.lightBrown,
    fontSize: 11,
    fontWeight: 'bold',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -5,
    marginBottom: 20,
  },
  forgotText: {
    color: COLORS.lightBrown,
    fontSize: 12,
    fontWeight: 'bold',
  },
  mainButton: {
    backgroundColor: COLORS.brown,
    height: 53,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  mainButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 23,
  },
  switchText: {
    color: COLORS.gray,
    fontSize: 12,
  },
  switchLink: {
    color: COLORS.brown,
    fontSize: 12,
    fontWeight: 'bold',
  },
  returnButton: {
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
  },
  returnText: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: COLORS.lightBrown,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 25,
  },
});

