import NexCartLogo from "../assets/NexCart-logo.png";
import "../styles/LoadingPage.css";

function LoadingPage() {
  return (
    <main className="nc-loading-page">
      {/* Background effects */}
      <div className="nc-loading-glow nc-loading-glow-one" />
      <div className="nc-loading-glow nc-loading-glow-two" />

      <section className="nc-loading-content">
        {/* Animated logo */}
        <div className="nc-loading-logo-wrapper">
          <div className="nc-loading-orbit" />
          <div className="nc-loading-logo">
            <img src={NexCartLogo} alt="NexCart Logo" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="nc-loading-title">
          Nex<span>Cart</span>
        </h1>

        <p className="nc-loading-subtitle">Your Store. Your Control.</p>

        {/* Progress bar */}
        <div className="nc-loading-progress">
          <div className="nc-loading-progress-fill" />
        </div>

        {/* Status */}
        <div className="nc-loading-status">
          <span className="nc-loading-dot" />
          <span>Preparing your dashboard...</span>
        </div>

        <p className="nc-loading-footer">
          SMARTER COMMERCE. SIMPLER MANAGEMENT.
        </p>
      </section>
    </main>
  );
}

export default LoadingPage;
