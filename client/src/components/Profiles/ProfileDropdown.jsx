import { useState, useRef } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useProfilesContext } from "../../context/ProfileContext.jsx";
import { useClickOutside } from "../../hooks/useClickOutside.js";

export default function ProfileDropdown({ selectedProfiles, setSelectedProfiles, openAddModal }) {
  const { profiles } = useProfilesContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  const toggleProfile = (id) => {
    setSelectedProfiles((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Profiles</label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {selectedProfiles.length === 0 ? (
              <span className="text-gray-400">Select profiles…</span>
            ) : (
              selectedProfiles.map((id) => {
                const profile = profiles.find((p) => p._id === id);
                return (
                  <span key={id} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    {profile?.name}
                  </span>
                );
              })
            )}
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </button>

        {open && (
          <div className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3">
            <div className="max-h-44 overflow-auto">
              {profiles.map((profile) => (
                <label
                  key={profile._id}
                  className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedProfiles.includes(profile._id)}
                    onChange={() => toggleProfile(profile._id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{profile.name}</span>
                </label>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  openAddModal();
                  setOpen(false);
                }}
                className="text-sm px-3 py-2 rounded-lg bg-purple-50 text-purple-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add People…
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500 px-3 py-2 rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
