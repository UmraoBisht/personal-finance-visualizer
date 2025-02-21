// app/api/budgets/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const budgets = await prisma.budgetSetting.findMany();
    // Convert the array to an object, e.g. { Food: 500, Transport: 200, ... }
    const budgetRecord = budgets.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.category] = curr.amount;
      return acc;
    }, {});
    return NextResponse.json(budgetRecord, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const budgets = await request.json();
    // For each category in the budgets record, upsert the budget value.
    for (const category in budgets) {
      await prisma.budgetSetting.upsert({
        where: { category },
        update: { amount: budgets[category] },
        create: { category, amount: budgets[category] },
      });
    }
    return NextResponse.json({ message: "Budgets updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update budgets" }, { status: 500 });
  }
}
