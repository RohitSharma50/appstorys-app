import { useEffect, useState, useRef } from "react";
import Slide from "./Slide";

export default function StoryView({ group, onClose }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = group.slides.sort((a, b) => a.order - b.order);
  const duration = 3000; // 3 seconds duration for each story slide
  const startTimeRef = useRef(null); // track when slide started
  const elapsedRef = useRef(0); // how much time has passed before pause
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (paused) {
      // Pause: clear timers and save elapsed time
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Not paused: start or resume progress
    startTimeRef.current = Date.now() - elapsedRef.current;

    // Progress interval
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent === 100) {
        clearInterval(intervalRef.current);
      }
    }, 50);

    // Slide auto-advance timeout (adjusted for elapsed time)
    timeoutRef.current = setTimeout(() => {
      if (slideIndex < slides.length - 1) {
        setSlideIndex((prev) => prev + 1);
        setProgress(0);
        elapsedRef.current = 0;
      } else {
        onClose();
      }
    }, duration - elapsedRef.current);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [slideIndex, paused]);

  // Keep track of elapsed time on pause
  useEffect(() => {
    if (paused) {
      elapsedRef.current = Date.now() - startTimeRef.current;
    }
  }, [paused]);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white p-1 rounded-full"
      >
        ✕
      </button>
      <div className="rounded-lg p-4 relative inline-block">
        <div className="flex gap-1 mb-2">
          {slides.map((_, idx) => {
            let width = "0%"; // giving variable with for progress bar
            if (idx < slideIndex) width = "100%";
            else if (idx === slideIndex) width = `${progress}%`;

            return (
              <div
                key={idx}
                className="flex-1 h-1 rounded bg-gray-300 overflow-hidden"
              >
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width }}
                />
              </div>
            );
          })}
        </div>

        <Slide
          paused={paused}
          setPaused={setPaused}
          data={slides[slideIndex]}
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
          slides={slides}
        />
      </div>
    </div>
  );
}
