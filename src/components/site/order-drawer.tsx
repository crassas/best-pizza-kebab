import { useState } from "react";
import { X, Plus, Minus, Trash2, Clock, User, MessageSquare, ArrowRight } from "lucide-react";
import { useOrder } from "@/lib/order-store";
import { useI18n } from "@/lib/i18n";
import { hoursForDay, lisbonClock } from "@/lib/restaurant";
import { formatEuro } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function OrderDrawer() {
  const {
    items,
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
  } = useOrder();
  const { t } = useI18n();

  const [nameError, setNameError] = useState(false);

  if (!isDrawerOpen) return null;

  const subtotal = items.reduce((acc, i) => acc + (i.price != null ? i.price * i.quantity : 0), 0);
  const hasPrices = items.some((i) => i.price != null);

  // Validate pickup time against opening hours
  const now = new Date();
  const { day } = lisbonClock(now);
  const todayHours = hoursForDay(day);
  
  // Check if pickupTime is within today's open and close
  const checkTimeValidity = (timeStr: string) => {
    if (!timeStr) return true;
    const [h, m] = timeStr.split(":").map(Number);
    const chosenMinutes = h * 60 + m;
    const [openH, openM] = todayHours.open.split(":").map(Number);
    const openMinutes = openH * 60 + openM;
    // Closing is 22:00
    const closeMinutes = 22 * 60;
    return chosenMinutes >= openMinutes && chosenMinutes <= closeMinutes;
  };

  const isTimeValid = pickupMode === "asap" || checkTimeValidity(pickupTime);

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    const url = getWhatsAppOrderUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="absolute inset-0"
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-md flex-col bg-surface shadow-2xl border-l border-line h-full z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 bg-bg">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-xl text-cream tracking-wide">
              {t({ pt: "O seu pedido", en: "Your order" })}
            </h2>
            <span className="rounded-full bg-orange/20 px-2.5 py-0.5 text-xs font-bold text-orange">
              {totalItemsCount}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="rounded-xs p-1 text-muted hover:bg-raised hover:text-cream transition-colors"
            aria-label={t({ pt: "Fechar", en: "Close" })}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-raised text-muted">
                <ShoppingCartIcon className="size-6" />
              </div>
              <p className="font-display text-lg text-cream">
                {t({ pt: "O seu pedido está vazio", en: "Your order is empty" })}
              </p>
              <p className="text-xs text-muted max-w-xs">
                {t({
                  pt: "Adicione pratos do menu para preparar o seu pedido de recolha em restaurante.",
                  en: "Add dishes from the menu to prepare your pickup order.",
                })}
              </p>
              <Button
                variant="primary"
                size="sm"
                className="mt-2 rounded-xs uppercase tracking-wider text-xs font-bold"
                onClick={() => setIsDrawerOpen(false)}
              >
                {t({ pt: "Ver menu", en: "View menu" })}
              </Button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-line pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    {t({ pt: "Itens selecionados", en: "Selected items" })}
                  </span>
                  <button
                    type="button"
                    onClick={clearOrder}
                    className="text-xs font-semibold text-orange hover:underline"
                  >
                    {t({ pt: "Limpar tudo", en: "Clear all" })}
                  </button>
                </div>

                <div className="divide-y divide-line/60">
                  {items.map((i) => {
                    const itemPrice = i.price != null ? formatEuro(i.price * i.quantity) : null;
                    return (
                      <div key={i.cartItemId} className="py-3 flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-sans text-sm font-bold text-cream truncate">
                            {t(i.name)}
                          </h4>
                          {i.size ? (
                            <p className="text-xs text-orange font-medium">
                              {t(i.size.label)}
                            </p>
                          ) : null}
                          {itemPrice ? (
                            <p className="text-xs font-semibold text-muted mt-0.5">{itemPrice}</p>
                          ) : null}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-bg border border-line rounded-xs p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(i.cartItemId, i.quantity - 1)}
                            className="size-7 flex items-center justify-center rounded-xs hover:bg-raised text-cream transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-cream">
                            {i.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(i.cartItemId, i.quantity + 1)}
                            className="size-7 flex items-center justify-center rounded-xs hover:bg-raised text-cream transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(i.cartItemId)}
                          className="text-muted hover:text-red-400 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {hasPrices && subtotal > 0 && (
                  <div className="flex items-center justify-between border-t border-line pt-3 text-sm font-bold text-cream">
                    <span>{t({ pt: "Subtotal estimado", en: "Estimated subtotal" })}</span>
                    <span className="text-orange">{formatEuro(subtotal)}</span>
                  </div>
                )}
              </div>

              {/* Customer Name */}
              <div className="space-y-2 border-t border-line pt-4">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cream">
                  <User className="size-3.5 text-orange" />
                  {t({ pt: "Nome para o pedido *", en: "Name for the order *" })}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (e.target.value.trim()) setNameError(false);
                  }}
                  placeholder={t({ pt: "Ex: João", en: "E.g. John" })}
                  className={`w-full rounded-xs border bg-bg px-3.5 py-2.5 text-sm text-cream placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-orange ${
                    nameError ? "border-red-500" : "border-line"
                  }`}
                />
                {nameError && (
                  <p className="text-xs text-red-400">
                    {t({ pt: "Por favor, indique o seu nome.", en: "Please enter your name." })}
                  </p>
                )}
              </div>

              {/* Pickup Time */}
              <div className="space-y-3 border-t border-line pt-4">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cream">
                  <Clock className="size-3.5 text-orange" />
                  {t({ pt: "Hora de levantamento", en: "Pickup time" })}
                </label>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPickupMode("asap")}
                    className={`rounded-xs border px-3 py-2 text-xs font-bold transition-colors ${
                      pickupMode === "asap"
                        ? "border-orange bg-orange/10 text-orange"
                        : "border-line bg-bg text-muted hover:border-line/80 hover:text-cream"
                    }`}
                  >
                    {t({ pt: "Assim que possível", en: "As soon as possible" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupMode("scheduled")}
                    className={`rounded-xs border px-3 py-2 text-xs font-bold transition-colors ${
                      pickupMode === "scheduled"
                        ? "border-orange bg-orange/10 text-orange"
                        : "border-line bg-bg text-muted hover:border-line/80 hover:text-cream"
                    }`}
                  >
                    {t({ pt: "Escolher hora", en: "Choose time" })}
                  </button>
                </div>

                {pickupMode === "scheduled" && (
                  <div className="space-y-1.5 pt-1">
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full rounded-xs border border-line bg-bg px-3.5 py-2 text-sm text-cream focus:outline-none focus:ring-1 focus:ring-orange"
                    />
                    {!isTimeValid && (
                      <p className="text-[11px] text-amber-400">
                        {t({
                          pt: "Aviso: Hora fora do horário habitual (11:00 – 22:00). O restaurante confirmará.",
                          en: "Note: Time outside usual hours (11:00 – 22:00). Restaurant will confirm.",
                        })}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2 border-t border-line pt-4">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cream">
                  <MessageSquare className="size-3.5 text-orange" />
                  {t({ pt: "Notas (opcional)", en: "Notes (optional)" })}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t({
                    pt: "Ex: sem cebola, molho picante à parte...",
                    en: "E.g. no onion, spicy sauce on the side...",
                  })}
                  className="w-full rounded-xs border border-line bg-bg px-3.5 py-2 text-sm text-cream placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-orange resize-none"
                />
              </div>

              {/* Notice */}
              <div className="rounded-xs bg-raised p-3 text-xs text-muted space-y-1 border border-line">
                <p className="font-semibold text-cream">
                  {t({ pt: "Como funciona o WhatsApp:", en: "How WhatsApp ordering works:" })}
                </p>
                <p>
                  {t({
                    pt: "O botão abaixo abrirá o WhatsApp com a mensagem estruturada pronta a enviar. O restaurante confirmará a disponibilidade e total final.",
                    en: "The button below opens WhatsApp with your structured message ready to send. The restaurant will confirm availability and final total.",
                  })}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="border-t border-line p-4 bg-bg">
            <Button
              variant="whatsapp"
              size="lg"
              className="w-full h-12 rounded-xs text-xs font-bold uppercase tracking-wider shadow-md"
              onClick={handleSendOrder}
            >
              <span>{t({ pt: "Enviar pedido pelo WhatsApp", en: "Send order via WhatsApp" })}</span>
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
