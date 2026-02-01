import { useEffect, useRef, useState } from "react";
import musicFile from "./assets/Court - Premalo Bgm.mp3";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [playMusic, setPlayMusic] = useState(false);
  const [explosion, setExplosion] = useState(false);

  const audioRef = useRef(null);

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    setNoPos({ x, y });
  };

  const handleYes = () => {
    setAccepted(true);
    setExplosion(true);

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }

    setTimeout(() => setExplosion(false), 2500);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    playMusic ? audioRef.current.pause() : audioRef.current.play();
    setPlayMusic(!playMusic);
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.6;
  }, []);

  return (
    <>
      {/* 🌸 Animations */}
      <style>
        {`
          @keyframes hearts {
            0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
          }

          @keyframes pop {
            0% { transform: scale(0.5); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }

          .heart { position: absolute; animation: hearts linear infinite; }
          .pop { animation: pop 1.2s ease-in-out infinite; }
        `}
      </style>

      {/* 🎶 Music */}
      <audio ref={audioRef} loop src={musicFile} />

      {/* 🌈 Background */}
      <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 overflow-hidden">

        {/* 💖 Floating Hearts */}
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="heart text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 6}s`,
            }}
          >
            💖
          </span>
        ))}

        {/* 🎶 Music Button */}
        <button
          onClick={toggleMusic}
          className="absolute top-5 right-5 z-30 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md text-white shadow-lg hover:scale-110 transition"
        >
          {playMusic ? "⏸️ Music" : "▶️ Music"}
        </button>

        {/* 💎 Glass Card */}
        <div className="z-10 bg-white/25 backdrop-blur-2xl border-2 border-pink-200 shadow-[0_0_45px_rgba(255,0,102,0.7)] rounded-[2.5rem] p-10 w-[90%] max-w-md text-center">

          {!accepted ? (
            <>
              <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow">
                💘 Happy Valentine’s Day 💘
              </h1>

              {/* 🧸 TEDDY EMOJIS */}
              <div className="text-6xl mb-4 pop">
                🧸💖🧸  
              </div>

              <div className="text-4xl mb-4">
                💕 💞 💘 💝
              </div>

              <p className="text-2xl text-white font-semibold mb-6">
                Navya 💖 <br />
                Will you be my Valentine? 🧸💍💕
              </p>

              {/* ❤️ Buttons */}
              <div className="relative flex justify-center gap-6 h-28">
                <button
                  onClick={handleYes}
                  className="px-8 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white text-lg rounded-full shadow-xl hover:scale-125 transition-all duration-300"
                >
                  Yes 💕😍
                </button>

                <button
                  onMouseEnter={moveNoButton}
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                  }}
                  className="px-8 py-3 bg-gray-500 text-white text-lg rounded-full shadow-xl transition-all duration-300"
                >
                  No 🙈💨
                </button>
              </div>

              <p className="mt-8 text-white text-sm">
                — Forever Yours, Manoj Patel 💖
              </p>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-extrabold text-white mb-4 animate-pulse">
                YAYYYY!!! 🧸💍💖🎉
              </h2>

              <p className="text-2xl text-white mb-4">
                Manoj 🧸❤️ Navya
              </p>

              <div className="text-6xl animate-bounce">
                🧸💖 🧸💕 🧸💘
              </div>

              <p className="mt-6 text-white text-lg">
                Our Teddy Love Story 🧸💑
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
