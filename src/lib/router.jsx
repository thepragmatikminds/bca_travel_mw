// A deliberately tiny History-API router. The site has a handful of pages and no data loading,
// so this avoids an extra dependency. Cloudflare's single-page-application fallback serves index.html
// for every path, which makes deep links like /book work.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);

const readLocation = () => ({
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
});

export function Router({ children }) {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const onPop = () => setLocation(readLocation());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to, { replace = false, scroll = true } = {}) => {
    const url = new URL(to, window.location.href);
    const next = url.pathname + url.search + url.hash;
    if (replace) window.history.replaceState(null, "", next);
    else window.history.pushState(null, "", next);
    setLocation(readLocation());
    if (scroll) {
      if (url.hash) {
        setTimeout(() => document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView(), 50);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("Router is missing");
  return ctx;
};

export const useLocation = () => useRouter().location;
export const useNavigate = () => useRouter().navigate;
export const useSearchParams = () => {
  const { search } = useRouter().location;
  return useMemo(() => new URLSearchParams(search), [search]);
};

const isExternal = (to) => /^(https?:|mailto:|tel:)/.test(to);

export function Link({ to, replace, scroll, onClick, children, ...rest }) {
  const navigate = useNavigate();
  if (isExternal(to)) {
    return (
      <a href={to} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    navigate(to, { replace, scroll });
  };
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

// className may be a string or a function receiving isActive.
export function NavLink({ to, className, end = false, ...rest }) {
  const { pathname } = useLocation();
  const clean = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
  const isActive = end || to === "/" ? clean(pathname) === to : clean(pathname).startsWith(to);
  const cls = typeof className === "function" ? className(isActive) : className;
  return <Link to={to} className={cls} aria-current={isActive ? "page" : undefined} {...rest} />;
}

export function Routes({ routes, fallback }) {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const match = routes.find((r) => r.path === path);
  return match ? match.element : fallback;
}
