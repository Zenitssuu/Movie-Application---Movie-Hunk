import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import {
  HomePage,
  SignInPage,
  SignUpPage,
  PasswordResetPage,
  Theaters,
  AllMovies,
  Movie,
  AdminMovieDashboard,
  AddMovie,
  ReservationPage,
  TicketBooking,
} from "./pages/index.js";

import ThemeProvider from "./components/ThemeProvider.jsx";
import OTPInput from "./components/OTPInput.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import Movies from "./components/DashBoard/Movies.jsx";
import Showtime from "./components/DashBoard/ShowTime.jsx";
export default App;

axios.defaults.baseURL = `${import.meta.env.VITE_AXIOS_BASE_URL}`;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />

      <Route path="Dashboard" element={<Movies />} />
      <Route path="Theaters" element={<Theaters />} />
      <Route path="ShowTime" element={<Showtime />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="password-reset" element={<PasswordResetPage />} />
      <Route path="otp/:email" element={<OTPInput />} />
      <Route path="changePassword/:email" element={<ChangePassword />} />
      <Route path="reservation" element={<ReservationPage />} />
      <Route path="ticketBooking" element={<TicketBooking />} />
      <Route path="movies">
        <Route path="all-movies" element={<AllMovies />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="add-movie" element={<AddMovie />} />
        <Route path="admin-movie-dashboard" element={<AdminMovieDashboard />} />
      </Route>
    </Route>
  )
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/" element={<HomePage />} />
//       <Route path="Dashboard" element={<DashBoard />} />
//       <Route path="Theaters" element={<Theaters />} />
//       <Route path="signin" element={<SignInPage />} />
//       <Route path="signup" element={<SignUpPage />} />
//       <Route path="password-reset" element={<PasswordResetPage />} />
//       <Route path="otp/:email" element={<OTPInput />} />
//       <Route path="changePassword/:email" element={<ChangePassword />} />
//       <Route path="movies">
//         <Route path="all-movies" element={<AllMovies />} />
//         <Route path="movie/:id" element={<Movie />} />
//         <Route path="add-movie" element={<AddMovie />} />
//         <Route path="admin-movie-dashboard" element={<AdminMovieDashboard />} />
//       </Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
