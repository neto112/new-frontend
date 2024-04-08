import { format } from "date-fns";

export default function useComposable() {
  function formatTime(value: string | number | Date) {
    if (value) {
      const value2 = new Date(value);
      const date = new Date(
        Date.UTC(
          value2.getFullYear(),
          value2.getMonth(),
          value2.getDate(),
          value2.getHours(),
          value2.getMinutes(),
          value2.getSeconds()
        )
      );
      return format(date, "HH:mm");
    }
  }
  function formatPriceValue(value: number, locale = "pt-BR") {
    if (typeof value === "number") {
      return value.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return "0,00";
    }
  }

  return { formatTime, formatPriceValue };
}
