import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useOwnerAuth } from "@/lib/owner-auth";
import { LoginView } from "@/components/manage/login-view";
import { DashboardHome, type ManageTab } from "@/components/manage/dashboard-home";
import { FlashPromotionEditor } from "@/components/manage/flash-promotion-editor";
import { PromotionsList } from "@/components/manage/promotions-list";
import { MenuEditor } from "@/components/manage/menu-editor";
import { AvailabilityView } from "@/components/manage/availability-view";
import { PhotoManager } from "@/components/manage/photo-manager";
import { HoursEditor } from "@/components/manage/hours-editor";
import { DeliveryLinksEditor } from "@/components/manage/delivery-links-editor";
import { TickerEditor } from "@/components/manage/ticker-editor";
import { HistoryView } from "@/components/manage/history-view";
import { type Promotion } from "@/lib/restaurant-context";
import { ShieldCheck, LogOut, Globe } from "lucide-react";

export const Route = createFileRoute("/manage")({ component: ManagePage });

function ManagePage() {
  const { user, isAuthorized, isLoading, signOut } = useOwnerAuth();
  const [currentTab, setCurrentTab] = useState<ManageTab>("dashboard");
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  if (isLoading) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-white"><div className="text-center space-y-3"><div className="size-10 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto"/><p className="font-display font-bold text-lg uppercase tracking-wide">Loading Owner Management System...</p></div></div>;
  if (!user || !isAuthorized) return <LoginView />;

  return (
    <div className="min-h-screen bg-brand-black text-cream font-sans flex flex-col">
      <header className="sticky top-0 z-40 border-b-4 border-black bg-surface-card px-4 py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button type="button" onClick={() => setCurrentTab("dashboard")} className="flex items-center gap-2 group"><div className="size-9 rounded-lg bg-brand-red border-2 border-black flex items-center justify-center text-white font-bold shadow-sm">BP</div><div className="text-left hidden sm:block"><span className="font-display font-black text-base text-white uppercase tracking-wide block leading-none">Best Kebab &amp; Pizza</span><span className="text-[10px] font-bold text-brand-yellow uppercase tracking-wider">Owner Management System</span></div></button>
          <div className="flex items-center gap-2.5">
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-xs font-bold text-cream hover:border-brand-yellow transition-colors"><Globe className="size-3.5 text-brand-yellow"/><span className="hidden md:inline">View Website</span></Link>
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1.5 border border-line text-xs font-medium text-cream/90"><ShieldCheck className="size-4 text-brand-green"/><span className="truncate max-w-[150px]">{user.email}</span></div>
            <button type="button" onClick={() => signOut()} className="inline-flex items-center gap-1.5 rounded-lg border-2 border-line bg-surface px-2.5 py-1.5 text-xs font-bold text-muted hover:text-brand-red hover:border-brand-red transition-colors" title="Sign Out"><LogOut className="size-3.5"/><span className="hidden sm:inline">Sign Out</span></button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentTab === "dashboard" && <DashboardHome onNavigate={setCurrentTab} />}
        {currentTab === "new-promotion" && <FlashPromotionEditor initialData={editingPromotion} onBack={() => setCurrentTab("dashboard")} onSuccess={() => setCurrentTab("promotions")} />}
        {currentTab === "promotions" && <PromotionsList onBack={() => setCurrentTab("dashboard")} onNew={() => {setEditingPromotion(null);setCurrentTab("new-promotion");}} onEdit={(p) => {setEditingPromotion(p);setCurrentTab("new-promotion");}} />}
        {currentTab === "menu" && <MenuEditor onBack={() => setCurrentTab("dashboard")} />}
        {currentTab === "availability" && <AvailabilityView onBack={() => setCurrentTab("dashboard")} />}
        {currentTab === "photos" && <PhotoManager onBack={() => setCurrentTab("dashboard")} />}
        {currentTab === "hours" && <HoursEditor onBack={() => setCurrentTab("dashboard")} />}
        {currentTab === "delivery" && <DeliveryLinksEditor onBack={() => setCurrentTab("dashboard")} />}
        {currentTab === "ticker" && <TickerEditor onBack={() => setCurrentTab("dashboard")} />}
        {currentTab === "history" && <HistoryView onBack={() => setCurrentTab("dashboard")} />}
      </main>
      <footer className="border-t-2 border-line py-4 text-center text-xs text-muted">Best Kebab &amp; Pizza · Direct Owner Management System</footer>
    </div>
  );
}
