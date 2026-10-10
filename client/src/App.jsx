
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import BookDetail from "./pages/BookDetail";
import MyReviews from "./pages/MyReviews";
import AddBook from "./pages/AddBook";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/books" element={<Books />} />
        </Route>

        <Route path="*" element={<Navigate to="/books" replace />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/books/add" element={<AddBook />} />
      </Routes>
    </>
  );
}
