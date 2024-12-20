"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Choose one of these functions depending on what you want to do:
        // Option 1: Only reset sequences but keep data
        //   await resetSequences()
        // OR
        // Option 2: Clear all data and reset sequences
        yield clearAndResetSequences();
    });
}
function resetSequences() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.$executeRaw `ALTER SEQUENCE "User_userId_seq" RESTART WITH 1`;
        yield prisma.$executeRaw `ALTER SEQUENCE "Team_id_seq" RESTART WITH 1`;
        yield prisma.$executeRaw `ALTER SEQUENCE "Project_id_seq" RESTART WITH 1`;
        yield prisma.$executeRaw `ALTER SEQUENCE "ProjectTeam_id_seq" RESTART WITH 1`;
        yield prisma.$executeRaw `ALTER SEQUENCE "Task_id_seq" RESTART WITH 1`;
        yield prisma.$executeRaw `ALTER SEQUENCE "TaskAssignment_id_seq" RESTART WITH 1`;
        yield prisma.$executeRaw `ALTER SEQUENCE "Attachment_id_seq" RESTART WITH 1`;
        yield prisma.$executeRaw `ALTER SEQUENCE "Comment_id_seq" RESTART WITH 1`;
    });
}
function clearAndResetSequences() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.$executeRaw `TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE`;
        yield prisma.$executeRaw `TRUNCATE TABLE "Attachment" RESTART IDENTITY CASCADE`;
        yield prisma.$executeRaw `TRUNCATE TABLE "TaskAssignment" RESTART IDENTITY CASCADE`;
        yield prisma.$executeRaw `TRUNCATE TABLE "Task" RESTART IDENTITY CASCADE`;
        yield prisma.$executeRaw `TRUNCATE TABLE "ProjectTeam" RESTART IDENTITY CASCADE`;
        yield prisma.$executeRaw `TRUNCATE TABLE "Project" RESTART IDENTITY CASCADE`;
        yield prisma.$executeRaw `TRUNCATE TABLE "Team" RESTART IDENTITY CASCADE`;
        yield prisma.$executeRaw `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
