import React from "react";

// src/components/StoryGroup.jsx
export default function StoryCard({ data, onClick }) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick} // calls onClick function when card is clicked
    >
      <div
        className="rounded-full p-0 border-3 "
        style={{ borderColor: data.ringColor }} // sets border color in ring
      >
        <img
          src={data.thumbnail}
          alt={data.name} // improve accessiblity by adding alt text
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <p className="text-sm mt-1" style={{ color: data.nameColor }}>
        {data.name} {/* displays name of the story */}
      </p>
    </div>
  );
}
