
const maxAmount = 0xFFFFFF;

export function generateColors(nbColor: number) {
  const steps = maxAmount / nbColor;
  let color = 0;
  const res = [];
  for(let i = 0; i < nbColor; i++) {
    // Computes the next color
    color += steps;
    res.push(color);
  }
  return res;
}
