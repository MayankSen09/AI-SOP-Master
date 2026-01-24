import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@sopsystem.com' },
        update: {},
        create: {
            email: 'admin@sopsystem.com',
            passwordHash: adminPassword,
            name: 'System Administrator',
            role: 'ADMIN',
            isActive: true,
        },
    });

    console.log('✅ Created admin user:', admin.email);

    // Create manager user
    const managerPassword = await bcrypt.hash('manager123', 10);
    const manager = await prisma.user.upsert({
        where: { email: 'manager@sopsystem.com' },
        update: {},
        create: {
            email: 'manager@sopsystem.com',
            passwordHash: managerPassword,
            name: 'Department Manager',
            role: 'MANAGER',
            isActive: true,
        },
    });

    console.log('✅ Created manager user:', manager.email);

    // Create contributor user
    const contributorPassword = await bcrypt.hash('contributor123', 10);
    const contributor = await prisma.user.upsert({
        where: { email: 'contributor@sopsystem.com' },
        update: {},
        create: {
            email: 'contributor@sopsystem.com',
            passwordHash: contributorPassword,
            name: 'Content Contributor',
            role: 'CONTRIBUTOR',
            isActive: true,
        },
    });

    console.log('✅ Created contributor user:', contributor.email);

    // Create sample SOP
    const sampleSOP = await prisma.sOP.create({
        data: {
            title: 'Employee Onboarding Process',
            departmentId: 'hr',
            category: 'Human Resources',
            purpose: 'Standardize the onboarding process for new employees',
            status: 'APPROVED', // Using string instead of enum
            content: JSON.stringify({ // Convert to JSON string for SQLite
                title: 'Employee Onboarding Process',
                purpose: 'To ensure consistent and comprehensive onboarding for all new hires',
                scope: 'All departments and new employees',
                procedures: [
                    {
                        stepNumber: 1,
                        title: 'Pre-boarding Preparation',
                        description: 'Prepare workstation, email, and access credentials before Day 1',
                        warnings: ['Ensure IT tickets are submitted 48 hours in advance'],
                        resources: ['IT Helpdesk', 'HR Portal'],
                    },
                    {
                        stepNumber: 2,
                        title: 'Day 1 Welcome',
                        description: 'Greet new employee, provide welcome packet, and conduct facility tour',
                        warnings: [],
                        resources: ['Welcome Packet Template', 'Building Map'],
                    },
                    {
                        stepNumber: 3,
                        title: 'System Training',
                        description: 'Complete mandatory system and compliance training',
                        warnings: ['Must be completed within first week'],
                        resources: ['Learning Management System', 'Compliance Portal'],
                    },
                ],
                definitions: {
                    'Pre-boarding': 'Activities completed before the employee\'s first day',
                    'Welcome Packet': 'Company information, policies, and initial paperwork',
                },
                compliance: ['SOX', 'Data Privacy'],
            }),
            metadata: JSON.stringify({ // Convert to JSON string for SQLite
                industry: 'General',
                compliance: ['SOX'],
                version: 1,
            }),
            generatedByAI: false,
            version: 1,
            createdById: admin.id,
            publishedAt: new Date(),
        },
    });

    console.log('✅ Created sample SOP:', sampleSOP.title);

    // Create activity log
    await prisma.activityLog.create({
        data: {
            type: 'SOP_CREATED', // Using string instead of enum
            description: 'Employee Onboarding Process SOP created',
            userId: admin.id,
            sopId: sampleSOP.id,
            metadata: JSON.stringify({ // Convert to JSON string for SQLite
                department: 'hr',
                automated: false,
            }),
        },
    });

    console.log('✅ Created activity log');

    console.log('\n🎉 Seeding completed!');
    console.log('\nTest Accounts:');
    console.log('━'.repeat(50));
    console.log('Admin:       admin@sopsystem.com / admin123');
    console.log('Manager:     manager@sopsystem.com / manager123');
    console.log('Contributor: contributor@sopsystem.com / contributor123');
    console.log('━'.repeat(50));
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
