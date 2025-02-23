/*
  Warnings:

  - Added the required column `area_id` to the `service_stations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_stations" ADD COLUMN     "area_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "areas" (
    "area_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("area_id")
);

-- AddForeignKey
ALTER TABLE "service_stations" ADD CONSTRAINT "service_stations_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;
