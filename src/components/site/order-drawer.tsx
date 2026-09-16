import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n";
import { useRestaurantData } from "@/lib/restaurant-context";

export function OrderDrawer() {
  const { lang } = useI18n();
  const { settings } = useRestaurantData();
  const { items, isOpen, setOpen, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore();
  if (!isOpen) return null;
  const isPt = lang === "pt";
  const total = totalPrice();
  const send = () => {
    if (settings.isOnlineOrderingPaused || !items.length) return;
    const lines = items.map(i => `• ${i.quantity}x ${i.name}${i.sizeName ? ` (${i.sizeName})` : ""} — ${(i.price*i.quantity).toFixed(2)}€`);
    const intro = isPt ? "Olá! Gostaria de enviar este pedido para confirmação:" : "Hello! I would like to send this order for confirmation:";
    const note = isPt ? "O pedido fica sujeito a confirmação do restaurante." : "The order is subject to restaurant confirmation.";
    const text = `${intro}\n\n${lines.join("\n")}\n\nTotal: ${total.toFixed(2)}€\n\n${note}`;
    const number = settings.deliveryLinks.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  return <div className="fixed inset-0 z-70 flex justify-end bg-black/70" onClick={()=>setOpen(false)}>
    <aside className="h-full w-full max-w-md bg-brand-black border-l-4 border-black flex flex-col" onClick={e=>e.stopPropagation()}>
      <div className="flex items-center justify-between border-b-2 border-line p-4"><div className="flex items-center gap-2"><ShoppingBag className="size-5 text-brand-yellow"/><h2 className="font-display text-2xl uppercase">{isPt?"O meu pedido":"My order"}</h2></div><button onClick={()=>setOpen(false)} aria-label="Close"><X/></button></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">{!items.length?<p className="text-muted">{isPt?"O teu pedido está vazio.":"Your order is empty."}</p>:items.map(i=><div key={`${i.id}-${i.sizeName||""}`} className="rounded-xl border-2 border-black bg-surface-card p-3 shadow-fastfood"><div className="flex justify-between gap-2"><div><strong className="text-white">{i.name}</strong>{i.sizeName&&<div className="text-xs text-muted">{i.sizeName}</div>}<div className="font-bold text-brand-yellow">{i.price.toFixed(2)}€</div></div><button onClick={()=>removeItem(i.id,i.sizeName)} aria-label="Remove"><Trash2 className="size-4 text-brand-red"/></button></div><div className="mt-3 flex items-center gap-2"><button onClick={()=>updateQuantity(i.id,i.quantity-1,i.sizeName)} className="size-8 rounded-md border border-line"><Minus className="mx-auto size-3"/></button><span className="min-w-6 text-center font-bold">{i.quantity}</span><button onClick={()=>updateQuantity(i.id,i.quantity+1,i.sizeName)} className="size-8 rounded-md border border-line"><Plus className="mx-auto size-3"/></button></div></div>)}</div>
      <div className="border-t-2 border-line p-4 space-y-3"><div className="flex justify-between font-display text-2xl"><span>Total</span><span>{total.toFixed(2)}€</span></div>{settings.isOnlineOrderingPaused&&<div className="rounded-lg border border-brand-red bg-brand-red/10 p-3 text-sm text-white">{isPt?settings.pausedNoticePt:settings.pausedNoticeEn}</div>}<p className="text-xs text-muted">{isPt?"O pedido será enviado ao restaurante para confirmação.":"Your order will be sent to the restaurant for confirmation."}</p><button disabled={!items.length||settings.isOnlineOrderingPaused} onClick={send} className="w-full rounded-xl border-3 border-black bg-brand-yellow py-3 font-display text-xl font-black uppercase text-black shadow-fastfood disabled:opacity-40">{isPt?"Enviar pedido":"Send order"}</button>{items.length>0&&<button onClick={clearCart} className="w-full text-xs text-muted hover:text-white">{isPt?"Limpar pedido":"Clear order"}</button>}</div>
    </aside>
  </div>;
}
