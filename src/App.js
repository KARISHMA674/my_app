import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import Footer from "./components/Footer/Footer";
import HeroSection from "./pages/Home/HeroSection";
import LearningPage from "./pages/Learning/LearningPage";
import AssignmentPage from "./pages/Assignment/AssignmentPage";
import ResourcesPage from "./pages/Resources/ResourcesPage";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <AppNavbar />
      <div style={{ paddingTop: "2rem" }}>
        <Routes>
          <Route path="/my_app/" element={<HeroSection />} />
          <Route path="/my_app/learning" element={<LearningPage />} />
          <Route path="/my_app/assignment" element={<AssignmentPage />} />
          <Route path="/my_app/resources" element={<ResourcesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
