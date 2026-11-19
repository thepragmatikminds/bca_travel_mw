import { Router, Routes } from "@/lib/router";
import SiteLayout from "@/components/SiteLayout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Book from "@/pages/Book";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const ROUTES = [
  { path: "/", element: <Home /> },
  { path: "/services", element: <Services /> },
  { path: "/book", element: <Book /> },
  { path: "/contact", element: <Contact /> },
];

export default function App() {
  return (
    <Router>
      <SiteLayout>
        <Routes routes={ROUTES} fallback={<NotFound />} />
      </SiteLayout>
    </Router>
  );
}
