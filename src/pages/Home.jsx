import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORIES } from '../data/characters.js';
import Section from '../components/Section.jsx';

export default function Home() {
  const { characters } = useApp();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const pub = characters.filter((c) => c.visibility === 'public');
  const featured = pub.slice(0, 3);
  const trending = [...pub].sort((a, b) => b.score - a.score).slice(0, 4);
  const recent = [...pub].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  const go = (e) => { e.preventDefault(); nav(`/explore?q=${encodeURIComponent(q)}`); };
  return (
    <>
      <section className="hero">
        <h1>Beyond imagination.<br />Meet your next story.</h1>
        <p className="muted">Step into worlds of fantasy, mystery and friendship. Talk with characters, or create your own.</p>
        <form className="search" onSubmit={go}>
          <Search size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search characters" aria-label="Search characters" />
          <button className="btn small" type="submit">Search</button>
        </form>
        <Link to="/explore" className="btn glow"><Compass size={18} /> Explore characters</Link>
      </section>
      <Section title="Featured" items={featured} />
      <Section title="Trending" items={trending} more="/explore" />
      <Section title="Recently added" items={recent} more="/explore" />
      <section className="section">
        <h2>Popular categories</h2>
        <div className="chips">
          {CATEGORIES.map((c) => <Link key={c} className="chip" to={`/explore?cat=${c}`}>{c}</Link>)}
        </div>
      </section>
    </>
  );
}
