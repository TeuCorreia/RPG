import { useState, useCallback } from 'react';
import type { Character } from '../types';
import { getCharacters, saveCharacter, deleteCharacter as delChar } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';
import { generateId } from '../utils/calculations';

export function useCharacters() {
  const { user } = useAuth();
  const [characters, setCharacters] = useState<Character[]>(() => {
    if (!user) return [];
    return getCharacters(user);
  });

  const refresh = useCallback(() => {
    if (!user) return [];
    const list = getCharacters(user);
    setCharacters(list);
    return list;
  }, [user]);

  const create = useCallback((data: Omit<Character, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return null;
    const now = Date.now();
    const character: Character = {
      ...data,
      id: generateId(),
      userId: user,
      createdAt: now,
      updatedAt: now,
    };
    saveCharacter(user, character);
    refresh();
    return character;
  }, [user, refresh]);

  const update = useCallback((character: Character) => {
    if (!user) return;
    character.updatedAt = Date.now();
    saveCharacter(user, character);
    refresh();
  }, [user, refresh]);

  const remove = useCallback((id: string) => {
    if (!user) return;
    delChar(user, id);
    refresh();
  }, [user, refresh]);

  const getById = useCallback((id: string): Character | undefined => {
    return characters.find(c => c.id === id);
  }, [characters]);

  return { characters, refresh, create, update, remove, getById };
}
