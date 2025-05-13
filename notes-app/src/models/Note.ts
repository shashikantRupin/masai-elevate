export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
}

export const getNotes = (): Note[] => {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

export const getUserNotes = (userId: string): Note[] => {
  const allNotes = getNotes();
  return allNotes.filter(note => note.userId === userId);
};

export const createNote = (userId: string, title: string, content: string): Note => {
  const allNotes = getNotes();
  
  const newNote: Note = {
    id: `note_${Math.random().toString(36).substring(2)}`,
    userId,
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  
  allNotes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(allNotes));
  
  return newNote;
};

export const deleteNote = (noteId: string): boolean => {
  const allNotes = getNotes();
  const updatedNotes = allNotes.filter(note => note.id !== noteId);
  
  if (updatedNotes.length === allNotes.length) {
    return false;
  }
  
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  return true;
};