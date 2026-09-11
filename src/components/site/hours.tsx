import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  copy,
  fill,
  getHoursStatus,
  restaurant,
  weekdayName,
  type HoursStatus,
} from "@/lib/restaurant";
import { cn } from "@/lib/utils";

function useHoursStatus() {
  const [status, setStatus] = useState<HoursStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getHoursStatus(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return status;
}

function StatusLine({ status }: { status: HoursStatus }) {
  const { t } = useI18n();

  if (status.isOpen) {
    return (
      <p className="text-sm font-medium text-orange" aria-live="polite">
        {t(copy.openNow)}
        <span className="text-muted">
          {" · "}
          {t(fill(copy.untilTime, { time: status.todayClose }))}
        </span>
      </p>
    );
  }

  const next =
    status.opensLaterToday
      ? t(fill(copy.opensAt, { time: status.nextOpenTime }))
      : t(
          fill(copy.opensDayAt, {
            day: t(weekdayName[status.nextOpenDay]),
            time: status.nextOpenTime,
          }),
        );

  return (
    <p className="text-sm text-muted" aria-live="polite">
      <span className="font-medium text-cream/80">{t(copy.closedNow)}</span>
      {" · "}
      {next}
    </p>
  );
}

export function HoursCompact({ className }: { className?: string }) {
  const { t } = useI18n();
  const status = useHoursStatus();
  const satThu = restaurant.hoursNotice[0];
  const fri = restaurant.hoursNotice[1];

  return (
    <div className={cn("text-sm leading-relaxed text-muted", className)}>
      <p>
        {t(satThu.labelShort)} {satThu.open}–{satThu.close}
        <span aria-hidden="true"> · </span>
        {t(fri.labelShort)} {fri.open}–{fri.close}
      </p>
      {status ? <StatusLine status={status} /> : null}
    </div>
  );
}

export function HoursBlock() {
  const { t } = useI18n();
  const status = useHoursStatus();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">
        {t(copy.hoursLabel)}
      </p>
      <dl className="mt-3 max-w-sm space-y-1.5 text-cream">
        {restaurant.hoursNotice.map((block) => (
          <div
            key={block.open + block.label.pt}
            className="flex items-baseline justify-between gap-6"
          >
            <dt className="text-muted">{t(block.label)}</dt>
            <dd className="tabular-nums tracking-wide">
              {block.open}–{block.close}
            </dd>
          </div>
        ))}
      </dl>
      {status ? (
        <div className="mt-3">
          <StatusLine status={status} />
        </div>
      ) : null}
    </div>
  );
}
