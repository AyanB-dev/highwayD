// 1. Receive the onDelete prop
export default function NoteItem({ note, onDelete }) {
    const handleDelete = () => {
        // 2. Call the onDelete function passed from the parent, with the note's ID
        onDelete(note.id);
    };

    return (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-[#232323]">{note.text}</p>
            <button onClick={handleDelete} className="p-1">
                {/* Using custom delete SVG icon */}
                <img src="/delete-icon.svg" alt="Delete note" className="h-6 w-6" />
            </button>
        </div>
    );
}