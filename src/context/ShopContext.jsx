import React, { createContext, useState, useContext } from 'react';

const storageUnits = {
  1: 'Unit Alpha',
  2: 'Unit Beta',
  3: 'Unit Gamma',
  4: 'Unit Delta',
  5: 'Unit Epsilon',
  6: 'Unit Zeta'
};

const initialProducts = [
  {
    id: 1,
    name: 'DHAAGA V-Belt Heavy Duty',
    categoryId: 1, // BELTS
    unit: storageUnits[1],
    locker: 'Locker #12',
    partNo: '1575002',
    compat: 'Mahindra / Swaraj',
    image: 'https://placehold.co/150x150/1A8245/FFFFFF?text=V-Belt',
    price: 450,
    stock: 25
  },
  {
    id: 2,
    name: 'Premium Oil Filter',
    categoryId: 2, // FILTERS
    unit: storageUnits[2],
    locker: 'Locker #05',
    partNo: 'S122513',
    compat: 'Mahindra / Swaraj',
    image: 'https://placehold.co/150x150/1A8245/FFFFFF?text=Oil+Filter',
    price: 350,
    stock: 25
  },
  {
    id: 3,
    name: 'Air Filter Element',
    categoryId: 2, // FILTERS
    unit: storageUnits[2],
    locker: 'Locker #08',
    partNo: 'AF-8092',
    compat: 'John Deere',
    image: 'https://placehold.co/150x150/1A8245/FFFFFF?text=Air+Filter',
    price: 520,
    stock: 25
  },
  {
    id: 4,
    name: 'Tapered Roller Bearing',
    categoryId: 3, // BEARINGS
    unit: storageUnits[3],
    locker: 'Locker #22',
    partNo: '30209-TRB',
    compat: 'Universal',
    image: 'https://placehold.co/150x150/1A8245/FFFFFF?text=Bearing',
    price: 280,
    stock: 25
  },
  {
    id: 5,
    name: 'Premium Tractor Grease 1KG',
    categoryId: 4, // LUBRICANTS
    unit: storageUnits[4],
    locker: 'Locker #17',
    partNo: 'LUB-GRS1',
    compat: 'All Models',
    image: 'https://placehold.co/150x150/1A8245/FFFFFF?text=Grease',
    price: 400,
    stock: 25
  },
  {
    id: 6,
    name: 'Hydraulic Seal Kit',
    categoryId: 5, // SEALS
    unit: storageUnits[5],
    locker: 'Locker #03',
    partNo: 'HSK-45X',
    compat: 'Sonalika',
    image: 'https://placehold.co/150x150/1A8245/FFFFFF?text=Seal+Kit',
    price: 150,
    stock: 25
  },
  {
    id: 7,
    name: 'Heavy Duty Ignition Switch',
    categoryId: 6, // ELECTRICAL
    unit: storageUnits[6],
    locker: 'Locker #09',
    partNo: 'E-IGSW-99',
    compat: 'Universal',
    image: 'https://placehold.co/150x150/1A8245/FFFFFF?text=Switch',
    price: 850,
    stock: 25
  }
];

const ShopContext = createContext();

export function useShop() {
  return useContext(ShopContext);
}

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState({});
  const [lastOrder, setLastOrder] = useState({});

  const addToCart = (productId, quantity = 1) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const product = products.find(p => p.id === productId);
      
      if (currentQty + quantity > product.stock) {
        alert("Cannot add more than available stock!");
        return prev;
      }
      
      return {
        ...prev,
        [productId]: currentQty + quantity
      };
    });
  };
  
  const updateCartQty = (productId, quantity) => {
    setCart(prev => {
      if (quantity <= 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return {
        ...prev,
        [productId]: quantity
      };
    });
  };

  const checkout = () => {
    if (Object.keys(cart).length === 0) return;
    
    // Save items to last order for success page
    setLastOrder({ ...cart });
    
    setProducts(prevProducts => 
      prevProducts.map(product => {
        const cartQty = cart[product.id];
        if (cartQty) {
          return { ...product, stock: product.stock - cartQty };
        }
        return product;
      })
    );
    setCart({});
  };

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find(p => p.id === parseInt(id));
      return total + (product ? product.price * qty : 0);
    }, 0);
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      lastOrder,
      cartCount,
      addToCart,
      updateCartQty,
      checkout,
      getCartTotal
    }}>
      {children}
    </ShopContext.Provider>
  );
}
