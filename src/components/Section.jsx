import { Link } from 'react-router-dom';
import CharacterCard from './CharacterCard.jsx';

export default function Section({ title, items, more }) {
  if (!items.length) return null;
  return (
    <section className="section">
      <div className="row"><h2>{title}</h2>{more && <Link to={more} className="link">See all</Link>}</div>
      <div className="grid">{items.map((c) => <CharacterCard key={c.id} c={c} />)}</div>
    </section>
  );
}
