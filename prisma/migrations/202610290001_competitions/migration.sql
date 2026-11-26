-- CreateTable
CREATE TABLE "ParticipantChallenge" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "codeCiphertext" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "usedAt" TIMESTAMP(3),
    "mailStatus" TEXT NOT NULL DEFAULT 'pending',
    "mailAttempts" INTEGER NOT NULL DEFAULT 0,
    "mailNextAttempt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantSession" (
    "tokenHash" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantSession_pkey" PRIMARY KEY ("tokenHash")
);

-- CreateTable
CREATE TABLE "CompetitionConfig" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "data" JSONB NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitionConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionEntry" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "studyYear" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "teamName" TEXT NOT NULL DEFAULT '',
    "emailStatus" TEXT NOT NULL DEFAULT 'pending',
    "emailAttempts" INTEGER NOT NULL DEFAULT 0,
    "emailNextAttempt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionMember" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "CompetitionMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HackathonSubmission" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "prototypeUrl" TEXT NOT NULL DEFAULT '',
    "filename" TEXT NOT NULL,
    "bytes" BYTEA NOT NULL,
    "size" INTEGER NOT NULL,
    "sha256" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HackathonSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "score" INTEGER,
    "total" INTEGER NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ParticipantChallenge_registrationId_createdAt_idx" ON "ParticipantChallenge"("registrationId", "createdAt");

-- CreateIndex
CREATE INDEX "ParticipantChallenge_mailStatus_mailNextAttempt_idx" ON "ParticipantChallenge"("mailStatus", "mailNextAttempt");

-- CreateIndex
CREATE INDEX "ParticipantSession_expiresAt_idx" ON "ParticipantSession"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionEntry_reference_key" ON "CompetitionEntry"("reference");

-- CreateIndex
CREATE INDEX "CompetitionEntry_kind_createdAt_idx" ON "CompetitionEntry"("kind", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionEntry_kind_registrationId_key" ON "CompetitionEntry"("kind", "registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionMember_registrationId_key" ON "CompetitionMember"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "HackathonSubmission_entryId_key" ON "HackathonSubmission"("entryId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizAttempt_entryId_key" ON "QuizAttempt"("entryId");

-- CreateIndex
CREATE INDEX "QuizAttempt_expiresAt_submittedAt_idx" ON "QuizAttempt"("expiresAt", "submittedAt");

-- AddForeignKey
ALTER TABLE "CompetitionMember" ADD CONSTRAINT "CompetitionMember_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "CompetitionEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonSubmission" ADD CONSTRAINT "HackathonSubmission_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "CompetitionEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "CompetitionEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
