#!/usr/bin/env python3
"""
CSV to JSON Converter and Merger
Converts multiple CSV files (one per store) into merged products JSON
"""

import csv
import json
import os
from pathlib import Path
from datetime import datetime
import re

class CSVToJSONConverter:
    def __init__(self, csv_folder="data/csv", output_file="app/data/products.json"):
        self.csv_folder = Path(csv_folder)
        self.output_file = Path(output_file)
        self.products = []
        
    def extract_size(self, name):
        """Extract size from product name"""
        # Pattern for sizes: 1l, 2L, 500ml, 1kq, 100qr, etc.
        pattern = r'(\d+[\.,]?\d*)\s*(l|lt|litr|ml|kq|q|qr|qram|gr|gram|kg|əd|ədəd)'
        match = re.search(pattern, name, re.IGNORECASE)
        if match:
            return match.group(0)
        return ""
    
    def clean_price(self, price_str):
        """Clean and convert price string to float"""
        if not price_str:
            return 0.0
        
        # Remove currency symbols and extra spaces
        price_str = str(price_str).replace('₼', '').replace('AZN', '').strip()
        
        # Handle comma as decimal separator
        price_str = price_str.replace(',', '.')
        
        try:
            return float(price_str)
        except:
            return 0.0
    
    def clean_discount(self, discount_str):
        """Clean and convert discount string to float"""
        if not discount_str:
            return None
        
        discount_str = str(discount_str).replace('%', '').replace('-', '').strip()
        
        try:
            discount = float(discount_str)
            return discount if discount > 0 else None
        except:
            return None
    
    def parse_csv_file(self, csv_file, store_name):
        """Parse a single CSV file for one store"""
        print(f"   📄 Reading {csv_file.name}...")
        
        products_from_file = []
        
        with open(csv_file, 'r', encoding='utf-8') as f:
            # Try to detect the CSV format
            sample = f.read(1024)
            f.seek(0)
            
            # Detect delimiter
            sniffer = csv.Sniffer()
            try:
                delimiter = sniffer.sniff(sample).delimiter
            except:
                delimiter = ','
            
            reader = csv.DictReader(f, delimiter=delimiter)
            
            for row_num, row in enumerate(reader, start=2):
                try:
                    # Try to find column names (flexible matching)
                    name = None
                    category = None
                    price = None
                    discount = None
                    image = None
                    
                    # Find name column
                    for key in row.keys():
                        key_lower = key.lower()
                        if 'name' in key_lower or 'məhsul' in key_lower or 'ad' in key_lower:
                            name = row[key].strip()
                        elif 'category' in key_lower or 'kateqoriya' in key_lower:
                            category = row[key].strip()
                        elif 'price' in key_lower or 'qiymət' in key_lower or 'qiymet' in key_lower:
                            price = self.clean_price(row[key])
                        elif 'discount' in key_lower or 'endirim' in key_lower:
                            discount = self.clean_discount(row[key])
                        elif 'image' in key_lower or 'şəkil' in key_lower or 'sekil' in key_lower:
                            image = row[key].strip()
                    
                    # Skip if no name or price
                    if not name or price is None or price <= 0:
                        continue
                    
                    # Create product object
                    product = {
                        "id": f"{store_name.lower()}_{row_num}_{abs(hash(name)) % 10000000}",
                        "name": name,
                        "category": category or "Digər",
                        "image": image or "",
                        "isPromotional": bool(discount and discount > 0),
                        "lastUpdated": datetime.now().isoformat(),
                        "stores": [
                            {
                                "name": store_name,
                                "price": price,
                                "discount": discount,
                                "inStock": True,
                                "storeId": f"{store_name.lower()}_{abs(hash(name)) % 10000000}"
                            }
                        ]
                    }
                    
                    # Remove discount key if None
                    if discount is None:
                        del product["stores"][0]["discount"]
                    
                    products_from_file.append(product)
                    
                except Exception as e:
                    print(f"      ⚠️  Error on row {row_num}: {e}")
                    continue
        
        print(f"      ✅ Loaded {len(products_from_file):,} products from {store_name}")
        return products_from_file
    
    def detect_store_name(self, filename):
        """Detect store name from filename"""
        filename_lower = filename.lower()
        
        if 'araz' in filename_lower:
            return 'Araz'
        elif 'bravo' in filename_lower:
            return 'Bravo'
        elif 'bazarstore' in filename_lower or 'bazar' in filename_lower:
            return 'BazarStore'
        else:
            # Use filename without extension as store name
            return filename.replace('.csv', '').replace('_', ' ').title()
    
    def convert_all_csvs(self):
        """Convert all CSV files in the folder"""
        print("📥 Converting CSV files to JSON...\n")
        
        # Find all CSV files
        csv_files = list(self.csv_folder.glob("*.csv"))
        
        if not csv_files:
            print(f"❌ No CSV files found in {self.csv_folder}")
            print(f"   Please place your CSV files in: {self.csv_folder.absolute()}")
            return
        
        print(f"Found {len(csv_files)} CSV file(s):\n")
        
        total_products = 0
        
        for csv_file in csv_files:
            store_name = self.detect_store_name(csv_file.name)
            products = self.parse_csv_file(csv_file, store_name)
            self.products.extend(products)
            total_products += len(products)
        
        print(f"\n📊 Total products loaded: {total_products:,}\n")
    
    def save_json(self):
        """Save products to JSON file"""
        print(f"💾 Saving to {self.output_file}...")
        
        # Create directory if it doesn't exist
        self.output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(self.products, f, ensure_ascii=False, indent=2)
        
        print(f"   ✅ Saved {len(self.products):,} products to {self.output_file}\n")
    
    def show_sample(self):
        """Show sample of converted products"""
        if not self.products:
            return
        
        print("📝 Sample products:\n")
        
        for i, product in enumerate(self.products[:3], 1):
            print(f"   {i}. {product['name']}")
            print(f"      Category: {product['category']}")
            store = product['stores'][0]
            discount_str = f" (-{store.get('discount', 0):.0f}%)" if store.get('discount') else ""
            print(f"      Store: {store['name']} - {store['price']:.2f}₼{discount_str}")
            print()
    
    def run(self):
        """Run the complete conversion process"""
        print("="*60)
        print("📊 CSV TO JSON CONVERTER")
        print("="*60)
        print()
        
        # Convert CSVs
        self.convert_all_csvs()
        
        if not self.products:
            print("❌ No products were converted.\n")
            return
        
        # Show sample
        self.show_sample()
        
        # Save to JSON
        self.save_json()
        
        print("✅ CONVERSION COMPLETE!\n")
        print("📝 Next steps:")
        print(f"   1. Check the output: {self.output_file}")
        print("   2. Run the merge script: py scripts/merge_products.py --dry-run")
        print("   3. Review and merge duplicates\n")


def main():
    """Main function with flexible CSV folder detection"""
    import sys
    
    # Check for custom CSV folder argument
    if len(sys.argv) > 1:
        csv_folder = sys.argv[1]
    else:
        # Try common locations
        possible_folders = [
            "data/csv",
            "app/data/csv", 
            "csv",
            "downloads",
            "."  # Current directory
        ]
        
        csv_folder = None
        for folder in possible_folders:
            if Path(folder).exists() and list(Path(folder).glob("*.csv")):
                csv_folder = folder
                break
        
        if csv_folder is None:
            print("❌ No CSV files found!")
            print("\nPlease either:")
            print("   1. Place CSV files in: data/csv/")
            print("   2. Or run: py scripts/csv_to_json.py <path-to-csv-folder>")
            print("\nExample:")
            print("   py scripts/csv_to_json.py Downloads/")
            print()
            return
    
    converter = CSVToJSONConverter(csv_folder=csv_folder)
    converter.run()


if __name__ == "__main__":
    main()