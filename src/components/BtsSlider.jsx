import React, { useState, useRef } from "react";
import "./BtsSlider.css";

const members = [
  {
    img: "img/RM.jpg",
    name: "RM",
    title: "Leader | Rapper",
    sound: "/audio/1.mp3",
  },
  {
    img: "img/JIN.jpg",
    name: "JIN",
    title: "Vocalist",
    sound: "/audio/3.mp3",
  },
  {
    img: "img/SUGA.jpg",
    name: "SUGA",
    title: "Rapper",
    sound: "/audio/5.mp3",
  },
  {
    img: "img/JHOPE.jpg",
    name: "J.HOPE",
    title: "Dancer | Rapper",
    sound: "/audio/2.mp3",
  },
  {
    img: "img/JIMIN.jpg",
    name: "JIMIN",
    title: "Vocalist | Dancer",
    sound: "/audio/3.mp3",
  },
  { img: "img/V.jpg", name: "V", title: "Vocalist", sound: "/audio/6.mp3" },
  {
    img: "img/JK.jpg",
    name: "JUNGKOOK",
    title: "Vocalist | Dancer",
    sound: "/audio/4.mp3",
  },
];

const BtsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const audioRef = useRef(null);

  const handleClick = (index) => {
    const member = members[index];

    // logic card active seperti sekarang
    setActiveIndex((prev) => (prev === index ? null : index));

    // stop audio sebelumnya kalau ada
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // kalau card baru diaktifkan, play sound
    if (activeIndex !== index && member.sound) {
      const audio = new Audio(member.sound);
      audio.volume = 0.7; // volume bisa disesuaikan
      audioRef.current = audio;
      audio.play().catch((err) => {
        console.error("Gagal play audio:", err);
      });
    }
  };

  const getPositionClass = (index) => {
    if (activeIndex === null) return "";
    if (index === activeIndex) return "active center-card";
    if (index === activeIndex - 1) return "left-side";
    if (index === activeIndex + 1) return "right-side";
    return "";
  };

  return (
    <section className="slider-container">
      <div className="slider-image">
        {members.map((member, index) => (
          <div
            key={index}
            className={`slider-img ${getPositionClass(index)}`}
            onClick={() => handleClick(index)}
          >
            <img src={member.img} alt={member.name} />
            <h1>{member.name}</h1>
            <div className="details">
              <h2>{member.name}</h2>
              <p>{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BtsSlider;
