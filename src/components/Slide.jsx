import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

export default function Slide({
  data,
  paused,
  setPaused,
  setSlideIndex,
  slides,
}) {
  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Previous button */}
      <button
        onClick={() => setSlideIndex((prev) => Math.max(prev - 1, 0))}
        className="absolute left-0.5 top-1/2 -translate-y-3/4 p-2   bg-black/50 text-white  z-50"
      >
        {/* lucide-react icon for left arrow */}
        <ChevronLeft className="w-3 h-5" />
      </button>
      <button
        onClick={() =>
          setSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev))
        }
        className="absolute -right-2  top-1/2 -translate-y-3/4 p-2  mx-2 bg-black/50 text-white  z-50"
      >
        {/* lucide-react icon for left arrow */}
        <ChevronRight className="w-3 h-5" />
      </button>
      {/* Slide image */}
      <img
        src={data.image}
        alt="story slide"
        className="max-h-[400px] w-auto max-w-full rounded-xl mb-2 shadow-md object-contain"
      />

      {/* Play/Pause button in top-right */}
      <button
        onClick={() => setPaused((prev) => !prev)}
        className="absolute top-2 right-2 p-1 bg-black/60 text-white z-50 rounded-full hover:bg-black/80"
      >
        {paused ? (
          <Play className="w-4 h-4 fill-white" /> // lucide-react icon
        ) : (
          <Pause className="w-4 h-4 fill-white" /> // lucide-react icon
        )}
      </button>

      {data.button_text && (
        <a
          href={data.button_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 bg-black opacity-50 hover:opacity-100 text-white px-2 py-1 rounded-md"
        >
          {data.button_text}
        </a>
      )}
    </div>
  );
}
