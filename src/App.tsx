import React from "react";
import Hero from "./components/Hero";

/**
 * The main application component.
 * This is a functional component that serves as the root of the React application.
 */
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my React App!</h1>
        <p>This is a functional component example.</p>
      </header>
      <main>
        <Hero />
        {/* You can add more components or content here */}
        <p>Start building your amazing application.</p>
      </main>
      <footer>
        <p>&copy; 2025 My React App</p>
      </footer>
    </div>
  );
};

export default App;
