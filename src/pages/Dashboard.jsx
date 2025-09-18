// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const userKey = `recipes_${currentUser?.uid}`;

  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem(userKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(recipes));
  }, [recipes, userKey]);

  const handleDelete = (index) => {
    const newRecipes = [...recipes];
    newRecipes.splice(index, 1);
    setRecipes(newRecipes);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "VT323, monospace" }}>
<header
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#C1093E",
    color: "#F8F3EB",
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  }}
>
  {/* Left: App Logo / Name */}
  <div style={{ display: "flex", alignItems: "center" }}>
    <h1 style={{ margin: 0, fontSize: "24px" }}>Recipe Journal 📝</h1>
  </div>

  {/* Right: User Profile + Buttons */}
  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
    {/* User Profile Block */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FF6B6B",
        color: "#FFF5E1",
        padding: "5px 12px",
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      {/* Optional avatar circle */}
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#FFF5E1",
          color: "#C1093E",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "8px",
          fontSize: "14px",
        }}
      >
        {currentUser.displayName?.[0] || currentUser.email?.[0]}
      </div>
      <span>{currentUser.displayName || currentUser.email}</span>
    </div>

    {/* Add Recipe Button */}
    <button
      onClick={() => navigate("/add-recipe")}
      style={{
        backgroundColor: "#FF6B6B",
        color: "#FFF5E1",
        border: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      + Add Recipe
    </button>

    {/* Logout Button */}
    <button
      onClick={logout}
      style={{
        backgroundColor: "#56382D",
        color: "#FFF5E1",
        border: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Logout
    </button>
  </div>
</header>


      {recipes.length === 0 ? (
        <p
          style={{
            color: "#C1093E",
            textAlign: "center",
            fontSize: "18px",
            marginTop: "20px",
          }}
        >
          No recipes yet. Click "Add New Recipe" to get started!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {recipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#FFF5E1",
                color: "#201315",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                position: "relative",
              }}
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <h3 style={{ color: "#C1093E" }}>{recipe.title}</h3>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p>
                <strong>Steps:</strong> {recipe.steps}
              </p>
              <button
                onClick={() => handleDelete(index)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#FF6B6B",
                  color: "#FFF5E1",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
