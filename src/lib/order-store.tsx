import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuItem, MenuSize, Localized } from "./restaurant";

export type OrderItem = {
  cartItemId: string; // unique id combining item.id and size?.id
  itemId: string;
  name: Localized;
  price: number | null;
  size?: MenuSize;
  quantity: number;
};

type OrderContextType = {
  items: OrderItem[];
  addItem: (item: MenuItem, size?: MenuSize) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearOrder: () => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  pickupMode: "asap" | "scheduled";
  setPickupMode: (mode: "asap" | "scheduled") => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  totalItemsCount: number;
  getWhatsAppOrderUrl: () => string;
};

const STORAGE_KEY = "best-pizza-kebab:order:v1";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [pickupMode, setPickupMode] = useState<"asap" | "scheduled">("asap");
  const [pickupTime, setPickupTime] = useState("19:30");
  const [notes, setNotes] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (typeof parsed.customerName === "string") setCustomerName(parsed.customerName);
        if (parsed.pickupMode === "asap" || parsed.pickupMode === "scheduled") setPickupMode(parsed.pickupMode);
        if (typeof parsed.pickupTime === "string") setPickupTime(parsed.pickupTime);
        if (typeof parsed.notes === "string") setNotes(parsed.notes);
      }
    } catch {
      // ignore storage errors
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items,
          customerName,
          pickupMode,
          pickupTime,
          notes,
        })
      );
    } catch {
      // ignore
    }
  }, [items, customerName, pickupMode, pickupTime, notes, isInitialized]);

  const addItem = (item: MenuItem, size?: MenuSize) => {
    const cartItemId = size ? `${item.id}-${size.id}` : item.id;
    const itemPrice = size ? size.price : item.price;

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          itemId: item.id,
          name: item.name,
          price: itemPrice,
          size,
          quantity: 1,
        },
      ];
    });

    // Open the order drawer/sidebar so user immediately sees their cart and can proceed
    setIsDrawerOpen(true);
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: qty } : i))
    );
  };

  const clearOrder = () => {
    setItems([]);
    setCustomerName("");
    setPickupMode("asap");
    setNotes("");
  };

  const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const getWhatsAppOrderUrl = () => {
    const lines: string[] = [];
    lines.push("Hello! I would like to place a pickup order from the BEST PIZZA & KEBAB website.");
    lines.push("");
    lines.push("ORDER");
    items.forEach((i) => {
      const sizeStr = i.size ? ` (${i.size.label.en})` : "";
      const priceStr = i.price != null ? ` — €${(i.price * i.quantity).toFixed(2)}` : "";
      lines.push(`${i.quantity} × ${i.name.en}${sizeStr}${priceStr}`);
    });
    lines.push("");
    lines.push("REQUESTED PICKUP");
    if (pickupMode === "asap") {
      lines.push("As soon as possible — please confirm.");
    } else {
      lines.push(`${pickupTime} — please confirm.`);
    }

    if (customerName.trim()) {
      lines.push("");
      lines.push("NAME");
      lines.push(customerName.trim());
    }

    if (notes.trim()) {
      lines.push("");
      lines.push("NOTES");
      lines.push(notes.trim());
    }

    lines.push("");
    lines.push("Please confirm availability, pickup time and final total before payment.");
    lines.push("Thank you.");

    const text = lines.join("\n");
    const phone = "351920163613";
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        customerName,
        setCustomerName,
        pickupMode,
        setPickupMode,
        pickupTime,
        setPickupTime,
        notes,
        setNotes,
        isDrawerOpen,
        setIsDrawerOpen,
        totalItemsCount,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
