// src/pages/UnlockPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UnlockPage.css";

function UnlockPage() {
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setUnlocked(true);
    setTimeout(() => navigate("/memories"), 1000);
  };

  return (
    <div className="unlock-container">
      <div
        className={`frame ${unlocked ? "unlocked" : ""}`}
        onClick={handleClick}
      >
        {!unlocked ? "Click to unlock your memories 🔓" : "Unlocking..."}
      </div>
    </div>
  );
}

export default UnlockPage;
