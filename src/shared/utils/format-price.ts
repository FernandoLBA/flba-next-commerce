import { appSettings } from "@/shared/constants/app.settings";

/**
 * Normaliza los montos para evitar errores con decimales
 * @param amount
 * @returns
 */
export const formatPrice = (amount: number) =>
  `${appSettings.CURRENCY.SYMBOL} ${amount.toFixed(2)}`;
