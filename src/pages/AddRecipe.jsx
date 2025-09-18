// src/pages/AddRecipe.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AddRecipe() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userKey = `recipes_${currentUser?.uid}`;

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    steps: "",
    image: "", // base64 image
  });

  // Handle input changes
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe({ ...recipe, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const savedRecipes = localStorage.getItem(userKey);
    const recipes = savedRecipes ? JSON.parse(savedRecipes) : [];

    const newRecipes = [...recipes, recipe];
    localStorage.setItem(userKey, JSON.stringify(newRecipes));

    setRecipe({ title: "", ingredients: "", steps: "", image: "" });
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "80px auto",
        padding: "20px",
        backgroundColor: "#f8d397ff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontFamily: "VT323, monospace",
      }}
    >
      <h2 style={{ color: "#201315", textAlign: "center", marginBottom: "20px" }}>
        Add New Recipe
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipe.title}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #56382D", fontSize: "16px" }}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={recipe.ingredients}
          onChange={handleChange}
          required
          rows={4}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #56382D", fontSize: "16px" }}
        />
        <textarea
          name="steps"
          placeholder="Preparation Steps"
          value={recipe.steps}
          onChange={handleChange}
          required
          rows={6}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #56382D", fontSize: "16px" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          style={{ fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{ backgroundColor: "#201315", color: "#F8F3EB", border: "none", padding: "12px", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}
        >
          Save Recipe
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ backgroundColor: "#E76D57", color: "#F8F3EB", border: "none", padding: "12px", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
