import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/register-page";
import LoginPage from "./pages/login-page";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/header/navbar";
import Footer from "./components/footers/Footer";
import ProfilePage from "./pages/profile";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./protected/protected-route";
import AuthRedirect from "./protected/auth-redirect";
import BlogCreate from "./pages/blog-create-page";
import BlogUpdate from "./pages/update-blog-page";


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route element={<AuthRedirect />}>
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          <Route element={<AuthRedirect />}>
            <Route path="/sign-in" element={<LoginPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/blog-create" element={<BlogCreate />} />

          <Route path="/blog-update/:id" element={<BlogUpdate />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
