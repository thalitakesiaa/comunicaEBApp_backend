/*
  Warnings:

  - You are about to drop the column `service_post_id` on the `assignments` table. All the data in the column will be lost.
  - You are about to drop the `service_posts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `service_station_id` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_service_post_id_fkey";

-- DropForeignKey
ALTER TABLE "service_posts" DROP CONSTRAINT "service_posts_area_id_fkey";

-- AlterTable
ALTER TABLE "assignments" DROP COLUMN "service_post_id",
ADD COLUMN     "service_station_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "service_posts";

-- CreateTable
CREATE TABLE "service_stations" (
    "service_station_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "area_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_stations_pkey" PRIMARY KEY ("service_station_id")
);

-- AddForeignKey
ALTER TABLE "service_stations" ADD CONSTRAINT "service_stations_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_service_station_id_fkey" FOREIGN KEY ("service_station_id") REFERENCES "service_stations"("service_station_id") ON DELETE RESTRICT ON UPDATE CASCADE;
