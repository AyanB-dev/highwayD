import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

import DashboardHeader from '../components/DashboardHeader';
import SubmitButton from '../components/SubmitButton';
import WelcomeCard from '../components/WelcomeCard';
import NoteItem from '../components/NoteItem';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch notes from the backend
  const fetchNotes = async () => {
    if (!token) return; // Don't fetch if not authenticated

    setLoading(true);
    try {
      const response = await api.get('/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error('Failed to fetch notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]); // Fetch notes whenever the token changes

  const handleSignOut = () => {
    logout();
    navigate('/signin');
  };

  const handleCreateNote = async () => {
    const noteContent = prompt("Enter your new note:");
    if (!noteContent) return;

    setLoading(true);
    try {
      await api.post('/notes', { content: noteContent }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Note created successfully!');
      fetchNotes(); // Refresh the list of notes
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error(error.response?.data?.error || 'Failed to create note.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    setLoading(true);
    try {
      await api.delete(`/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Note deleted successfully!');
      fetchNotes(); // Refresh the list of notes
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error(error.response?.data?.error || 'Failed to delete note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onSignOut={handleSignOut} />

      <main className="space-y-6 p-4">
        <WelcomeCard name={user?.name} email={user?.email} />

        <SubmitButton onClick={handleCreateNote} isSubmitting={loading}>
          {loading ? 'Processing...' : 'Create Note'}
        </SubmitButton>

        <div className="space-y-4">
          <h2 className="text-xl font-medium text-[#232323]">Notes</h2>
          <div className="space-y-3">
            {loading ? (
              <p>Loading notes...</p>
            ) : notes.length > 0 ? (
              notes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={{ id: note._id, text: note.content }}
                  onDelete={handleDeleteNote}
                />
              ))
            ) : (
              <p>No notes found. Create your first note!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}