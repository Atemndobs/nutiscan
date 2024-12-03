-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barcode" TEXT NOT NULL DEFAULT 'unknown',
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "imageUrl" TEXT,
    "ingredients" TEXT,
    "allergens" TEXT,
    "category" TEXT,
    "quantity" TEXT,
    "servingSize" TEXT,
    "novaGroup" INTEGER,
    "nutriscoreGrade" TEXT,
    "ecoScore" TEXT,
    "energyKcal" REAL,
    "carbohydrates" REAL,
    "proteins" REAL,
    "fat" REAL,
    "fiber" REAL,
    "sugars" REAL,
    "salt" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Scan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barcode" TEXT NOT NULL DEFAULT 'unknown',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Scan_barcode_fkey" FOREIGN KEY ("barcode") REFERENCES "Product" ("barcode") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- CreateIndex
CREATE INDEX "Scan_barcode_idx" ON "Scan"("barcode");
