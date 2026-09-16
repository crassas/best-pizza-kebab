import React, { useState } from "react";
import { useRestaurantData } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";
import { ALL_DISHES } from "@/lib/restaurant";
import { compressImage } from "@/lib/image-utils";
import { uploadDishPhoto } from "@/lib/photo-storage";
import {
  Camera,
  ArrowLeft,
  Upload,
  RefreshCw,
  Check,
  RotateCcw,
} from "lucide-react";

interface PhotoManagerProps {
  onBack: () => void;
}

export function PhotoManager({ onBack }: PhotoManagerProps) {
  const { getDishImage, updateDishOverride, getDishName } = useRestaurantData();
  const { user } = useOwnerAuth();

  const [selectedDishId, setSelectedDishId] = useState<string>(ALL_DISHES[0]?.id || "");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedDish = ALL_DISHES.find((d) => d.id === selectedDishId);
  const currentDishImage = selectedDish ? getDishImage(selectedDish.id) : undefined;
  const currentDishName = selectedDish
    ? getDishName(selectedDish.id, selectedDish.name)
    : null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const compressedDataUrl = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: 900,
        quality: 0.85,
      });
      setPreviewImage(compressedDataUrl);
    } catch (err: any) {
      alert("Error processing photo: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedDishId || !previewImage) return;

    setIsSaving(true);
    try {
      const imageUrl = await uploadDishPhoto(selectedDishId, previewImage);
      await updateDishOverride(
        selectedDishId,
        { imageUrl },
        user?.email || undefined,
        `Updated photo for ${currentDishName?.en || selectedDishId}`
      );
      setSuccessMessage("Photo saved and published successfully!");
      setTimeout(() => setSuccessMessage(null), 3500);
      setPreviewImage(null);
    } catch (e: any) {
      alert("Failed to save photo: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestoreDefault = async () => {
    if (!selectedDishId) return;
    if (confirm("Restore the original default photo for this dish?")) {
      setIsSaving(true);
      try {
        await updateDishOverride(
          selectedDishId,
          { imageUrl: undefined },
          user?.email || undefined,
          `Restored default photo for ${currentDishName?.en || selectedDishId}`
        );
        setPreviewImage(null);
        setSuccessMessage("Restored default photo!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (e: any) {
        alert("Failed to restore: " + e.message);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-line bg-surface px-3 py-2 text-sm font-bold text-cream hover:border-brand-yellow"
          >
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </button>
          <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wide flex items-center gap-2">
            <Camera className="size-5 text-brand-yellow" />
            <span>Dish Photos Manager</span>
          </h2>
        </div>
      </div>

      {successMessage && (
        <div className="rounded-xl border-2 border-brand-green bg-brand-green/20 p-4 text-xs font-bold text-brand-green flex items-center gap-2">
          <Check className="size-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Upload Box */}
      <div className="rounded-2xl border-4 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood space-y-6">
        {/* Step 1: Select Dish */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
            1. Select Dish to Update Photo
          </label>
          <select
            value={selectedDishId}
            onChange={(e) => {
              setSelectedDishId(e.target.value);
              setPreviewImage(null);
            }}
            className="w-full rounded-xl border-2 border-line bg-surface px-4 py-3 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
          >
            {ALL_DISHES.map((d) => {
              const name = getDishName(d.id, d.name);
              return (
                <option key={d.id} value={d.id}>
                  {name.en} ({name.pt})
                </option>
              );
            })}
          </select>
        </div>

        {/* Current vs New Photo Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Current Photo */}
          <div className="rounded-xl border-2 border-line bg-surface p-4 text-center space-y-2">
            <span className="text-xs font-bold uppercase text-muted block">
              Current Live Photo
            </span>
            <div className="h-48 w-full rounded-lg bg-surface-card overflow-hidden border border-line flex items-center justify-center">
              {currentDishImage ? (
                <img
                  src={currentDishImage}
                  alt="Current"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-xs text-muted flex flex-col items-center gap-2">
                  <Camera className="size-8" />
                  <span>No custom photo set</span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRestoreDefault}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white font-bold pt-1"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset to Default Photo</span>
            </button>
          </div>

          {/* New Photo Preview */}
          <div className="rounded-xl border-2 border-brand-yellow/50 bg-brand-yellow/5 p-4 text-center space-y-2">
            <span className="text-xs font-bold uppercase text-brand-yellow block">
              New Photo Preview
            </span>
            <div className="h-48 w-full rounded-lg bg-surface-card overflow-hidden border border-dashed border-brand-yellow/50 flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="New Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-xs text-muted flex flex-col items-center gap-2 p-4">
                  <Upload className="size-8 text-brand-yellow" />
                  <span>Choose or take a photo below</span>
                </div>
              )}
            </div>
            {previewImage && (
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="text-xs text-brand-red hover:underline font-bold"
              >
                Cancel New Photo
              </button>
            )}
          </div>
        </div>

        {/* Step 2: Upload Action Buttons */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-black uppercase tracking-wider text-muted">
            2. Choose Image from Phone or Camera
          </label>

          <div className="flex flex-wrap gap-3">
            <label className="inline-flex items-center gap-2 rounded-xl border-3 border-black bg-brand-yellow px-5 py-3 font-display font-black text-sm text-black uppercase tracking-wider shadow-fastfood hover:bg-yellow-400 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all">
              <Camera className="size-5" />
              <span>{isProcessing ? "Optimizing..." : "Take Photo / Choose Image"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {previewImage && (
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSavePhoto}
                className="inline-flex items-center gap-2 rounded-xl border-3 border-black bg-brand-green px-6 py-3 font-display font-black text-sm text-white uppercase tracking-wider shadow-fastfood hover:bg-green-700 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="size-4 animate-spin" /> : <Check className="size-5" />}
                <span>{isSaving ? "Saving..." : "PUBLISH THIS PHOTO"}</span>
              </button>
            )}
          </div>

          <p className="text-xs text-muted">
            💡 Photos taken directly from modern smartphones are automatically resized and compressed for instant loading.
          </p>
        </div>
      </div>
    </div>
  );
}
