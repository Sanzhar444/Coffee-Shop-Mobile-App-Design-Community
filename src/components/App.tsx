
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';

const COLORS = {
  background: '#F7F3EE',
  brown: '#6F4E37',
  dark: '#261810',
  light: '#FFFFFF',
  gray: '#9B918A',
  orange: '#C58B55',
};

const products = [
  {
    id: 1,
    name: 'Cappuccino',
    category: 'Coffee',
    price: 1200,
    description: 'Эспрессо, сүт және жұмсақ сүт көбігі',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600',
  },
  {
    id: 2,
    name: 'Latte',
    category: 'Coffee',
    price: 1400,
    description: 'Жұмсақ сүт қосылған хош иісті кофе',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
  },
  {
    id: 3,
    name: 'Americano',
    category: 'Coffee',
    price: 1000,
    description: 'Классикалық қара кофе',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600',
  },
  {
    id: 4,
    name: 'Mocha',
    category: 'Coffee',
    price: 1600,
    description: 'Шоколад пен кофенің ерекше үйлесімі',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600',
  },
  {
    id: 5,
    name: 'Iced Coffee',
    category: 'Cold',
    price: 1500,
    description: 'Мұз қосылған салқын кофе',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600',
  },
  {
    id: 6,
    name: 'Chocolate Cake',
    category: 'Dessert',
    price: 1800,
    description: 'Дәмді шоколадты десерт',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
  },
];

