/**
 * Esta función recibe el precio base más el porcentaje de descuento
 * y retorna el precio son el porcentaje sumado.
 * @param base
 * @param percentage
 * @returns
 */
export function addPercentage(base: number, percentage: number) {
  return (base + base * ((1 * percentage) / 100)).toFixed(2);
}
