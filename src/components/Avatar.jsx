import { useState } from 'react';

export default function Avatar({ c, size = 56 }) {
  const [broken, setBroken] = useState(false);
  const style = { width: size, height: size, fontSize: size * 0.5 };
  if (c.image && !broken) {
    return <img className="avatar" style={style} src={c.image} alt={c.name} onError={() => setBroken(true)} />;
  }
  const h = c.hue ?? 260;
  const bg = `linear-gradient(135deg, hsl(${h} 70% 45%), hsl(${(h + 50) % 360} 70% 22%))`;
  return <div className="avatar" style={{ ...style, background: bg }} aria-label={c.name}>{c.emoji || c.name[0]}</div>;
}
