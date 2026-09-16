import React, { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Search, XCircle } from "lucide-react";
import { ALL_DISHES, CATEGORIES, type MenuItem } from "@/lib/restaurant";
import { useRestaurantData, type DishOverride } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";

export function MenuEditor({ onBack }: { onBack: () => void }) {
  const { user } = useOwnerAuth();
  const { getDishPrice, getDishSizePrice, isDishAvailable, getDishName, getDishDescription, updateDishOverride } = useRestaurantData();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [price, setPrice] = useState("");
  const [sizePrices, setSizePrices] = useState<Record<string,string>>({});
  const [available, setAvailable] = useState(true);
  const [namePt, setNamePt] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descPt, setDescPt] = useState("");
  const [descEn, setDescEn] = useState("");
  const [saving, setSaving] = useState(false);

  const items = useMemo(() => ALL_DISHES.filter((d) => {
    const n = getDishName(d.id, d.name);
    const q = query.trim().toLowerCase();
    return (category === "all" || d.categoryId === category) && (!q || n.pt.toLowerCase().includes(q) || n.en.toLowerCase().includes(q));
  }), [category, query, getDishName]);

  const open = (d: MenuItem) => {
    const n = getDishName(d.id, d.name); const ds = getDishDescription(d.id, d.description);
    setEditing(d); setPrice(String(getDishPrice(d.id,d.price) ?? "")); setAvailable(isDishAvailable(d.id));
    setNamePt(n.pt); setNameEn(n.en); setDescPt(ds?.pt ?? ""); setDescEn(ds?.en ?? "");
    setSizePrices(Object.fromEntries((d.sizes ?? []).map(s => [s.id, String(getDishSizePrice(d.id,s.id,s.price) ?? "")] )));
  };

  const save = async () => {
    if (!editing) return; setSaving(true);
    try {
      const override: Partial<DishOverride> = {
        isAvailable: available,
        namePt: namePt.trim() || undefined,
        nameEn: nameEn.trim() || undefined,
        descriptionPt: descPt.trim() || undefined,
        descriptionEn: descEn.trim() || undefined,
      };
      if (editing.sizes?.length) override.sizePrices = Object.fromEntries(editing.sizes.map(s => [s.id, sizePrices[s.id]?.trim() ? Number(sizePrices[s.id]) : null]));
      else override.price = price.trim() ? Number(price) : null;
      await updateDishOverride(editing.id, override, user?.email || undefined, `Updated ${editing.name.en}`);
      setEditing(null);
    } catch (e:any) { alert(e?.message || "Failed to save"); } finally { setSaving(false); }
  };

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3"><button onClick={onBack} className="rounded-lg border-2 border-line bg-surface px-3 py-2 text-sm font-bold"><ArrowLeft className="inline size-4 mr-1"/>Back</button><h2 className="font-display text-2xl font-black uppercase">Menu & Prices</h2></div>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes" className="rounded-lg border-2 border-line bg-surface-card pl-9 pr-3 py-2 text-sm"/></div>
    </div>
    <div className="flex gap-2 overflow-x-auto pb-1"><button onClick={()=>setCategory("all")} className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold ${category==="all"?"bg-brand-yellow text-black":"bg-surface"}`}>All</button>{CATEGORIES.map(c=><button key={c.id} onClick={()=>setCategory(c.id)} className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold ${category===c.id?"bg-brand-yellow text-black":"bg-surface"}`}>{c.label.en}</button>)}</div>
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{items.map(d=>{const n=getDishName(d.id,d.name);const ok=isDishAvailable(d.id);const p=d.sizes?.length?d.sizes.map(s=>getDishSizePrice(d.id,s.id,s.price)).filter(v=>v!=null).map(v=>`${Number(v).toFixed(2)}€`).join(" / "):(getDishPrice(d.id,d.price)!=null?`${Number(getDishPrice(d.id,d.price)).toFixed(2)}€`:"—");return <button key={d.id} onClick={()=>open(d)} className="text-left rounded-xl border-2 border-black bg-surface-card p-4 shadow-fastfood"><div className="flex justify-between gap-2"><strong className="text-white">{n.en}</strong><span className={`text-[10px] font-black ${ok?"text-brand-green":"text-brand-red"}`}>{ok?<><CheckCircle2 className="inline size-3"/> AVAILABLE</>:<><XCircle className="inline size-3"/> SOLD OUT</>}</span></div><div className="mt-2 font-display text-xl text-brand-yellow">{p}</div></button>})}</div>
    {editing && <div className="fixed inset-0 z-60 bg-black/90 p-4 overflow-y-auto"><div className="mx-auto mt-8 max-w-xl rounded-2xl border-4 border-black bg-surface-card p-5 space-y-4"><h3 className="font-display text-2xl uppercase">Edit {editing.name.en}</h3>
      {editing.sizes?.length ? <div className="grid grid-cols-2 gap-2">{editing.sizes.map(s=><label key={s.id} className="text-xs">{s.label.en}<input type="number" step="0.01" value={sizePrices[s.id]??""} onChange={e=>setSizePrices(v=>({...v,[s.id]:e.target.value}))} className="mt-1 w-full rounded-lg border border-line bg-surface p-2"/></label>)}</div> : <label className="text-xs">Price<input type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} className="mt-1 w-full rounded-lg border border-line bg-surface p-2"/></label>}
      <label className="flex items-center justify-between rounded-lg bg-surface p-3"><span className="font-bold">Available</span><input type="checkbox" checked={available} onChange={e=>setAvailable(e.target.checked)} className="size-5"/></label>
      <div className="grid sm:grid-cols-2 gap-2"><input value={nameEn} onChange={e=>setNameEn(e.target.value)} placeholder="English name" className="rounded-lg border border-line bg-surface p-2"/><input value={namePt} onChange={e=>setNamePt(e.target.value)} placeholder="Portuguese name" className="rounded-lg border border-line bg-surface p-2"/></div>
      <textarea rows={2} value={descEn} onChange={e=>setDescEn(e.target.value)} placeholder="English description" className="w-full rounded-lg border border-line bg-surface p-2"/><textarea rows={2} value={descPt} onChange={e=>setDescPt(e.target.value)} placeholder="Portuguese description" className="w-full rounded-lg border border-line bg-surface p-2"/>
      <div className="flex justify-end gap-2"><button onClick={()=>setEditing(null)} className="rounded-lg border-2 border-line px-4 py-2">Cancel</button><button disabled={saving} onClick={save} className="rounded-lg border-2 border-black bg-brand-yellow px-5 py-2 font-black text-black">{saving?"Saving…":"Save changes"}</button></div>
    </div></div>}
  </div>;
}
