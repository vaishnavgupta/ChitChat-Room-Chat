import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { Toaster } from "react-hot-toast";
import Other from "./pages/Other";
import { RoomProvider } from "./context/RoomContext";

function App() {
  return (
    <BrowserRouter>
      <Toaster  />
      <RoomProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="*" element={<Other />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  );
}

export default App;
