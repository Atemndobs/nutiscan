import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export async function checkDatabaseState() {
  try {
    // Test database connection by running a simple query
    await db.product.count()
    return { status: 'ok', message: 'Database connection successful' }
  } catch (error) {
    console.error('Database connection error:', error)
    return { 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error)
    }
  }
}
