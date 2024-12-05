import Login from "./Components/login";
import Signup from "./Components/signup";
import Hero from './Components/hero';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<Hero/>} />
        </Routes>
    </div>
    </Router>
  )
}