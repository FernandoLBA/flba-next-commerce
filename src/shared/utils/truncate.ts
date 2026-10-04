/**
 * Recorta las palabras según un límite y le agrega al final "..."
 * @param text
 * @param max
 * @returns
 */
export const truncate = (text: string, max = 155) => {
  const clean = text.replace(/\s+/g, " ").trim();

  if (clean.length <= max) return clean;

  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}...`;
};
