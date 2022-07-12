/*
  Warnings:

  - You are about to drop the column `SalesDate` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `salesDate` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "salesDate" DATETIME NOT NULL,
    "sellerId" TEXT NOT NULL,
    "userId" TEXT,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sales_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Sellers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sales" ("createdAt", "id", "productId", "sellerId", "userId") SELECT "createdAt", "id", "productId", "sellerId", "userId" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
