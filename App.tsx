import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SkyReveal from "@/pages/SkyReveal";
import BirthdayReveal from "@/pages/BirthdayReveal";
import CakeScene from "@/pages/CakeScene";
import PasswordGate from "@/pages/PasswordGate";
import Diary from "@/pages/Diary";
import FinalPage from "@/pages/FinalPage";
const happyBirthdaySrc = `${import.meta.env.BASE_URL}audio/happy-birthday.m4a`;
const diarySongSrc = `${import.meta.env.BASE_URL}audio/18.m4a`;

type AppState = "skyAndBirthday" | "cake" | "password" | "diary" | "final";

export default function App() {
  const [state, setState] = useState<AppState>("skyAndBirthday");
  const [showBirthday, setShowBirthday] = useState(false);
  const hbAudioRef = useRef<HTMLAudioElement>(null);
  const diaryAudioRef = useRef<HTMLAudioElement>(null);
  const hbStarted = useRef(false);

  // Start HB song on the very first user interaction — play once and let it run
  useEffect(() => {
    const tryPlay = () => {
      if (hbStarted.current) return;
      const hb = hbAudioRef.current;
      if (!hb) return;
      hb.volume = 1;
      hb.play()
        .then(() => { hbStarted.current = true; })
        .catch(() => {});
    };
    tryPlay();
    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true });
    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  const stopHBSong = () => {
    const hb = hbAudioRef.current;
    if (!hb || hb.paused) return;
    let vol = hb.volume;
    const fade = setInterval(() => {
      vol = Math.max(vol - 0.07, 0);
      if (hb) hb.volume = vol;
      if (vol <= 0) { hb.pause(); hb.currentTime = 0; clearInterval(fade); }
    }, 60);
  };

  const startDiarySong = () => {
    const audio = diaryAudioRef.current;
    if (!audio || !audio.paused) return;
    audio.volume = 0;
    audio.play().then(() => {
      let vol = 0;
      const fade = setInterval(() => {
        vol = Math.min(vol + 0.03, 1);
        if (audio) audio.volume = vol;
        if (vol >= 1) clearInterval(fade);
      }, 100);
    }).catch(() => {});
  };

  const handleCakeComplete = () => {
    startDiarySong();
    setState("password");
  };

  return (
    <div className="w-full min-h-[100dvh] overflow-hidden bg-black selection:bg-pink-200/50 selection:text-pink-900 font-sans">
      {/* Both audio elements always mounted — never unmounted so they never reset */}
      <audio ref={hbAudioRef} src={happyBirthdaySrc} preload="auto" />
      <audio ref={diaryAudioRef} src={diarySongSrc} loop preload="auto" />

      <AnimatePresence mode="wait">
        {state === "skyAndBirthday" && (
          <div key="skyAndBirthday" className="w-full h-[100dvh] relative">
            <SkyReveal onComplete={() => setShowBirthday(true)} />
            <AnimatePresence>
              {showBirthday && (
                <BirthdayReveal onEnter={() => setState("cake")} />
              )}
            </AnimatePresence>
          </div>
        )}

        {state === "cake" && (
          <CakeScene
            key="cake"
            onStopHBSong={stopHBSong}
            onComplete={handleCakeComplete}
          />
        )}

        {state === "password" && (
          <PasswordGate key="password" onSuccess={() => setState("diary")} />
        )}

        {state === "diary" && (
          <Diary key="diary" onFinish={() => setState("final")} />
        )}

        {state === "final" && (
          <FinalPage
            key="final"
            onRestart={() => {
              setState("skyAndBirthday");
              setShowBirthday(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
