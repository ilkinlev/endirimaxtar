#!/usr/bin/env node

/**
 * Product Merger Build Script - TypeScript Version
 * Merges duplicate products from products.json
 * Run: bun run merge or ts-node scripts/mergeProducts.ts
 */

import * as fs from "fs";
import * as path from "path";
import { Product, Store, MergeStats } from "../app/components/ProductList";

console.log("📄 Starting product merge...\n");

// Paths
const inputPath = path.join(__dirname, "../app/data/products.json");
const outputPath = path.join(__dirname, "../app/data/products-merged.json");
const backupPath = path.join(__dirname, "../app/data/products-backup.json");

// Read products
console.log("📥 Reading products.json...");
const rawData = fs.readFileSync(inputPath, "utf-8");
const productsData: Product[] = JSON.parse(rawData);
console.log(`   Found ${productsData.length} products\n`);

// Create backup
console.log("💾 Creating backup...");
fs.writeFileSync(backupPath, JSON.stringify(productsData, null, 2));
console.log("   ✅ Backup saved to products-backup.json\n");

// Merge function with proper typing
function mergeProducts(products: Product[]): Product[] {
  const map: Record<string, Product> = {};
  let mergeCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Create key: lowercase name + category
    const key = `${product.name.toLowerCase().trim()}_${product.category
      .toLowerCase()
      .trim()}`;

    if (map[key]) {
      // Product exists, merge stores
      mergeCount++;

      for (const store of product.stores) {
        // Check if this exact store already exists
        const exists = map[key].stores.some(
          (s: Store) =>
            s.name === store.name && Math.abs(s.price - store.price) < 0.01
        );

        if (!exists) {
          map[key].stores.push(store);
        }
      }

      // Keep promotional status if any version is promotional
      if (product.isPromotional) {
        map[key].isPromotional = true;
      }

      // Use better image if available
      if (product.image && !product.image.includes("placeholder")) {
        if (!map[key].image || map[key].image.includes("placeholder")) {
          map[key].image = product.image;
        }
      }

      // Keep brand if available
      if (product.brand && !map[key].brand) {
        map[key].brand = product.brand;
      }

      // Keep dates
      if (product.validFrom && !map[key].validFrom) {
        map[key].validFrom = product.validFrom;
      }
      if (product.validUntil && !map[key].validUntil) {
        map[key].validUntil = product.validUntil;
      }
      if (product.lastUpdated) {
        map[key].lastUpdated = product.lastUpdated;
      }
    } else {
      // New product
      map[key] = {
        ...product,
        id: `${key.replace(/[^a-z0-9]/g, "_")}_${Date.now()}_${i}`,
      };
    }

    // Progress indicator
    if ((i + 1) % 1000 === 0) {
      process.stdout.write(`   Processing: ${i + 1}/${products.length}\r`);
    }
  }

  console.log(`   Processing: ${products.length}/${products.length} ✅\n`);

  return Object.values(map);
}

// Merge products
console.log("🔀 Merging duplicate products...");
const startTime = Date.now();
const mergedProducts = mergeProducts(productsData);
const endTime = Date.now();

// Statistics with proper typing
const stats: MergeStats = {
  originalCount: productsData.length,
  mergedCount: mergedProducts.length,
  duplicatesRemoved: productsData.length - mergedProducts.length,
  totalStores: mergedProducts.reduce(
    (sum: number, p: Product) => sum + p.stores.length,
    0
  ),
  multiStoreProducts: mergedProducts.filter((p: Product) => p.stores.length > 1)
    .length,
  singleStoreProducts: mergedProducts.filter(
    (p: Product) => p.stores.length === 1
  ).length,
  processingTime: ((endTime - startTime) / 1000).toFixed(2),
};

// Save merged products
console.log("💾 Saving merged products...");
fs.writeFileSync(outputPath, JSON.stringify(mergedProducts, null, 2));
console.log("   ✅ Saved to products-merged.json\n");

// Display statistics
console.log("📊 Merge Statistics:");
console.log("─".repeat(50));
console.log(
  `   Original products:        ${stats.originalCount.toLocaleString()}`
);
console.log(
  `   Merged products:          ${stats.mergedCount.toLocaleString()}`
);
console.log(
  `   Duplicates removed:       ${stats.duplicatesRemoved.toLocaleString()}`
);
console.log(
  `   Total stores:             ${stats.totalStores.toLocaleString()}`
);
console.log(
  `   Multi-store products:     ${stats.multiStoreProducts.toLocaleString()}`
);
console.log(
  `   Single-store products:    ${stats.singleStoreProducts.toLocaleString()}`
);
console.log(`   Processing time:          ${stats.processingTime}s`);
console.log("─".repeat(50));

console.log("\n✅ Merge complete!\n");
console.log("📝 Next steps:");
console.log("   1. Check products-merged.json");
console.log("   2. Update your code to use products-merged.json");
console.log("   3. Test locally before deploying\n");

// Exit
process.exit(0);
