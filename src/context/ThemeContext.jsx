import { createContext, useContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext();
const THEME_STORAGE_KEY = "portfolio-theme";
const MUSIC_STORAGE_KEY = "portfolio-music";
const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

function readStoredSetting(key, enabledValue) {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(key) === enabledValue;
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() =>
    readStoredSetting(THEME_STORAGE_KEY, "dark")
  );
  const [music, setMusic] = useState(() =>
    readStoredSetting(MUSIC_STORAGE_KEY, "on")
  );
  const audioRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      // Keep the in-memory setting when storage is unavailable.
    }
  }, [dark]);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(MUSIC_STORAGE_KEY, music ? "on" : "off");
    } catch {
      // Keep the in-memory setting when storage is unavailable.
    }

    const audio = audioRef.current;
    if (!audio) return undefined;

    if (!music) {
      audio.pause();
      return undefined;
    }

    const resumePlayback = () => {
      audio.play().catch(() => {});
    };

    audio.play().catch(() => {
      window.addEventListener("pointerdown", resumePlayback, { once: true });
      window.addEventListener("keydown", resumePlayback, { once: true });
    });

    return () => {
      window.removeEventListener("pointerdown", resumePlayback);
      window.removeEventListener("keydown", resumePlayback);
    };
  }, [music]);

  return (
    <ThemeContext.Provider value={{ dark, setDark, music, setMusic }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
