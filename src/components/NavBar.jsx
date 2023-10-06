import { NavLink } from "react-router-dom";
import Logo from "../images/logo.png";

const NavBar = ({ cartData }) => {
  return (
    <div className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar px-0 py-4 navbar-expand-lg navbar-light bg-white">
          <NavLink
            className="navbar-brand position-absolute m-0 p-0"
            to="/"
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "50%",
              backgroundImage: `url("${Logo}")`,
              backgroundSize: "cover",
              width: "100px",
              height: "75px",
              textIndent: "110%",
              overflow: "hidden",
            }}
          >
            KeyInLife
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse bg-white custom-header-md-open"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <NavLink className="nav-link ps-0" to="/products">
                產品列表
              </NavLink>
            </ul>
          </div>
          <div className="d-flex">
            <NavLink className="nav-link position-relative" to="/cart">
              <i className="bi bi-cart-fill fs-4"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartData?.carts?.length}
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
