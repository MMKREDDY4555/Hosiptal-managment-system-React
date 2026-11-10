import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The requested page does not exist.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}