export default function App() {
  const [page, setPage] = useState('Home');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      category === 'All' || item.category === category;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: any) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const changeQuantity = (id: number, amount: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const ProductCard = ({ item }: any) => (
    <View style={styles.productCard}>
      <TouchableOpacity
        onPress={() => setSelectedProduct(item)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Text style={{ fontSize: 20 }}>
          {favorites.includes(item.id) ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>
          {item.description}
        </Text>

        <View style={styles.productBottom}>
          <Text style={styles.price}>{item.price} ₸</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHome = () => (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Қош келдіңіз!</Text>
          <Text style={styles.headerTitle}>Coffee House ☕</Text>
        </View>
        <Text style={styles.headerIcon}>☕</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerSmall}>БҮГІНГІ ҰСЫНЫС</Text>
        <Text style={styles.bannerTitle}>Өзіңе кофе сыйла!</Text>
        <Text style={styles.bannerDescription}>
          Әр күнді сүйікті кофеңмен баста.
        </Text>
        <TouchableOpacity
          style={styles.bannerButton}
          onPress={() => setPage('Catalog')}
        >
          <Text style={styles.bannerButtonText}>Тапсырыс беру</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Санаттар</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {['All', 'Coffee', 'Cold', 'Dessert'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.categoryActive,
            ]}
            onPress={() => {
              setCategory(item);
              setPage('Catalog');
            }}
          >
            <Text
              style={[
                styles.categoryText,
                category === item && styles.categoryTextActive,
              ]}
            >
              {item === 'All'
                ? 'Барлығы'
                : item === 'Coffee'
                ? 'Кофе'
                : item === 'Cold'
                ? 'Салқын сусын'
                : 'Десерт'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Танымал өнімдер</Text>
        <TouchableOpacity onPress={() => setPage('Catalog')}>
          <Text style={styles.seeAll}>Барлығын көру</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productsGrid}>
        {products.slice(0, 4).map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </View>
    </>
  );

  const renderCatalog = () => (
    <>
      <Text style={styles.pageTitle}>Кофе мәзірі</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Кофе іздеу..."
        placeholderTextColor={COLORS.gray}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.productsGrid}>
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </View>

      {filteredProducts.length === 0 && (
        <Text style={styles.emptyText}>Өнім табылмады</Text>
      )}
    </>
  );

  const renderCart = () => (
    <>
      <Text style={styles.pageTitle}>Менің себетім 🛒</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Себетіңіз әзірге бос</Text>
      ) : (
        <>
          {cart.map((item) => (
            <View style={styles.cartItem} key={item.id}>
              <Image
                source={{ uri: item.image }}
                style={styles.cartImage}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.price}>{item.price} ₸</Text>

                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    onPress={() => changeQuantity(item.id, -1)}
                    style={styles.quantityButton}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityText}>
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() => changeQuantity(item.id, 1)}
                    style={styles.quantityButton}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Жалпы баға:</Text>
            <Text style={styles.totalPrice}>{total} ₸</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              setCart([]);
              alert('Тапсырысыңыз қабылданды! ☕');
            }}
          >
            <Text style={styles.checkoutText}>Тапсырыс беру</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );

  const renderFavorites = () => {
    const favoriteProducts = products.filter((item) =>
      favorites.includes(item.id)
    );

    return (
      <>
        <Text style={styles.pageTitle}>Таңдаулылар ❤️</Text>
        <View style={styles.productsGrid}>
          {favoriteProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View>
        {favoriteProducts.length === 0 && (
          <Text style={styles.emptyText}>
            Таңдаулы өнімдер әзірге жоқ
          </Text>
        )}
      </>
    );
  };

  const renderProfile = () => (
    <>
      <Text style={styles.pageTitle}>Менің профилім</Text>

      <View style={styles.profileCard}>
        <Text style={styles.profileAvatar}>👤</Text>
        <Text style={styles.profileName}>Coffee Lover</Text>
        <Text style={styles.smallText}>Қош келдіңіз!</Text>
      </View>

      {[
        '👤 Жеке мәліметтер',
        '📦 Менің тапсырыстарым',
        '❤️ Таңдаулылар',
        '📍 Жеткізу мекенжайы',
        '⚙️ Баптаулар',
      ].map((item) => (
        <TouchableOpacity key={item} style={styles.profileOption}>
          <Text style={styles.profileOptionText}>{item}</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {page === 'Home' && renderHome()}
        {page === 'Catalog' && renderCatalog()}
        {page === 'Cart' && renderCart()}
        {page === 'Favorites' && renderFavorites()}
        {page === 'Profile' && renderProfile()}
      </ScrollView>

      <View style={styles.bottomNav}>
        {[
          { id: 'Home', icon: '⌂', label: 'Басты бет' },
          { id: 'Catalog', icon: '☕', label: 'Мәзір' },
          { id: 'Favorites', icon: '♡', label: 'Таңдаулы' },
          { id: 'Cart', icon: '🛒', label: `Себет (${cart.length})` },
          { id: 'Profile', icon: '♙', label: 'Профиль' },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => setPage(item.id)}
          >
            <Text
              style={[
                styles.navIcon,
                page === item.id && styles.navActive,
              ]}
            >
              {item.icon}
            </Text>
            <Text
              style={[
                styles.navLabel,
                page === item.id && styles.navActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedProduct && (
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedProduct(null)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Image
              source={{ uri: selectedProduct.image }}
              style={styles.modalImage}
            />

            <Text style={styles.modalTitle}>
              {selectedProduct.name}
            </Text>
            <Text style={styles.modalDescription}>
              {selectedProduct.description}
            </Text>
            <Text style={styles.totalPrice}>
              {selectedProduct.price} ₸
            </Text>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              <Text style={styles.checkoutText}>
                Себетке қосу
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 25,
  },
  smallText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  headerTitle: {
    color: COLORS.dark,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
  },
  headerIcon: {
    fontSize: 35,
  },
  banner: {
    backgroundColor: COLORS.brown,
    borderRadius: 22,
    padding: 22,
    marginBottom: 25,
  },
  bannerSmall: {
    color: '#E9C8A5',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 12,
  },
  bannerDescription: {
    color: '#F2E7DC',
    marginTop: 8,
  },
  bannerButton: {
    backgroundColor: '#F1D6B8',
    alignSelf: 'flex-start',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 20,
  },
  bannerButtonText: {
    color: COLORS.dark,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.dark,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  seeAll: {
    color: COLORS.brown,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
  },
  categoryActive: {
    backgroundColor: COLORS.brown,
  },
  categoryText: {
    color: COLORS.dark,
  },
  categoryTextActive: {
    color: 'white',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 17,
    overflow: 'hidden',
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: 125,
    backgroundColor: '#E5DDD5',
  },
  favoriteButton: {
    position: 'absolute',
    right: 9,
    top: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  productInfo: {
    padding: 11,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  productDescription: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 5,
    minHeight: 30,
  },
  productBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  price: {
    color: COLORS.brown,
    fontWeight: 'bold',
    fontSize: 15,
  },
  addButton: {
    backgroundColor: COLORS.brown,
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 23,
  },
  pageTitle: {
    fontSize: 26,
    color: COLORS.dark,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 22,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 15,
    marginBottom: 20,
    fontSize: 15,
    color: COLORS.dark,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 50,
    fontSize: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  cartImage: {
    width: 85,
    height: 90,
    borderRadius: 12,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 13,
  },
  quantityButton: {
    backgroundColor: COLORS.background,
    width: 27,
    height: 27,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  totalText: {
    color: COLORS.dark,
    fontSize: 17,
  },
  totalPrice: {
    color: COLORS.brown,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: COLORS.brown,
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 15,
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    fontSize: 55,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginVertical: 10,
  },
  profileOption: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 13,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileOptionText: {
    color: COLORS.dark,
    fontSize: 15,
  },
  arrow: {
    color: COLORS.gray,
    fontSize: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#EAE2DA',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 21,
    color: COLORS.gray,
  },
  navLabel: {
    fontSize: 9,
    color: COLORS.gray,
    marginTop: 4,
  },
  navActive: {
    color: COLORS.brown,
    fontWeight: 'bold',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 22,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  closeText: {
    fontSize: 22,
    color: COLORS.dark,
  },
  modalImage: {
    width: '100%',
    height: 190,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 15,
  },
  modalDescription: {
    color: COLORS.gray,
    marginTop: 8,
  },
});
