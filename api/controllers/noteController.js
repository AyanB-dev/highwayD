import Note from '../models/note.models.js';

/**
 * @desc Get all notes for the authenticated user
 * @route GET /api/notes
 * @access Private (requires JWT)
 */
export const getNotes = async (req, res) => {
    try {
        // The user ID is added to the request object by the auth middleware
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error getting notes:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

/**
 * @desc Create a new note
 * @route POST /api/notes
 * @access Private (requires JWT)
 */
export const createNote = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Note content is required.' });
        }

        const newNote = await Note.create({
            content,
            user: req.user._id, // Assign the authenticated user's ID
        });

        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

/**
 * @desc Delete a note
 * @route DELETE /api/notes/:id
 * @access Private (requires JWT)
 */
export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);

        // Check if the note exists
        if (!note) {
            return res.status(404).json({ error: 'Note not found.' });
        }

        // Security check: Ensure the authenticated user owns the note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this note.' });
        }

        await note.deleteOne();

        res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Server error' });
    }
};