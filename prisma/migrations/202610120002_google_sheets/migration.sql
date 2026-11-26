ALTER TABLE "Registration"
 ADD COLUMN "googleKey" SERIAL NOT NULL,
 ADD COLUMN "googleStatus" TEXT NOT NULL DEFAULT 'pending',
 ADD COLUMN "googleVersion" INTEGER NOT NULL DEFAULT 1,
 ADD COLUMN "googleSyncedVersion" INTEGER NOT NULL DEFAULT 0,
 ADD COLUMN "googleSyncedAt" TIMESTAMP(3),
 ADD COLUMN "googleAttempts" INTEGER NOT NULL DEFAULT 0,
 ADD COLUMN "googleNextAttempt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 ADD COLUMN "googleLastError" TEXT;
CREATE UNIQUE INDEX "Registration_googleKey_key" ON "Registration"("googleKey");
