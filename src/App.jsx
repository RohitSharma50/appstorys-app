import "./App.css";
import { data } from "./utils/data";
import { StoryList } from "./components/StoryList";
function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center  bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4 ">Welcome to Story Teller</h1>
        <StoryList storyData={data.details} />
      </div>
    </>
  );
}

export default App;
