import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "@/lib/router";
import Logo from "@/components/Logo";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Book a service", to: "/book" },
  { label: "Services", to: "/services" },
  { label: "Destinations", to: "/#destinations" },
  { label: "Contact", to: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => setOpen(false), [pathname, hash]);

  const desktopLink = (active) =>
    cn("rounded-full px-4 py-2 text-sm font-semibold transition-colors", active ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:text-ink-900");

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-xl">
      <div className="container-page flex h-[66px] items-center justify-between gap-4">
        <Link to="/" aria-label="BCA Travel home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) =>
            item.to.includes("#") ? (
              <Link key={item.to} to={item.to} className={desktopLink(false)}>
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.to} to={item.to} className={desktopLink}>
                {item.label}
              </NavLink>
            )
          )}
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
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white md:hidden"
        >
          {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>

      <div id="mobile-nav" className={cn("border-t border-line bg-paper md:hidden", open ? "block" : "hidden")}>
        <nav className="container-page flex flex-col py-2" aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="border-b border-line/70 py-4 text-[17px] font-medium last:border-0">
              {item.label}
            </Link>
          ))}
          <Link to="/book" className="btn btn-primary my-4">
            Request a booking
          </Link>
        </nav>
      </div>
    </header>
  );
}
