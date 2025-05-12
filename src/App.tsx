import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewsDetails from "./pages/NewsDetails/NewsDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticia/:url" element={<NewsDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
