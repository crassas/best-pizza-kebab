import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { copy, fill, weekdayName, type HoursStatus } from "@/lib/restaurant";
import {
  getManagedHoursStatus,
  useRestaurantData,
  type WeekHours,
} from "@/lib/restaurant-context";
import { cn } from "@/lib/utils";

const WEEK_DAYS: Array<{ key: keyof WeekHours; dayIndex: number }> = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 },
];

function useHoursStatus(openingHours: WeekHours) {
  const [status, setStatus] = useState<HoursStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getManagedHoursStatus(openingHours, new Date()));
    tick();
    const id = window.setInterval(tick, 30000);
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [openingHours]);

  return status;
}

function StatusLine({ status }: { status: HoursStatus }) {
  const { t } = useI18n();

  if (status.isOpen) {
    return (
      <p className="text-sm font-bold text-bolt" aria-live="polite">
        {t(copy.openNow)}
        <span className="font-medium text-cream/65">
          {" "}· {t(fill(copy.untilTime, { time: status.todayClose }))}
        </span>
      </p>
    );
  }

  const next = status.opensLaterToday
    ? t(fill(copy.opensAt, { time: status.nextOpenTime }))
    : t(
        fill(copy.opensDayAt, {
          day: t(weekdayName[status.nextOpenDay]),
          time: status.nextOpenTime,
        }),
      );

  return (
    <p className="text-sm text-cream/65" aria-live="polite">
      <span className="font-bold text-brand-yellow">{t(copy.closedNow)}</span> · {next}
    </p>
  );
}

export function HoursCompact({ className }: { className?: string }) {
  const { t } = useI18n();
  const { settings } = useRestaurantData();
  const status = useHoursStatus(settings.openingHours);
  if (!status) return null;

  return (
    <div className={cn("text-sm leading-relaxed text-cream/70", className)}>
      <p>
        {t(weekdayName[new Date().getDay()])}: {status.todayOpen}–{status.todayClose}
      </p>
      <StatusLine status={status} />
    </div>
  );
}

export function HoursBlock() {
  const { t, lang } = useI18n();
  const { settings } = useRestaurantData();
  const status = useHoursStatus(settings.openingHours);
  const isPt = lang === "pt";
  const today = new Date().getDay();

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md border-2 border-black bg-brand-yellow text-black shadow-xs">
            <Clock3 className="size-4" />
          </span>
          <p className="font-display text-xl uppercase tracking-wider text-white">
            {t(copy.hoursLabel)}
          </p>
        </div>
        {status && (
          <span
            className={cn(
              "rounded-full border-2 border-black px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-xs",
              status.isOpen ? "bg-bolt text-black" : "bg-brand-red text-white",
            )}
          >
            {status.isOpen ? t(copy.openNow) : t(copy.closedNow)}
          </span>
        )}
      </div>

      <dl className="mt-4 grid gap-1.5 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {WEEK_DAYS.map(({ key, dayIndex }) => {
          const day = settings.openingHours[key];
          const isToday = dayIndex === today;
          return (
            <div
              key={key}
              className={cn(
                "flex items-center justify-between gap-4 rounded-md border-2 px-3 py-2.5",
                isToday
                  ? "border-brand-yellow bg-brand-yellow/10"
                  : "border-line bg-black/20",
              )}
            >
              <dt className={cn("font-semibold", isToday ? "text-brand-yellow" : "text-cream/70")}>
                {t(weekdayName[dayIndex])}
              </dt>
              <dd className="tabular-nums font-bold tracking-wide text-white">
                {day.isClosed ? (isPt ? "Fechado" : "Closed") : `${day.open}–${day.close}`}
              </dd>
            </div>
          );
        })}
      </dl>

      {status && (
        <div className="mt-4 rounded-md border-2 border-black bg-black/30 px-3.5 py-3">
          <StatusLine status={status} />
        </div>
      )}
    </div>
  );
}
