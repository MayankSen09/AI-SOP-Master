// Quick database connection test
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
    console.log('🔍 Testing Supabase connection...\n');

    try {
        // Simple connection test
        await prisma.$connect();
        console.log('✅ Successfully connected to Supabase!');

        // Try to query
        const result = await prisma.$queryRaw`SELECT version()`;
        console.log('✅ Database version:', result);

        console.log('\n🎉 Connection test passed! Database is ready.\n');
    } catch (error: any) {
        console.error('❌ Connection failed:', error.message);
        console.error('\nPossible fixes:');
        console.error('1. Check if DATABASE_URL in .env is correct');
        console.error('2. Verify Supabase project is active (not paused)');
        console.error('3. Check network/firewall settings');
        console.error('4. Try connection pooling URL (port 6543)');
        console.error('\nFull error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
