// app/savedRecipes/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { RecipeResult } from "@/types/RecipeResponseType";
import RecipeCard from "@/components/RecipeCard";
import styles from "@/app/styles.module.css";

const SavedRecipesPage = () => {
    const [savedRecipes, setSavedRecipes] = useState<RecipeResult[]>([]);

    // Function to fetch saved recipes
    const fetchSavedRecipes = useCallback(async () => {
        try {
            const response = await fetch('/api/getSavedRecipes');
            if (response.ok) {
                const recipes = await response.json();
                
                setSavedRecipes(recipes);
                
            } else {
                console.error('Failed to fetch saved recipes');
            }
        } catch (error) {
            console.error('Error fetching saved recipes:', error);
        }
    }, []);

    // Fetch saved recipes on page load
    useEffect(() => {
        fetchSavedRecipes();
        
    }, []);
    
    

    return (
        
        <div className={styles.container}>
            <h1>Your Saved Recipes</h1>
            <div className={styles.recipes}>
                {savedRecipes.length > 0 ? (
                    savedRecipes.map((recipe, key) => (
                        
                        
                        <RecipeCard key={key} recipe={recipe} onSave={() => {}} />
                        
                    ))
                ) : (
                    <h2>No saved recipes found.</h2>
                )}
            </div>
        </div>
    );
};

export default SavedRecipesPage;
