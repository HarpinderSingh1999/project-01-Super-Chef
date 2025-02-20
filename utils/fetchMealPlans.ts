export const fetchMealPlans = async (userId) => {
    const response = await fetch(`/api/mealPlans?userId=${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch meal plans");
    }
    return response.json();
};
