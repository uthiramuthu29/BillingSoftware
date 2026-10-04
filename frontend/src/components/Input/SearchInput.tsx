import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../../types';
import { dbService } from '../../services/database/dbService';

export interface SearchInputProps {
  onSelectProduct: (product: Product) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSelectProduct,
  placeholder = 'Scan Barcode / Search Product by Name, SKU, or Code... [Press F1]'
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadProducts = async () => {
    const list = await dbService.getProducts();
    setProducts(list);
  };

  useEffect(() => {
    loadProducts();
  }, [isOpen]);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase()) ||
          p.barcode.includes(query)
      )
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredProducts.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredProducts.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredProducts[selectedIndex]) {
        onSelectProduct(filteredProducts[selectedIndex]);
        setQuery('');
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative z-30 w-full">
      <div className="flex items-center bg-surface-container-low px-space-md py-2.5 rounded-lg gap-space-md focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_2px_rgba(0,81,213,0.3)] border border-surface-container-high transition-all">
        <span className="material-symbols-outlined text-secondary text-2xl">barcode_scanner</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDownInput}
          className="w-full bg-transparent outline-none font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant font-medium"
          placeholder={placeholder}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="p-1 rounded hover:bg-surface-container text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
        <div className="hidden sm:flex items-center gap-space-xs text-on-surface-variant whitespace-nowrap">
          <span className="font-label-sm text-label-sm">Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm font-semibold shadow-sm">
            Enter ↵
          </kbd>
          <span className="font-label-sm text-label-sm">to Add</span>
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-space-xs p-space-sm bg-surface-container-lowest rounded-xl shadow-xl flex flex-col gap-space-xs border border-surface-container-high">
          <div className="px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span>
              {filteredProducts.length} ITEMS FOUND FOR QUERY “{query}” (USE ↑ ↓ TO NAVIGATE)
            </span>
            <span className="text-secondary font-semibold">Ready to Scan</span>
          </div>

          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              onClick={() => handleSelect(product)}
              className={`flex items-center justify-between p-space-sm rounded-lg cursor-pointer transition-colors ${
                idx === selectedIndex ? 'bg-surface-container-low border border-secondary/30' : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-secondary font-bold">
                  {product.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    {product.name}
                  </span>
                  <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
                    <span className="font-numeric-table">SKU: {product.sku}</span>
                    <span>·</span>
                    <span className="text-on-tertiary-container font-semibold">
                      {product.stock} in stock
                    </span>
                    <span>·</span>
                    <span>GST: {product.gstRate}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-space-md">
                <span className="font-headline-md text-headline-md text-on-surface font-numeric-table font-bold">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="px-2 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold">
                  Select [Enter]
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
