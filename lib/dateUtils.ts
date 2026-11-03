// Safe date formatting helpers that prevent hydration mismatches between SSR and Client

export function formatDateShort(dateStr: string): string {
  if (!dateStr) return "";
  // Check if YYYY-MM-DD
  const parts = dateStr.split("T")[0].split("-");
  if (parts.length === 3) {
    const [, mm, dd] = parts;
    return `${dd}/${mm}`;
  }
  return dateStr;
}

export function formatDateFull(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("T")[0].split("-");
  if (parts.length === 3) {
    const [yyyy, mm, dd] = parts;
    return `${dd}/${mm}/${yyyy}`;
  }
  return dateStr;
}

export function calculateDaysUntil(dateStr: string): { days: number; text: string; urgent: boolean } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parts = dateStr.split("T")[0].split("-");
  if (parts.length === 3) {
    const yyyy = parseInt(parts[0], 10);
    const mm = parseInt(parts[1], 10) - 1;
    const dd = parseInt(parts[2], 10);
    const target = new Date(yyyy, mm, dd, 0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return { days, text: "Prova realizada", urgent: false };
    } else if (days === 0) {
      return { days: 0, text: "É HOJE!", urgent: true };
    } else if (days === 1) {
      return { days: 1, text: "É AMANHÃ!", urgent: true };
    } else {
      return { days, text: `Faltam ${days} dias`, urgent: days <= 5 };
    }
  }

  return { days: 99, text: "", urgent: false };
}
