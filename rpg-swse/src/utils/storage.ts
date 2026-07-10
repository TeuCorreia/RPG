const USERS_KEY = 'rpg_swse_users';
const CHARACTERS_KEY = 'rpg_swse_characters';
const SESSION_KEY = 'rpg_swse_session';

export function getUsers(): { username: string; password: string }[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: { username: string; password: string }[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function saveSession(username: string): void {
  localStorage.setItem(SESSION_KEY, username);
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function migrateCharacter(c: any) {
  if (!c.classes) {
    c.classes = [{ name: c.heroicClass, level: c.level }];
  }
  if (c.notes === undefined) {
    c.notes = '';
  }
  return c;
}

export function getCharacters(userId: string) {
  const data = localStorage.getItem(CHARACTERS_KEY);
  const all = data ? JSON.parse(data) : {};
  return (all[userId] || []).map(migrateCharacter);
}

export function saveCharacter(userId: string, character: any): void {
  const data = localStorage.getItem(CHARACTERS_KEY);
  const all = data ? JSON.parse(data) : {};
  if (!all[userId]) all[userId] = [];
  const idx = all[userId].findIndex((c: any) => c.id === character.id);
  if (idx >= 0) all[userId][idx] = character;
  else all[userId].push(character);
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(all));
}

export function deleteCharacter(userId: string, characterId: string): void {
  const data = localStorage.getItem(CHARACTERS_KEY);
  const all = data ? JSON.parse(data) : {};
  if (all[userId]) {
    all[userId] = all[userId].filter((c: any) => c.id !== characterId);
    localStorage.setItem(CHARACTERS_KEY, JSON.stringify(all));
  }
}

export function getAllCharacters() {
  const data = localStorage.getItem(CHARACTERS_KEY);
  const all = data ? JSON.parse(data) : {};
  for (const userId of Object.keys(all)) {
    all[userId] = all[userId].map(migrateCharacter);
  }
  return all;
}
