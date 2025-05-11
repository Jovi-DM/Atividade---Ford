-- CreateTable
CREATE TABLE "Workers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "salario" REAL NOT NULL,
    "data_admissao" DATETIME NOT NULL
);
