import React, { useState } from "react";
import StoryCard from "./StoryCard";
import StoryView from "./StoryView";

// StoryList component displays a horizontal list of story  (cards)
//  conditionally shows the StoryView  when a card is clicked.
export const StoryList = ({ storyData }) => {
  // State to track the current active (clicked) story card
  // and to manage the visibility of the StoryView component.
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div>
      <div className=" flex gap-4 overflow-x-auto">
        {storyData.map((data) => (
          <StoryCard
            key={data.id} // unique key
            data={data} // Passing individual story group data to StoryCard
            onClick={() => setActiveCard(data)}
          />
        ))}
      </div>
      {/* Conditionally render StoryView if a card is active */}

      {activeCard && (
        <StoryView
          group={activeCard} // Pass selected story data to StoryView comp.
          onClose={() => setActiveCard(null)} // function to close StoryView
        />
      )}
    </div>
  );
};
