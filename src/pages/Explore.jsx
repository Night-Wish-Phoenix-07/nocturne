import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORIES } from '../data/characters.js';
import CharacterCard from '../components/CharacterCard.jsx';
import Section from '../components/Section.jsx';

export default function Explore() {
  const { characters } = useApp();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = params.get('cat') || '';
  const update = (k, v) => { const p = new URLSearchParams(params); if (v) p.set(k, v); else p.delete(k); setParams(p, { replace: true }); };
  const pub = characters.filter((c) => c.visibility === 'public');
  const list = pub.filter((c) =>
    (!cat || c.category === cat) &&
    (c.name + c.description + c.personality).toLowerCase().includes(q.toLowerCase()));
  const filtering = q || cat;
  return (
    <>
      <h1>Explore</h1>
      <div className="search">
        <Search size={18} />
        <input value={q} onChange={(e) => update('q', e.target.value)} placeholder="Search by name or personality" aria-label="Search" />
      </div>
      <div className="chips">
        <button className={`chip ${!cat ? 'on' : ''}`} onClick={() => update('cat', '')}>All</button>
        {CATEGORIES.map((c) => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => update('cat', c)}>{c}</button>)}
      </div>
      {!filtering && <Section title="Trending" items={[...pub].sort((a, b) => b.score - a.score).slice(0, 4)} />}
      <section className="section">
        <h2>{filtering ? `${list.length} result${list.length === 1 ? '' : 's'}` : 'All characters'}</h2>
        {list.length ? <div className="grid">{list.map((c) => <CharacterCard key={c.id} c={c} />)}</div>
          : <div className="empty"><p>No characters match. Try another word or category.</p></div>}
      </section>
    </>
  );
}
