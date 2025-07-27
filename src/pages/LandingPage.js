import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Happy Birthday My Love! 💖
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          To the most amazing woman in my life
        </motion.p>

        <motion.p
          className="quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <em>
            "Every moment with you is a gift, and today we celebrate the greatest
            gift of all – YOU! 🎁"
          </em>
        </motion.p>

        <motion.button
          className="btn"
          onClick={() => navigate("/memories")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          Begin Your Surprise! 💖
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
