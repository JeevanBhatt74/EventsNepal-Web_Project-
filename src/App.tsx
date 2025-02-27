import { BrowserRouter, Outlet, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <>
              <Header />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/upcomming-events" element={<Blogs />} />
          <Route path="/booking" element={<Booking />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/admin">
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="edit/:eventId" element={<EditEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
