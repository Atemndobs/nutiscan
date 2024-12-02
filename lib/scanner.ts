import { createWorker } from 'tesseract.js';
import { v4 as uuidv4 } from 'uuid';

export interface ScannedItem {
  id: string;
  name: string;
  calories: number;
  price?: number;
  category?: string;
}

export async function processReceipt(imageData: string): Promise<ScannedItem[]> {
  const text = await scanReceipt(imageData);
  return parseReceiptText(text);
}

export async function scanReceipt(imageData: string): Promise<string> {
  const worker = await createWorker();
  try {
    console.log('[Scanner:lib] Starting OCR', {
      imageDataLength: imageData.length,
      isBase64: imageData.startsWith('data:image')
    });

    // Only load language, initialization is no longer needed
    await (worker as any).loadLanguage('eng');
    
    const { data: { text } } = await worker.recognize(imageData);
    
    console.log('[Scanner:lib] OCR Result:', {
      textLength: text.length,
      textPreview: text.substring(0, 200)
    });
    
    await worker.terminate();
    return text;
  } catch (error) {
    console.error('[Scanner:lib] OCR Error:', error);
    throw error;
  }
}

export function parseReceiptText(text: string): ScannedItem[] {
  console.log('[Scanner:lib] Starting parsing:', {
    textLength: text.length,
    textPreview: text.substring(0, 200)
  });

  // Split and clean lines
  const lines = text.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const items: ScannedItem[] = [];
  let currentItem: Partial<ScannedItem> = {};
  
  // More flexible regex patterns for mobile OCR
  const priceRegex = /[^0-9](\d+[.,]\d{2})\s*(?:EUR|€|B)?$/;  // Match price at end of line
  const weightPriceRegex = /(\d+[.,]\d{3})\s*(?:kg|g)\s*[xX*]\s*(\d+[.,]\d{2})/i;  // More flexible weight matching
  
  // Skip words (more comprehensive)
  const skipWords = ['summe', 'geg', 'steuer', 'tse', 'gesamt', 'bon-nr', 'total', 'zwischen', 'bar', 'kasse', 'datum'];
  
  for (let line of lines) {
    // Clean the line
    line = line.replace(/\s+/g, ' ').trim();
    const lowerLine = line.toLowerCase();
    
    // Skip lines containing any of the skip words
    if (skipWords.some(word => lowerLine.includes(word))) {
      console.log('[Scanner:lib] Skipping line:', { line });
      continue;
    }

    // Try to match weight price first (more specific)
    const weightMatch = line.match(weightPriceRegex);
    if (weightMatch) {
      console.log('[Scanner:lib] Weight match found:', { line, match: weightMatch[0] });
      const weight = parseFloat(weightMatch[1].replace(',', '.'));
      const pricePerKg = parseFloat(weightMatch[2].replace(',', '.'));
      currentItem.price = Number((weight * pricePerKg).toFixed(2));
      
      // Use the text before the weight as the name
      if (!currentItem.name) {
        currentItem.name = line.split(weightMatch[0])[0].trim();
      }
    } else {
      // Try to match regular price
      const priceMatch = line.match(priceRegex);
      if (priceMatch) {
        console.log('[Scanner:lib] Price match found:', { line, match: priceMatch[1] });
        currentItem.price = parseFloat(priceMatch[1].replace(',', '.'));
        
        // Use everything before the price as the name
        if (!currentItem.name) {
          currentItem.name = line.split(priceMatch[1])[0].trim();
        }
      } else if (!currentItem.name && line.length > 2) {
        // If no price found and line looks like a product name
        currentItem.name = line;
      }
    }

    // If we have both name and price, add the item
    if (currentItem.name && currentItem.price !== undefined) {
      console.log('[Scanner:lib] Adding item:', currentItem);
      items.push({
        id: uuidv4(),
        name: currentItem.name,
        calories: 0,
        price: currentItem.price,
        category: '??'
      });
      currentItem = {}; // Reset for next item
    }
  }

  console.log('[Scanner:lib] Parsing complete:', {
    totalItems: items.length,
    items: items.map(item => ({ name: item.name, price: item.price }))
  });

  return items;
}