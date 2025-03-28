import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Chores from "./pages/Chores";
import Shop from "./pages/Shop";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import PurchaseHistory from "./pages/PurchaseHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Chores />} />
          <Route path="chores" element={<Chores />} />
          <Route path="shop" element={<Shop />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
