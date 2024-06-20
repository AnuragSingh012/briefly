import React from "react";
import Hero from "./components/Hero";
import Summary from "./components/Summary";

const App = () => {
  return (
    <main className="w-full h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto sm:px-16 px-6">
        <Hero />
        <Summary />
      </div>
    </main>
  );
};

export default App;
