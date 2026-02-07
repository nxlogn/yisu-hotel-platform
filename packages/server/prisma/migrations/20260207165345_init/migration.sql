/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[orderNo]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `merchantId` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingDate` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starRating` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkIn` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOut` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderNo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MERCHANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "HotelStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED', 'OFFLINE');

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "imageUrl",
DROP COLUMN "price",
DROP COLUMN "score",
ADD COLUMN     "merchantId" INTEGER NOT NULL,
ADD COLUMN     "nameEn" TEXT,
ADD COLUMN     "nearbyInfo" TEXT,
ADD COLUMN     "openingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rejectReason" TEXT,
ADD COLUMN     "starRating" INTEGER NOT NULL,
ADD COLUMN     "status" "HotelStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "amount",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "checkIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkOut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orderNo" TEXT NOT NULL,
ADD COLUMN     "totalAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "bedType" TEXT,
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "size" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
ADD COLUMN     "avatar" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNo_key" ON "Order"("orderNo");

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
