// DEMO ENGINE: canned replies, NOT a real AI model.
// Milestone 6 replaces this with a secure Firebase Cloud Function.
const pick = (list) => list[Math.floor(Math.random() * list.length)];

export function demoReply(c, userText) {
  const t = userText.toLowerCase();
  if (/\b(hi|hello|hey)\b/.test(t)) return pick([`Hello again! ${c.name} is glad you are here.`, 'Hey you. What shall we talk about?']);
  if (/(who are you|your name|about you)/.test(t)) return `I am ${c.name}. ${c.description} ${c.background}`;
  if (/(story|tale|adventure)/.test(t)) return `A story? Gladly. ${c.background} Where should the next chapter begin?`;
  if (/(thank|thanks)/.test(t)) return 'Always. Walking this path with you is a pleasure.';
  if (t.trim().endsWith('?')) return pick(['Hmm, good question. Tell me what you believe first.', 'A fine thing to wonder about. What made you ask?']);
  return pick(['Interesting. Tell me more about that.', 'I hear you. And then what happened?', 'That sounds like the start of something. Shall we follow it?']);
}
