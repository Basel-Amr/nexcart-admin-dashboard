import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <main className="nc-notfound-page">
      {/* Background effects */}
      <div className="nc-notfound-glow nc-notfound-glow-one" />
      <div className="nc-notfound-glow nc-notfound-glow-two" />

      <section className="nc-notfound-content">
        {/* Error illustration */}
        <div className="nc-notfound-illustration">
          <div className="nc-notfound-circle">
            <i className="fa-solid fa-compass" />
          </div>

          <span className="nc-notfound-number">404</span>
        </div>

        {/* Message */}
        <div className="nc-notfound-message">
          <span className="nc-notfound-label">
            <span className="nc-notfound-label-dot" />
            PAGE NOT FOUND
          </span>

          <h1>
            Oops! Lost in <span>Space?</span>
          </h1>

          <p>
            The page you're looking for doesn't exist or may have been moved.
            Don't worry, let's get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="nc-notfound-actions">
          <Link to="/" className="nc-notfound-home-button">
            <i className="fa-solid fa-house" />
            <span>Back to Dashboard</span>
            <i className="fa-solid fa-arrow-right nc-notfound-arrow" />
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="nc-notfound-back-button"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <div className="nc-notfound-footer">
          <span>NexCart</span>
          <span className="nc-notfound-footer-divider" />
          <span>SMARTER COMMERCE. SIMPLER MANAGEMENT.</span>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
