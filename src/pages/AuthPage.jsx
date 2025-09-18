// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const { login, signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // for signup
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }
      navigate("/"); // redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "VT323, monospace",
        backgroundColor: "#F8F3EB",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#201315",
          color: "#F8F3EB",
          padding: "30px",
          borderRadius: "12px",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && (
          <p style={{ color: "#E76D57", fontSize: "14px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {!isLogin && (
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #56382D",
              fontSize: "16px",
            }}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #56382D",
            fontSize: "16px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #56382D",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#E76D57",
            color: "#F8F3EB",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            backgroundColor: "#56382D",
            color: "#F8F3EB",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Sign in with Google
        </button>

        <p style={{ textAlign: "center", fontSize: "14px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#F8F3EB", textDecoration: "underline", cursor: "pointer" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthPage;
