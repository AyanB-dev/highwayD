import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

import DashboardHeader from '../components/DashboardHeader';
import SubmitButton from '../components/SubmitButton';
import WelcomeCard from '../components/WelcomeCard';
import NoteItem from '../components/NoteItem';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get the real user and logout function from context

  // Dummy data for notes - this will be replaced next
  const [notes, setNotes] = useState([
    { id: 1, text: 'Note 1' },
    { id: 2, text: 'Note 2' },
  ]);

  const handleSignOut = () => {
    logout();
    navigate('/signin');
  };

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

  const handleDeleteNote = (noteIdToDelete) => {
    setNotes(notes.filter(note => note.id !== noteIdToDelete));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pass the handleSignOut function to the header */}
      <DashboardHeader onSignOut={handleSignOut} />

      <main className="space-y-6 p-4">
        {/*
          The WelcomeCard now receives the real user's name and email.
          The `user?` syntax prevents an error if the user object is momentarily null.
        */}
        <WelcomeCard name={user?.name} email={user?.email} />

        <SubmitButton onClick={handleCreateNote}>Create Note</SubmitButton>

        <div className="space-y-4">
          <h2 className="text-xl font-medium text-[#232323]">Notes</h2>
          <div className="space-y-3">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note} onDelete={handleDeleteNote} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}