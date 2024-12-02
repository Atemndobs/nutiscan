import { createWorker } from 'tesseract.js';

export async function scanReceipt(imageFile: File): Promise<string> {
  const worker = await createWorker('deu');
  
  try {
    const { data: { text } } = await worker.recognize(imageFile);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error('Error scanning receipt:', error);
    await worker.terminate();
    throw error;
  }
}

export function parseReceiptText(text: string) {
  // This is a simple example - you'd want to enhance this based on specific receipt formats
  const lines = text.split('\n');
  const items: Array<{name: string, price: string}> = [];
  
  for (const line of lines) {
    const match = line.match(/([A-Za-z\s]+)\s+(\d+[.,]\d{2})/);
    if (match) {
      items.push({
        name: match[1].trim(),
        price: match[2]
      });
    }
  }
  
  return items;
}