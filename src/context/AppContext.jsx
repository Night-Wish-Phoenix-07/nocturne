import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { SEED_CHARACTERS } from '../data/characters.js';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [mine, setMine] = useLocalStorage('nocturne.mine', []);
  const [favs, setFavs] = useLocalStorage('nocturne.favs', []);
  const [convos, setConvos] = useLocalStorage('nocturne.convos', {});
  const [prefs, setPrefs] = useLocalStorage('nocturne.prefs', { name: 'Guest', reduceMotion: false });

  const characters = useMemo(() => [...mine, ...SEED_CHARACTERS], [mine]);
  const getCharacter = (id) => characters.find((c) => c.id === id);

  const saveCharacter = (data) => {
    if (data.id && mine.some((c) => c.id === data.id)) {
      setMine((list) => list.map((c) => (c.id === data.id ? { ...c, ...data } : c)));
      return data.id;
    }
    const id = 'u' + Date.now();
    setMine((list) => [{ ...data, id, owner: 'me', score: 0, createdAt: Date.now() }, ...list]);
    return id;
  };
  const without = (o, id) => { const copy = { ...o }; delete copy[id]; return copy; };
  const deleteCharacter = (id) => {
    setMine((l) => l.filter((c) => c.id !== id));
    setFavs((l) => l.filter((f) => f !== id));
    setConvos((o) => without(o, id));
  };
  const toggleFav = (id) => setFavs((l) => (l.includes(id) ? l.filter((f) => f !== id) : [...l, id]));
  const setConvo = (id, messages) => setConvos((o) => ({ ...o, [id]: { messages, updatedAt: Date.now() } }));
  const deleteConvo = (id) => setConvos((o) => without(o, id));
  const resetAll = () => { setMine([]); setFavs([]); setConvos({}); };

  const value = { characters, mine, favs, convos, prefs, setPrefs, getCharacter, saveCharacter, deleteCharacter, toggleFav, setConvo, deleteConvo, resetAll };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
