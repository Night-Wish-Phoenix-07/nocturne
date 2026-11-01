import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Moon, Menu, X } from 'lucide-react';

const LINKS = [
  ['/', 'Home'], ['/explore', 'Explore'], ['/create', 'Create'],
  ['/library', 'My library'], ['/history', 'History'], ['/settings', 'Settings'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <Link to="/" className="logo" onClick={() => setOpen(false)}><Moon size={22} /> NOCTURNE</Link>
      <button className="icon-btn menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'open' : ''}>
        {LINKS.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
      </nav>
    </header>
  );
}
