import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Chores from "./pages/Chores";
import Shop from "./pages/Shop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Chores />} />
          <Route path="chores" element={<Chores />} />
          <Route path="shop" element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
