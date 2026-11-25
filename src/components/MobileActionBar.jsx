import { Link, useLocation } from "@/lib/router";
import { PhoneIcon, SendIcon } from "@/components/Icons";
import { SITE } from "@/config/site";

// Phone-only bar that keeps "call" and "request a booking" one tap away.
export default function MobileActionBar() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/book")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/92 px-3 pb-[calc(env(safe-area-inset-bottom)+0.6rem)] pt-2.5 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md gap-2.5">
        <a href={`tel:${SITE.phones[0].tel}`} className="btn btn-outline flex-1 !px-3 !py-3">
          <PhoneIcon size={17} /> Call us
        </a>
        <Link to="/book" className="btn btn-primary flex-[1.4] !px-3 !py-3">
          <SendIcon size={17} /> Request booking
        </Link>
      </div>
    </div>
  );
}
