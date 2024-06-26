export const onSaveSVG = async (svgElement: SVGElement | null) => {
  if (!svgElement) return;
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const img = new Image();
  const svgBlob = new Blob([svgData], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(svgBlob);

  img.onload = function () {
    canvas.width = 256;
    canvas.height = 256;
    ctx.drawImage(img, 0, 0, 256, 256);
    const pngData = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngData;
    a.download = 'image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  img.src = url;
};
