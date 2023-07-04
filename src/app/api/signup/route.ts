import { PrismaClient } from '@prisma/client';
import { withPresets } from '@zenstackhq/runtime';
import { NextResponse } from 'next/server';

const db = withPresets(new PrismaClient());

export async function POST(request: Request) {
    const data = await request.json();
    try {
        const result = await db.signup.create({ data });
        return NextResponse.json(result, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
