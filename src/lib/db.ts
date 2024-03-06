// more info: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// checks if prisma already exists on the global object. If it does, it uses that instance (to avoid creating new connections). If it doesn't, it creates a new instance of PrismaClient.
export const db = globalForPrisma.prisma || new PrismaClient()

// assigns the PrismaClient instance to the global object. By reusing the same PrismaClient, we avoid creating too many connections.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
