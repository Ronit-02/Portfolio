import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark]       = useState(false);
  const [music, setMusic]     = useState(false);
  const [audioRef, setAudioRef] = useState(null);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Background music (royalty-free from pixabay CDN)
  useEffect(() => {
    if (!audioRef) {
      const a = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3");
      a.loop   = true;
      a.volume = 0.3;
      setAudioRef(a);
    }
  }, [audioRef]);

  useEffect(() => {
    if (!audioRef) return;
    if (music) {
      audioRef.play().catch(() => {});
    } else {
      audioRef.pause();
    }
  }, [music, audioRef]);

  return (
    <ThemeContext.Provider value={{ dark, setDark, music, setMusic }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
