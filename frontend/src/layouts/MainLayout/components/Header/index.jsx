import "./Header.css";
import { Codepen } from "lucide-react";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <div className="header-logo-icon">
          <Codepen />
        </div>
        <div className="header-logo-text">
          <h1>Mola</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
