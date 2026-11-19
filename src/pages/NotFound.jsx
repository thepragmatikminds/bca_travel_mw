import { Link } from "@/lib/router";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-extrabold">We can’t find that page</h1>
      <p className="mt-3 text-ink-600">It may have moved. Let’s get you back on the road.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn btn-primary">Go home</Link>
        <Link to="/book" className="btn btn-outline">Request a booking</Link>
      </div>
    </div>
  );
}
