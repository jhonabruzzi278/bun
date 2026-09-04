/**
 * Servicio de Inventario y Escandallos (BOM - Bill of Materials)
 * Control de stock automático para gastronomía, fast food y cervecerías (brew.cl).
 */

export interface InventoryItem {
  id: string;
  name: string;
  category: 'INGREDIENT' | 'RETAIL' | 'BEER_KEG';
  unit: 'un' | 'g' | 'cc';
  stock: number;
  minAlertThreshold: number;
}

// Inventario inicial del local
export const INITIAL_INVENTORY: Record<string, InventoryItem> = {
  pan_brioche: { id: 'pan_brioche', name: 'Pan Brioche Artesanal', category: 'INGREDIENT', unit: 'un', stock: 150, minAlertThreshold: 20 },
  carne_smash: { id: 'carne_smash', name: 'Porción Carne Angus Smash 90g', category: 'INGREDIENT', unit: 'un', stock: 300, minAlertThreshold: 40 },
  queso_cheddar: { id: 'queso_cheddar', name: 'Láminas Queso Cheddar Americano', category: 'INGREDIENT', unit: 'un', stock: 400, minAlertThreshold: 50 },
  tocino_crocante: { id: 'tocino_crocante', name: 'Tiras de Tocino Ahumado', category: 'INGREDIENT', unit: 'un', stock: 350, minAlertThreshold: 30 },
  coca_cola_lata: { id: 'coca_cola_lata', name: 'Coca-Cola Original 350ml Lata', category: 'RETAIL', unit: 'un', stock: 80, minAlertThreshold: 12 },
  corona_botella: { id: 'corona_botella', name: 'Cerveza Corona Extra 330cc Botella', category: 'RETAIL', unit: 'un', stock: 60, minAlertThreshold: 10 },
  barril_ipa: { id: 'barril_ipa', name: 'Barril Cerveza IPA Artesanal (50L)', category: 'BEER_KEG', unit: 'cc', stock: 50000, minAlertThreshold: 5000 },
};

// Recetas (Escandallo BOM) por cada producto del menú
export const RECIPES: Record<string, Array<{ inventoryId: string; quantity: number }>> = {
  'Double Bacon Smash': [
    { inventoryId: 'pan_brioche', quantity: 1 },
    { inventoryId: 'carne_smash', quantity: 2 },
    { inventoryId: 'queso_cheddar', quantity: 2 },
    { inventoryId: 'tocino_crocante', quantity: 2 },
  ],
  'Coca-Cola Original 350ml Lata': [
    { inventoryId: 'coca_cola_lata', quantity: 1 },
  ],
  'Cerveza Corona Extra 330cc Botella': [
    { inventoryId: 'corona_botella', quantity: 1 },
  ],
  'Cerveza IPA Artesanal 473cc': [
    { inventoryId: 'barril_ipa', quantity: 473 },
  ],
};

let currentInventory = { ...INITIAL_INVENTORY };

export function getInventory() {
  return currentInventory;
}

export function resetInventoryForTesting() {
  currentInventory = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
}

export interface DeductOrderResult {
  success: boolean;
  deductedItems: Array<{ inventoryId: string; name: string; deducted: number; remaining: number }>;
  lowStockWarnings: Array<{ inventoryId: string; name: string; remaining: number; threshold: number }>;
}

export function deductInventoryForOrder(
  orderItems: Array<{ name: string; quantity: number }>
): DeductOrderResult {
  const deductedItems: DeductOrderResult['deductedItems'] = [];
  const lowStockWarnings: DeductOrderResult['lowStockWarnings'] = [];

  for (const item of orderItems) {
    // Buscar coincidencia en recetas
    const recipeKey = Object.keys(RECIPES).find(
      (k) => k.toLowerCase() === item.name.toLowerCase() || item.name.toLowerCase().includes(k.toLowerCase())
    );

    if (recipeKey) {
      const ingredients = RECIPES[recipeKey];
      for (const ing of ingredients) {
        const inv = currentInventory[ing.inventoryId];
        if (inv) {
          const totalDeduction = ing.quantity * item.quantity;
          inv.stock = Math.max(0, inv.stock - totalDeduction);

          deductedItems.push({
            inventoryId: inv.id,
            name: inv.name,
            deducted: totalDeduction,
            remaining: inv.stock,
          });

          if (inv.stock <= inv.minAlertThreshold) {
            lowStockWarnings.push({
              inventoryId: inv.id,
              name: inv.name,
              remaining: inv.stock,
              threshold: inv.minAlertThreshold,
            });
          }
        }
      }
    }
  }

  return {
    success: true,
    deductedItems,
    lowStockWarnings,
  };
}
