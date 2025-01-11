/*
  Warnings:

  - You are about to drop the column `Comment` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "Comment",
ADD COLUMN     "comment" TEXT NOT NULL;
