/*
  Warnings:

  - Made the column `service_station_id` on table `positions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "positions" DROP CONSTRAINT "positions_service_station_id_fkey";

-- AlterTable
ALTER TABLE "positions" ALTER COLUMN "service_station_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_service_station_id_fkey" FOREIGN KEY ("service_station_id") REFERENCES "service_stations"("service_station_id") ON DELETE RESTRICT ON UPDATE CASCADE;
