import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SubmitButton from '../components/SubmitButton';
import WelcomeCard from '../components/WelcomeCard';
import NoteItem from '../components/NoteItem';

export default function Dashboard() {
  const user = {
    name: 'Jonas Kahnwald',
    email: 'xxxxxx@xxxx.com',
  };

  const [notes, setNotes] = useState([
    { id: 1, text: 'Note 1' },
    { id: 2, text: 'Note 2' },
  ]);

  const handleCreateNote = () => {
    const noteText = prompt("Enter your new note:");
    if (noteText) {
      const newNote = {
        id: Date.now(),
        text: noteText,
      };
      setNotes([...notes, newNote]);
    }
  };

  // 1. Add the delete function
  const handleDeleteNote = (noteIdToDelete) => {
    // This creates a new list containing all notes except the one to be deleted
    setNotes(notes.filter(note => note.id !== noteIdToDelete));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="space-y-6 p-4">
        <WelcomeCard name={user.name} email={user.email} />

        <SubmitButton onClick={handleCreateNote}>Create Note</SubmitButton>

        <div className="space-y-4">
          <h2 className="text-xl font-medium text-[#232323]">Notes</h2>
          <div className="space-y-3">
            {notes.map((note) => (
              // 2. Pass the delete function as a prop
              <NoteItem key={note.id} note={note} onDelete={handleDeleteNote} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}