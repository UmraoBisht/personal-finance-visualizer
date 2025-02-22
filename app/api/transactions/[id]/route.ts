// app/api/transactions/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);

    try {
        const body = await request.json();
        const { description, amount, date, category } = body;
        const updatedTransaction = await prisma.transaction.update({
            where: { id },
            data: {
                description,
                amount: parseFloat(amount),
                date: new Date(date),
                category,
            },
        });
        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    // Await params before using it
    const { id } = await Promise.resolve(params);

    try {
        await prisma.transaction.delete({
            where: { id },
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
    }
}
