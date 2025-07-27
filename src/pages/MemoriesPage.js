import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

import "./MemoriesPage.css";

const memories = [
  // {
  //   src: "/images/image1.jpg",
  //   caption: "This smile... my forever favorite ❤️",
  // },
  // {
  //   src: "/images/image2.jpeg",
  //   caption: "The way you laugh lights up my world",
  // },
  // {
  //   src: "/images/image3.jpeg",
  //   caption: "You, me, and moments that matter most 💑",
  // },
  {
    src: "/images/dev2.jpeg",
    caption: "This smile... my forever favorite ❤️",
  },
  {
    src: "/images/dev3.jpeg",
    caption: "The way you laugh lights up my world",
  },
  {
    src: "/images/dev1.jpeg",
    caption: "You, me, and moments that matter most 💑",
  },
  {
    src: "/images/dev4.jpeg",
    caption: "This smile... my forever favorite ❤️",
  },
  {
    src: "/images/dev2.jpeg",
    caption: "This smile... my forever favorite ❤️",
  },
  {
    src: "/images/dev3.jpeg",
    caption: "The way you laugh lights up my world",
  },
  {
    src: "/images/dev1.jpeg",
    caption: "You, me, and moments that matter most 💑",
  },
  {
    src: "/images/dev4.jpeg",
    caption: "This smile... my forever favorite ❤️",
  },
  {
    src: "/images/dev2.jpeg",
    caption: "This smile... my forever favorite ❤️",
  },
  {
    src: "/images/dev3.jpeg",
    caption: "The way you laugh lights up my world",
  },
  {
    src: "/images/dev1.jpeg",
    caption: "You, me, and moments that matter most 💑",
  },
  {
    src: "/images/dev4.jpeg",
    caption: "This smile... my forever favorite ❤️",
  }

];

function MemoriesPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedCaption, setTypedCaption] = useState("");
  const galleryRef = useRef(null);
  const imageRefs = useRef([]);

  const handleUnlock = () => setUnlocked(true);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const confettiIntervalRef = useRef(null);
  const musicRef = useRef(null);
  const [hearts, setHearts] = useState([]);

useEffect(() => {
  const heartArray = Array.from({ length: 20 }).map(() => ({
    left: Math.random() * 100, // percent
    delay: Math.random() * 10, // seconds
    size: 20 + Math.random() * 20, // px
  }));
  setHearts(heartArray);
}, []);

  
const handleCelebrate = () => {
  if (!isCelebrating) {
    // 🎶 Start music
    if (musicRef.current) {
      musicRef.current.currentTime = 0;
      musicRef.current.volume = 1.0;
      musicRef.current
        .play()
        .then(() => console.log("Music playing"))
        .catch((err) => console.log("Audio play blocked", err));
    }

    // 🎉 Start looping confetti
    confettiIntervalRef.current = setInterval(() => {
      confetti({
        particleCount: 7,
        spread: 360,
        startVelocity: 30,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        zIndex: 9999,
        colors: ["#ff69b4", "#ffc107", "#8bc34a", "#2196f3", "#f44336"],
        shapes: ["star", "circle",],
      });
    }, 300);

    setIsCelebrating(true);
  } else {
    // 🔇 Stop music
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }

    // ❌ Stop confetti
    clearInterval(confettiIntervalRef.current);
    confettiIntervalRef.current = null;

    setIsCelebrating(false);
  }
};


  // Typing effect
  useEffect(() => {
    if (!unlocked) return;
    const fullText = memories[activeIndex].caption;
    let i = 0;
    setTypedCaption("");
    const interval = setInterval(() => {
      setTypedCaption((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [activeIndex, unlocked]);

  // Detect which image is in the center of scroll
  useEffect(() => {
    if (!galleryRef.current || !unlocked) return;

    const handleScroll = () => {
      const gallery = galleryRef.current;
      const galleryRect = gallery.getBoundingClientRect();
      const centerX = galleryRect.left + galleryRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      imageRefs.current.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        const imgCenter = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - imgCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    const gallery = galleryRef.current;
    gallery.addEventListener("scroll", handleScroll);

    return () => gallery.removeEventListener("scroll", handleScroll);
  }, [unlocked, activeIndex]);

  return (
    <div className="floating-hearts-bg">
  {hearts.map((h, i) => (
    <span
      key={i}
      className="floating-heart"
      style={{
        left: `${h.left}%`,
        animationDelay: `${h.delay}s`,
        fontSize: `${h.size}px`,
      }}
    >
      💖
    </span>
  ))}
    <div className="memories-container">
      <h2 className="memories-title">Mirror of Memories</h2>

      {!unlocked ? (
        <div className="unlock-frame" onClick={handleUnlock}>
          Click to unlock your memories 🔓
        </div>
      ) : (
        <>
          <div className="memory-gallery" ref={galleryRef}>
            {memories.map((mem, index) => (
              <motion.div
                className={`memory-thumb ${index === activeIndex ? "active" : "inactive"}`}
                key={index}
                ref={(el) => (imageRefs.current[index] = el)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0.3,
                  scale: index === activeIndex ? 1.2 : 0.9,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <img src={mem.src} alt={`mem-${index}`} />
              </motion.div>

            ))}
          </div>

          <div className="memory-caption">
            <p className="typing-caption">{typedCaption}</p>
            <a href={memories[activeIndex].src} download>
              <button>📥 Download this memory</button>
            </a>
            <br/>
            <br/>
            <button onClick={handleCelebrate} className="celebrate-btn">
              {isCelebrating ? "💤 Stop Celebration" : "🎈 Let’s Celebrate"}
            </button>


          </div>
        </>
      )}
       {/* 🎵 Audio player (invisible) */}
    <audio ref={musicRef} src="/audio/happy birthday.mp3" preload="auto" loop />
    </div>
    </div>
  );
}

export default MemoriesPage;