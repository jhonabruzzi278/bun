import { useState, useEffect } from 'react';
import type { Business, Category, Product, CartItem } from './types';
import { INITIAL_BUSINESS, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from './mockData';

const STORAGE_KEYS = {
  BUSINESS: 'bun_business_state',
  CATEGORIES: 'bun_categories_state',
  PRODUCTS: 'bun_products_state',
  CART: 'bun_cart_state',
};

export function useCatalogStore() {
  const [business, setBusinessState] = useState<Business>(INITIAL_BUSINESS);
  const [categories, setCategoriesState] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProductsState] = useState<Product[]>(INITIAL_PRODUCTS);
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
      console.error('Error loading state from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateBusiness = (updated: Partial<Business>) => {
    setBusinessState((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(next));
      window.dispatchEvent(new Event('bun:data_updated'));
      return next;
    });
  };

  const addCategory = (cat: Omit<Category, 'id' | 'tenantId' | 'businessId'>): Category => {
    const newCat: Category = {
      ...cat,
      id: `cat_${Date.now()}`,
      tenantId: business.tenantId,
      businessId: business.id,
    };
    setCategoriesState((prev) => {
      const next = [...prev, newCat];
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(next));
      window.dispatchEvent(new Event('bun:data_updated'));
      return next;
    });
    return newCat;
  };

  const updateCategory = (id: string, cat: Partial<Category>) => {
    setCategoriesState((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...cat } : c));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(next));
      window.dispatchEvent(new Event('bun:data_updated'));
      return next;
    });
  };

  const deleteCategory = (id: string) => {
    setCategoriesState((prev) => {
      const next = prev.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(next));
      window.dispatchEvent(new Event('bun:data_updated'));
      return next;
    });
  };

  const addProduct = (prod: Omit<Product, 'id' | 'tenantId' | 'businessId'>): Product => {
    const newProd: Product = {
      ...prod,
      id: `prod_${Date.now()}`,
      tenantId: business.tenantId,
      businessId: business.id,
    };
    setProductsState((prev) => {
      const next = [...prev, newProd];
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
      window.dispatchEvent(new Event('bun:data_updated'));
      return next;
    });
    return newProd;
  };


  const updateProduct = (id: string, prod: Partial<Product>) => {
    setProductsState((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...prod } : p));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
      window.dispatchEvent(new Event('bun:data_updated'));
      return next;
    });
  };

  const deleteProduct = (id: string) => {
    setProductsState((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
      window.dispatchEvent(new Event('bun:data_updated'));
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
    window.dispatchEvent(new Event('bun:data_updated'));
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
    resetToDemo,
  };
}
