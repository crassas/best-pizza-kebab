import { ShoppingBag, ArrowRight } from "lucide-react";
import { useOrder } from "@/lib/order-store";
import { useI18n } from "@/lib/i18n";
import { formatEuro } from "@/lib/utils";

export function OrderBar() {
  const { totalItemsCount, items, setIsDrawerOpen } = useOrder();
  const { t } = useI18n();

  if (totalItemsCount === 0) return null;

  const subtotal = items.reduce((acc, i) => acc + (i.price != null ? i.price * i.quantity : 0), 0);
  const hasPrices = items.some((i) => i.price != null);

  return (
    <div className="fixed inset-x-0 bottom-14 md:bottom-0 z-30 p-3 bg-surface/95 backdrop-blur-md border-t border-line shadow-2xl animate-in slide-in-from-bottom duration-200">
      <div className="mx-auto max-w-4xl flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xs bg-orange text-white font-bold text-sm shadow-sm">
            <ShoppingBag className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cream">
              {t({
                pt: `${totalItemsCount} ${totalItemsCount === 1 ? "item no pedido" : "itens no pedido"}`,
                en: `${totalItemsCount} ${totalItemsCount === 1 ? "item in order" : "items in order"}`,
              })}
            </p>
            {hasPrices && subtotal > 0 && (
              <p className="text-xs font-medium text-muted">
                {t({ pt: "Subtotal:", en: "Subtotal:" })} <span className="text-cream font-bold">{formatEuro(subtotal)}</span>
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 rounded-xs bg-orange hover:bg-orange-hot px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer shadow-sm"
        >
          <span>{t({ pt: "Ver pedido", en: "View order" })}</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
