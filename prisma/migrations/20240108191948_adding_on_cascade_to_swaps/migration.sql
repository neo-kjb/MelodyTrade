-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Swap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "sentItemId" INTEGER NOT NULL,
    "receivedItemId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Swap_sentItemId_fkey" FOREIGN KEY ("sentItemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Swap_receivedItemId_fkey" FOREIGN KEY ("receivedItemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Swap_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Swap_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Swap" ("createdAt", "id", "receivedItemId", "receiverId", "senderId", "sentItemId", "status") SELECT "createdAt", "id", "receivedItemId", "receiverId", "senderId", "sentItemId", "status" FROM "Swap";
DROP TABLE "Swap";
ALTER TABLE "new_Swap" RENAME TO "Swap";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
