import { useState } from "react";
import { Clock } from "lucide-react";
import { useProfilesContext } from "../../context/ProfileContext.jsx";

export default function AddProfileModal({ isOpen, onClose, onCreated }) {
  const { addProfile } = useProfilesContext();

  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("UTC"); // you can make dynamic later
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    setLoading(true);

    const created = await addProfile(trimmed, timezone);

    setLoading(false);

    if (created) {
      onCreated(created); // tells parent to select this new profile
      setName("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Add New Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter profile name"
              autoFocus
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <div className="flex items-center gap-2 border border-gray-300 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{timezone}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving…" : "Add Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
