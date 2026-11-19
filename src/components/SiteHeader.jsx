import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "@/lib/router";
import Logo from "@/components/Logo";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Book", to: "/book" },
  { label: "Contact", to: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const linkClass = (active) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
      active ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-brand-50 hover:text-brand-700"
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-xl">
      <div className="container-page flex h-[68px] items-center justify-between gap-4">
        <Link to="/" aria-label="BCA Travel home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/book" className="btn btn-primary !py-2.5">
            Request a booking
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-line md:hidden"
        >
          {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>

      <div id="mobile-nav" className={cn("border-t border-line bg-white md:hidden", open ? "block" : "hidden")}>
        <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={(active) =>
                cn("rounded-xl px-3 py-3 text-[15px] font-semibold", active ? "bg-brand-50 text-brand-700" : "hover:bg-brand-50")
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/book" className="btn btn-primary mt-2">
            Request a booking
          </Link>
        </nav>
      </div>
    </header>
  );
}
