import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <h1>
        <Link to="/">NASA Image Directory</Link>
      </h1>
      <nav>
        <NavLink to="/" end>
          Search
        </NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
      </nav>
    </header>
  );
}

export default Header;
