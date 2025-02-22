// app/api/budgets/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Define default budget values
const defaultBudgets: Record<string, number> = {
  Food: 500,
  Transport: 200,
  Entertainment: 300,
  Bills: 400,
  Shopping: 250,
  Other: 150,
};

export async function GET() {
  try {
    // Retrieve existing budget settings from the database
    const budgets = await prisma.budgetSetting.findMany();

    // If no budget records exist, seed the database with default values
    if (budgets.length === 0) {
      await Promise.all(
        Object.entries(defaultBudgets).map(([category, amount]) =>
          prisma.budgetSetting.create({
            data: { category, amount },
          })
        )
      );
      // Return the default budgets after seeding
      return NextResponse.json(defaultBudgets, { status: 200 });
    }

    // Convert retrieved array into an object for easier merging
    const budgetMap = budgets.reduce(
      (acc: Record<string, number>, { category, amount }) => {
        acc[category] = amount;
        return acc;
      },
      {}
    );    

    // For any missing category, fall back to the default value
    const finalBudgets = { ...defaultBudgets, ...budgetMap };

    return NextResponse.json(finalBudgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const budgets: Record<string, number> = await request.json();

    // Upsert each category to update existing values or create new ones
    await Promise.all(
      Object.entries(budgets).map(([category, amount]) =>
        prisma.budgetSetting.upsert({
          where: { category },
          update: { amount },
          create: { category, amount },
        })
      )
    );
    return NextResponse.json({ message: "Budgets updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating budgets:", error);
    return NextResponse.json({ error: "Failed to update budgets" }, { status: 500 });
  }
}
