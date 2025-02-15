import { connect } from "@/libs/db";
import MealPlan from "@/libs/models/mealPlan.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        const mealPlans = await MealPlan.find({ userId });
        return NextResponse.json(mealPlans);
    } catch (error) {
        console.error("Failed to fetch meal plans:", error);
        return NextResponse.json({ error: "Failed to fetch meal plans" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await connect();

    try {
        const { recipeId, recipeName, date, userId, image, source } = await req.json();

        if (!recipeId || !recipeName || !date || !userId) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newMealPlan = await MealPlan.create({
            recipeId,
            recipeName,
            date: new Date(date),
            userId,
            image,
            source,
        });

        return NextResponse.json(newMealPlan, { status: 201 });
    } catch (error) {
        console.error("Failed to save meal plan:", error);
        return NextResponse.json({ error: "Failed to save meal plan" }, { status: 500 });
    }
}
