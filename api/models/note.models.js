import mongoose from 'mongoose';

// Define the schema for a Note
const noteSchema = new mongoose.Schema({
    // The content or text of the note
    content: {
        type: String,
        required: true,
    },
    // Reference to the User model, linking the note to a specific user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 'User' is the name of the model we are referencing
        required: true,
    },
}, { timestamps: true }); // This option adds 'createdAt' and 'updatedAt' fields automatically

// Create the Note model from the schema
const Note = mongoose.model('Note', noteSchema);

export default Note;