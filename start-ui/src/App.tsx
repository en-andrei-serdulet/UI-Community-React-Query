import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./home-dashboard";
import Info from "./info-dashboard/containers/Info";

import { navStyles as styles } from "./styles/navStyles";
import { BqTab, BqTabGroup } from "@bee-q/react";

function App() {
  return (
    <Router>
      <nav className={styles.nav}>
        <div className={styles.divContainer}>
          <BqTabGroup>
            <BqTab controls="" tabId="">
              <Link to="/" className={styles.link}>
                Home
              </Link>
            </BqTab>
            <BqTab controls="" tabId="">
              <Link to="/info" className={styles.link}>
                Info
              </Link>
            </BqTab>
          </BqTabGroup>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;
