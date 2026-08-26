import { useState, useEffect } from 'react';

const INITIAL_BUSINESS = {
  id: "biz_001",
  tenantId: "tenant_001",
  name: "Burger Craft & Co.",
  slug: "burger-craft",
  description: "Hamburguesas artesanales premium con carne Angus smash, papas rústicas y salsas secretas.",
  logoUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=80",
  bannerUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
  phone: "+56912345678",
  address: "Av. Providencia 1240, Santiago",
  currency: "CLP",
  currencySymbol: "$",
  primaryColor: "#f97316",
  whatsappOrders: true,
  isOpen: true
};
const INITIAL_CATEGORIES = [
  {
    id: "cat_01",
    tenantId: "tenant_001",
    businessId: "biz_001",
    name: "Hamburguesas Smash",
    slug: "hamburguesas-smash",
    description: "Doble carne angus smash, pan brioche tostado y queso cheddar fundido.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
    position: 1,
    isVisible: true
  },
  {
    id: "cat_02",
    tenantId: "tenant_001",
    businessId: "biz_001",
    name: "Acompañamientos",
    slug: "acompanamientos",
    description: "Papas fritas crujientes y aros de cebolla.",
    imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&auto=format&fit=crop&q=80",
    position: 2,
    isVisible: true
  },
  {
    id: "cat_03",
    tenantId: "tenant_001",
    businessId: "biz_001",
    name: "Bebidas y Cervezas",
    slug: "bebidas-y-cervezas",
    description: "Gaseosas bien frías y cervezas artesanales.",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80",
    position: 3,
    isVisible: true
  }
];
const INITIAL_PRODUCTS = [
  {
    id: "prod_01",
    tenantId: "tenant_001",
    businessId: "biz_001",
    categoryId: "cat_01",
    name: "Double Bacon Smash",
    description: "2 carnes smash de 90g, doble queso cheddar americano, tocino ahumado crocante y salsa especial.",
    price: 7990,
    compareAtPrice: 8990,
    imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    sku: "BC-DBS-01",
    position: 1,
    isFeatured: true,
    isVisible: true,
    isAvailable: true,
    variants: [
      { id: "v1", name: "Simple (1 Smash)", priceDelta: -1500 },
      { id: "v2", name: "Doble (2 Smash)", priceDelta: 0, isDefault: true },
      { id: "v3", name: "Triple (3 Smash)", priceDelta: 2e3 }
    ],
    modifiers: [
      { id: "m1", groupName: "Extras", name: "Queso Cheddar Extra", price: 600, maxQuantity: 2 },
      { id: "m2", groupName: "Extras", name: "Tiras de Tocino Extra", price: 990, maxQuantity: 2 },
      { id: "m3", groupName: "Extras", name: "Pepinillos Dulces", price: 400, maxQuantity: 1 }
    ]
  },
  {
    id: "prod_02",
    tenantId: "tenant_001",
    businessId: "biz_001",
    categoryId: "cat_01",
    name: "Truffle & Mushroom Burger",
    description: "Doble smash, queso suizo, champiñones salteados a la mantequilla y mayonesa trufada.",
    price: 8490,
    compareAtPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    sku: "BC-TRUF-02",
    position: 2,
    isFeatured: true,
    isVisible: true,
    isAvailable: true,
    modifiers: [
      { id: "m4", groupName: "Extras", name: "Huevo Frito de Campo", price: 800, maxQuantity: 1 },
      { id: "m5", groupName: "Extras", name: "Cebolla Caramelizada", price: 600, maxQuantity: 1 }
    ]
  },
  {
    id: "prod_03",
    tenantId: "tenant_001",
    businessId: "biz_001",
    categoryId: "cat_02",
    name: "Papas Rústicas con Cheddar & Bacon",
    description: "Porción generosa de papas con corte artesanal, salsa cheddar tibia y lluvia de tocino.",
    price: 4490,
    compareAtPrice: 4990,
    imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
    sku: "BC-PAP-03",
    position: 3,
    isFeatured: false,
    isVisible: true,
    isAvailable: true
  },
  {
    id: "prod_04",
    tenantId: "tenant_001",
    businessId: "biz_001",
    categoryId: "cat_03",
    name: "Limonada Menta Jengibre (500ml)",
    description: "Elaborada con limones frescos, hojas de menta orgánica y toque de jengibre.",
    price: 2990,
    compareAtPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    sku: "BC-LIM-04",
    position: 4,
    isFeatured: false,
    isVisible: true,
    isAvailable: true
  }
];

const STORAGE_KEYS = {
  BUSINESS: "bun_business_state",
  CATEGORIES: "bun_categories_state",
  PRODUCTS: "bun_products_state",
  CART: "bun_cart_state"
};
function useCatalogStore() {
  const [business, setBusinessState] = useState(INITIAL_BUSINESS);
  const [categories, setCategoriesState] = useState(INITIAL_CATEGORIES);
  const [products, setProductsState] = useState(INITIAL_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    try {
      const storedBiz = localStorage.getItem(STORAGE_KEYS.BUSINESS);
      const storedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      const storedProds = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedBiz) setBusinessState(JSON.parse(storedBiz));
      if (storedCats) setCategoriesState(JSON.parse(storedCats));
      if (storedProds) setProductsState(JSON.parse(storedProds));
    } catch (e) {
      console.error("Error loading state from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);
  const updateBusiness = (updated) => {
    setBusinessState((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(next));
      window.dispatchEvent(new Event("bun:data_updated"));
      return next;
    });
  };
  const addCategory = (cat) => {
    const newCat = {
      ...cat,
      id: `cat_${Date.now()}`,
      tenantId: business.tenantId,
      businessId: business.id
    };
    setCategoriesState((prev) => {
      const next = [...prev, newCat];
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(next));
      window.dispatchEvent(new Event("bun:data_updated"));
      return next;
    });
  };
  const updateCategory = (id, cat) => {
    setCategoriesState((prev) => {
      const next = prev.map((c) => c.id === id ? { ...c, ...cat } : c);
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(next));
      window.dispatchEvent(new Event("bun:data_updated"));
      return next;
    });
  };
  const deleteCategory = (id) => {
    setCategoriesState((prev) => {
      const next = prev.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(next));
      window.dispatchEvent(new Event("bun:data_updated"));
      return next;
    });
  };
  const addProduct = (prod) => {
    const newProd = {
      ...prod,
      id: `prod_${Date.now()}`,
      tenantId: business.tenantId,
      businessId: business.id
    };
    setProductsState((prev) => {
      const next = [...prev, newProd];
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
      window.dispatchEvent(new Event("bun:data_updated"));
      return next;
    });
  };
  const updateProduct = (id, prod) => {
    setProductsState((prev) => {
      const next = prev.map((p) => p.id === id ? { ...p, ...prod } : p);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
      window.dispatchEvent(new Event("bun:data_updated"));
      return next;
    });
  };
  const deleteProduct = (id) => {
    setProductsState((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
      window.dispatchEvent(new Event("bun:data_updated"));
      return next;
    });
  };
  const resetToDemo = () => {
    setBusinessState(INITIAL_BUSINESS);
    setCategoriesState(INITIAL_CATEGORIES);
    setProductsState(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.BUSINESS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    window.dispatchEvent(new Event("bun:data_updated"));
  };
  return {
    business,
    categories,
    products,
    isLoaded,
    updateBusiness,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDemo
  };
}

export { useCatalogStore as u };
