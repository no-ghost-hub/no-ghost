export const burn = ({
  previewCanvas,
  canvas,
  x,
  y,
  color,
  tolerance,
}: {
  previewCanvas: HTMLCanvasElement;
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  color: [number, number, number];
  tolerance: number;
}) => {
  const previewCtx = previewCanvas.getContext("2d");
  const ctx = canvas.getContext("2d");
  if (!ctx || !previewCtx) return;

  const previewData = previewCtx.getImageData(
    0,
    0,
    previewCanvas.width,
    previewCanvas.height,
  );
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const targetColor = getPixelColor(previewData.data, x, y, previewData.width);

  applyGlobalFill(targetColor, color, tolerance, previewData.data);
  applyGlobalFill(targetColor, color, tolerance, data.data);
  previewCtx.putImageData(previewData, 0, 0);
  ctx.putImageData(data, 0, 0);
};

const getPixelColor = (
  pixels: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
): [number, number, number] => [
  pixels[(y * width + x) * 4],
  pixels[(y * width + x) * 4 + 1],
  pixels[(y * width + x) * 4 + 2],
];

const colorMatches = (
  c1: [number, number, number],
  c2: [number, number, number],
  tolerance: number,
): boolean => c1.every((v, i) => Math.abs(v - c2[i]) <= tolerance);

const applyGlobalFill = (
  targetColor: [number, number, number],
  fillColor: [number, number, number],
  tolerance: number,
  pixels: Uint8ClampedArray,
) => {
  for (let i = 0; i < pixels.length; i += 4) {
    const pixelColor: [number, number, number] = [
      pixels[i],
      pixels[i + 1],
      pixels[i + 2],
    ];
    if (colorMatches(pixelColor, targetColor, tolerance)) {
      [pixels[i], pixels[i + 1], pixels[i + 2]] = fillColor;
    }
  }
};
