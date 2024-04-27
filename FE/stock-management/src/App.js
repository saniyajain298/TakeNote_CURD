import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Note from "./Page/Note";
import ViewNote from "./Page/ViewNote";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Note />} />
          <Route path="/viewNote/:id" element={<ViewNote />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
