import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n";
import { useRestaurantData } from "@/lib/restaurant-context";

export function OrderDrawer() {
  const { lang } = useI18n();
  const { settings, isDishAvailable } = useRestaurantData();
  const { items, isOpen, setOpen, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore();
  if (!isOpen) return null;

  const isPt = lang === "pt";
  const total = totalPrice();
  const unavailableItems = items.filter((item) => !isDishAvailable(item.id));
  const canSend = Boolean(items.length) && !settings.isOnlineOrderingPaused && unavailableItems.length === 0;

  const send = () => {
    if (!canSend) return;

    const lines = items.map(
      (item) =>
        `• ${item.quantity}x ${item.name}${item.sizeName ? ` (${item.sizeName})` : ""} — ${(item.price * item.quantity).toFixed(2)}€`,
    );
    const intro = isPt
      ? "Olá! Gostaria de enviar este pedido para confirmação:"
      : "Hello! I would like to send this order for confirmation:";
    const note = isPt
      ? "O pedido fica sujeito a confirmação do restaurante."
      : "The order is subject to restaurant confirmation.";
    const text = `${intro}\n\n${lines.join("\n")}\n\nTotal: ${total.toFixed(2)}€\n\n${note}`;
    const number = settings.deliveryLinks.whatsapp.replace(/\D/g, "");

    trackEvent("order_send_whatsapp", {
      lang,
      item_count: items.reduce((sum, item) => sum + item.quantity, 0),
      distinct_items: items.length,
      total,
    });

    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="fixed inset-0 z-70 flex justify-end bg-black/70" onClick={() => setOpen(false)}>
      <aside
        className="h-full w-full max-w-md bg-brand-black border-l-4 border-black flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-2 border-line p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-brand-yellow" />
            <h2 className="font-display text-2xl uppercase">{isPt ? "O meu pedido" : "My order"}</h2>
          </div>
          <button onClick={() => setOpen(false)} aria-label={isPt ? "Fechar pedido" : "Close order"}>
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!items.length ? (
            <p className="text-muted">{isPt ? "O teu pedido está vazio." : "Your order is empty."}</p>
          ) : (
            items.map((item) => {
              const available = isDishAvailable(item.id);
              return (
                <div
                  key={`${item.id}-${item.sizeName || ""}`}
                  className={`rounded-xl border-2 bg-surface-card p-3 shadow-fastfood ${available ? "border-black" : "border-brand-red"}`}
                >
                  <div className="flex justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white">{item.name}</strong>
                        {!available && (
                          <span className="rounded bg-brand-red px-1.5 py-0.5 text-[10px] font-black uppercase text-white">
                            {isPt ? "Esgotado" : "Sold out"}
                          </span>
                        )}
                      </div>
                      {item.sizeName && <div className="text-xs text-muted">{item.sizeName}</div>}
                      <div className="font-bold text-brand-yellow">{item.price.toFixed(2)}€</div>
                    </div>
                    <button onClick={() => removeItem(item.id, item.sizeName)} aria-label={isPt ? "Remover" : "Remove"}>
                      <Trash2 className="size-4 text-brand-red" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.sizeName)}
                      className="size-8 rounded-md border border-line"
                    >
                      <Minus className="mx-auto size-3" />
                    </button>
                    <span className="min-w-6 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.sizeName)}
                      className="size-8 rounded-md border border-line"
                    >
                      <Plus className="mx-auto size-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t-2 border-line p-4 space-y-3">
          <div className="flex justify-between font-display text-2xl">
            <span>Total</span>
            <span>{total.toFixed(2)}€</span>
          </div>

          {settings.isOnlineOrderingPaused && (
            <div className="rounded-lg border border-brand-red bg-brand-red/10 p-3 text-sm text-white">
              {isPt ? settings.pausedNoticePt : settings.pausedNoticeEn}
            </div>
          )}

          {unavailableItems.length > 0 && (
            <div className="rounded-lg border border-brand-red bg-brand-red/10 p-3 text-sm text-white">
              {isPt
                ? "Um ou mais artigos ficaram esgotados. Retira-os do pedido antes de enviar."
                : "One or more items are now sold out. Remove them before sending the order."}
            </div>
          )}

          <div className="rounded-lg border-2 border-line bg-surface-card p-3 text-xs leading-relaxed text-cream/80">
            {isPt
              ? "Confirma os artigos e o total. Ao tocar em Enviar pedido, o pedido segue para o restaurante para confirmação."
              : "Check the items and total. Tap Send order to send the order to the restaurant for confirmation."}
          </div>

          <button
            disabled={!canSend}
            onClick={send}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-3 border-black bg-brand-red py-3 font-display text-xl font-black uppercase text-white shadow-fastfood disabled:opacity-40"
          >
            <Send className="size-5 text-brand-yellow" />
            {isPt ? "Enviar pedido" : "Send order"}
          </button>

          <p className="text-[11px] leading-relaxed text-muted">
            {isPt
              ? "O envio não confirma automaticamente o pedido. O restaurante confirma antes da preparação."
              : "Sending does not automatically confirm the order. The restaurant confirms it before preparation."}
          </p>

          {items.length > 0 && (
            <button onClick={clearCart} className="w-full text-xs text-muted hover:text-white">
              {isPt ? "Limpar pedido" : "Clear order"}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
