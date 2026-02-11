import Menu from "./_react/Menu";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Hello Yose</h1>
        <p className="home-description">
          Your gateway to the cosmos. Explore astroports, manage docking
          operations, and navigate the stars.
        </p>

        <div className="home-steps">
          <div className="step">
            <div className="step-number">1</div>
            <span className="step-label">Explore</span>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <span className="step-label">Dock ships</span>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <span className="step-label">Travel</span>
          </div>
        </div>

        <Menu />
      </div>
    </div>
  );
}
