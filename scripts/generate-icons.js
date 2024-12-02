const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#4F46E5'; // Indigo color
  ctx.fillRect(0, 0, size, size);

  // Receipt icon
  ctx.fillStyle = '#FFFFFF';
  const padding = size * 0.2;
  const receiptWidth = size - (padding * 2);
  const receiptHeight = size - (padding * 2);
  
  // Draw receipt paper
  ctx.fillRect(padding, padding, receiptWidth, receiptHeight);
  
  // Draw receipt lines
  ctx.fillStyle = '#E5E7EB';
  const lineHeight = size * 0.08;
  const lineGap = size * 0.12;
  const startY = padding + (size * 0.2);
  
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      padding + (size * 0.15),
      startY + (i * lineGap),
      receiptWidth - (size * 0.3),
      lineHeight
    );
  }

  return canvas.toBuffer('image/png');
}

const sizes = [192, 512];

sizes.forEach(size => {
  const buffer = generateIcon(size);
  const filePath = path.join(__dirname, '..', 'public', `icon-${size}x${size}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated ${size}x${size} icon`);
});
