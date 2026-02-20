import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Divider() {
  return (
    <div className="max-w-[980px] mx-auto px-6">
      <div className="h-px bg-ov-border-subtle" />
    </div>
  );
}

export function Layout() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <div className="relative min-h-screen bg-ov-bg-primary">
        <Navbar />
        <Outlet />
        <Divider />
        <Footer />
      </div>
    </SmoothScroll>
  );
}