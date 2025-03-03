import { Route, Routes } from "react-router-dom";
import { Hero } from "./components/ui/hero-with-group-of-images-text-and-two-buttons";
import { HeroParallaxDemo } from "./parallex";
import Login from "./login";
import SignUp from "./sign-up";
import Profile from "./profile";
import BookEvent from "./book-event";
import Events from "./events";
import AdminLogin from "./admin/login";
import PageNotFound from "./not-found";
import AdminLayout from "./admin/layout";
import AdminProfile from "./admin/profile";
import AdminDashbaord from "./admin/dashboard";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <Hero />
            <HeroParallaxDemo />
          </main>
        }
      />
      <Route path="/book-event" element={<BookEvent />} />
      <Route path="/events" element={<Events />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashbaord />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
