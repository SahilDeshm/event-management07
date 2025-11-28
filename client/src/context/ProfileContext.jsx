import { createContext, useContext, useEffect, useState } from "react";
import { getProfiles, createProfile } from "../api/profile.js";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);

  // load profiles on mount
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const res = await getProfiles();
    setProfiles(res);
  };

  const addProfile = async (name, timezone) => {
    const trimmed = name.trim();
    if (!trimmed) return null;

    // create in backend
    const created = await createProfile({ name: trimmed, timezone });

    // update state
    setProfiles(prev => [...prev, created]);

    return created; // for selecting it after creation (your current behavior)
  };

  return (
    <ProfileContext.Provider value={{ profiles, loadProfiles, addProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfilesContext = () => useContext(ProfileContext);
