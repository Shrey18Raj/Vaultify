import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Vault from "./pages/Vault";
import Upload from "./pages/Upload";
import Share from "./pages/Share";
import Settings from "./pages/Settings";
import Folders from "./pages/Folders";
import Search from "./pages/Search";
import Tags from "./pages/Tags";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";
import AuthenticatedLayout from "./components/AuthenticatedLayout";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route element={<AuthenticatedLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/share" element={<Share />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/security" element={<Security />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;