import { useEffect, useRef, useState } from "react";
import { Globe, RefreshCw } from "lucide-react";
import { restaurant } from "@/lib/restaurant";
import { cn } from "@/lib/utils";

export function CesiumGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lat = restaurant.geo.lat;
  const lng = restaurant.geo.lng;

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    let viewer: any = null;
    let isCancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    async function initCesium() {
      try {
        const Cesium = await import("cesium");
        if (isCancelled) return;

        (window as any).CESIUM_BASE_URL = "https://cesium.com/downloads/cesiumjs/releases/1.116/Build/Cesium/";

        const token = import.meta.env.VITE_CESIUM_TOKEN;
        if (token) {
          Cesium.Ion.defaultAccessToken = token;
        }

        if (!containerRef.current) return;

        const dummyCreditContainer = document.createElement("div");
        dummyCreditContainer.style.display = "none";

        viewer = new Cesium.Viewer(containerRef.current, {
          animation: false,
          baseLayerPicker: false,
          fullscreenButton: false,
          vrButton: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          sceneModePicker: false,
          selectionIndicator: false,
          timeline: false,
          navigationHelpButton: false,
          navigationInstructionsInitiallyVisible: false,
          creditContainer: dummyCreditContainer,
          scene3DOnly: true,
        });

        if (viewer.creditContainer) {
          (viewer.creditContainer as HTMLElement).style.display = "none";
        }
        if (viewer.bottomContainer) {
          (viewer.bottomContainer as HTMLElement).style.display = "none";
        }

        // Clean up any dynamic credit/warning text nodes in container
        const purgeCreditNodes = () => {
          if (!containerRef.current) return;
          const nodes = containerRef.current.querySelectorAll(
            ".cesium-widget-credits, .cesium-credit-textContainer, .cesium-credit-logoContainer, .cesium-credit-expand-link, .cesium-viewer-bottom, .cesium-viewer-toolbar, [class*='credit']"
          );
          nodes.forEach((node) => node.remove());
        };

        purgeCreditNodes();
        const observer = new MutationObserver(purgeCreditNodes);
        if (containerRef.current) {
          observer.observe(containerRef.current, { childList: true, subtree: true });
        }

        // Focused street-level 3D view on restaurant location
        const targetDestination = Cesium.Cartesian3.fromDegrees(lng, lat, 350);
        const targetOrientation = {
          heading: Cesium.Math.toRadians(15.0),
          pitch: Cesium.Math.toRadians(-35.0),
          roll: 0.0,
        };

        viewer.camera.setView({
          destination: targetDestination,
          orientation: targetOrientation,
        });

        // Ensure canvas respects container dimensions immediately
        viewer.resize();

        // Observe container size changes for perfect responsiveness
        resizeObserver = new ResizeObserver(() => {
          if (viewer && !viewer.isDestroyed()) {
            viewer.resize();
          }
        });
        resizeObserver.observe(containerRef.current);

        viewer.entities.add({
          name: restaurant.name,
          position: Cesium.Cartesian3.fromDegrees(lng, lat, 5),
          point: {
            pixelSize: 14,
            color: Cesium.Color.fromCssColorString("#f97316"),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 3,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
          },
          label: {
            text: restaurant.name,
            font: "bold 13px sans-serif",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.fromCssColorString("#0f172a"),
            outlineWidth: 3,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -22),
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
          },
        });

        if (!isCancelled) {
          viewerRef.current = viewer;
          setIsLoaded(true);
        } else if (viewer && !viewer.isDestroyed()) {
          viewer.destroy();
        }
      } catch (err: any) {
        console.error("Failed to initialize Cesium Viewer:", err);
        if (!isCancelled) {
          setError(err?.message || "Failed to initialize 3D Globe");
        }
      }
    }

    initCesium();

    return () => {
      isCancelled = true;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [isClient, lat, lng]);

  const handleResetView = () => {
    if (!viewerRef.current || viewerRef.current.isDestroyed()) return;
    viewerRef.current.camera.flyTo({
      destination: (window as any).Cesium
        ? (window as any).Cesium.Cartesian3.fromDegrees(lng, lat, 350)
        : undefined,
      orientation: {
        heading: (window as any).Cesium ? (window as any).Cesium.Math.toRadians(15.0) : 0,
        pitch: (window as any).Cesium ? (window as any).Cesium.Math.toRadians(-35.0) : -45,
        roll: 0.0,
      },
      duration: 1.0,
    });
  };

  return (
    <div className={cn("relative flex flex-col overflow-hidden rounded-xs border border-line bg-surface min-h-[360px] lg:min-h-[460px]", className)}>
      <style>{`
        .cesium-widget-credits,
        .cesium-credit-textContainer,
        .cesium-credit-logoContainer,
        .cesium-credit-expand-link,
        .cesium-viewer-bottom,
        .cesium-viewer-toolbar,
        .cesium-navigation-help,
        .cesium-selection-wrapper,
        .cesium-infoBox,
        .cesium-viewer-animationContainer,
        .cesium-viewer-timelineContainer {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>

      {/* Globe Header */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 z-10">
        <div className="flex items-center gap-2 min-w-0">
          <Globe className="size-4 shrink-0 text-orange animate-spin-slow" />
          <p className="truncate text-xs font-bold text-cream sm:text-sm">
            {restaurant.name} · Globo 3D Cesium
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isLoaded && (
            <button
              type="button"
              onClick={handleResetView}
              className="inline-flex items-center gap-1 rounded bg-cream/10 px-2.5 py-1 text-xs font-semibold text-cream hover:bg-cream/20 transition-colors cursor-pointer"
              title="Centrar no Restaurante"
            >
              <RefreshCw className="size-3" />
              <span>Centrar</span>
            </button>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapsQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-wider text-orange hover:text-orange-hot transition-colors"
          >
            Google Maps
          </a>
        </div>
      </div>

      {/* Cesium Container */}
      <div className="relative flex-1 w-full bg-bg">
        <div ref={containerRef} className="absolute inset-0 size-full" />
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 p-6 text-center">
            <p className="text-sm font-bold text-red-400">Erro ao carregar o globo 3D Cesium</p>
            <p className="mt-1 text-xs text-muted max-w-sm">{error}</p>
            <p className="mt-3 text-xs text-faint">Verifique se o seu VITE_CESIUM_TOKEN está definido corretamente nas configurações do ambiente.</p>
          </div>
        )}

        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/80 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-medium text-cream">
              <div className="size-4 animate-spin rounded-full border-2 border-orange border-t-transparent" />
              <span>A carregar Cesium 3D Globe...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
