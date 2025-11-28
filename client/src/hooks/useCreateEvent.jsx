import { useState, useRef } from "react";
import { useEventsContext } from "../context/EventContext";
import { useProfilesContext } from "../context/ProfileContext";
import toast from "react-hot-toast";

export const useCreateEvent = () => {
  const { events, addEvent, editEvent, loadEvents } = useEventsContext();
  const { profiles, addProfile } = useProfilesContext();

  // ==== LOCAL STATES (moved from component) ====
  const [currentProfile, setCurrentProfile] = useState("");
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [timezone, setTimezone] = useState("America/New_York");
  const [viewTimezone, setViewTimezone] = useState("America/New_York");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("09:00");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProfile, setNewProfile] = useState("");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  const [logs, setLogs] = useState([]);

  const [openProfilesDropdown, setOpenProfilesDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [editingEvent, setEditingEvent] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);
const [viewingLogsEvent, setViewingLogsEvent] = useState(null);
const [showLogsModal, setShowLogsModal] = useState(false);

  const timezones = [
    "Asia/Kolkata",
    "America/New_York",
    "America/Chicago",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Dubai",
    "Asia/Singapore",
    "Australia/Sydney",
  ];

  // ---- Toggle profile selection ----
  const toggleProfile = (id) => {
    setSelectedProfiles(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // ---- Add Event ----
  const handleCreateEvent = async () => {
    if (!startDate || !endDate || selectedProfiles.length === 0) {
      toast.error("Please fill all details")
      return;
    }

    try {
      await addEvent({
        profiles: selectedProfiles,
        timezone,
        startDate,
        startTime,
        endDate,
        endTime,
      });
      toast.success("Event created")
      setSelectedProfiles([]);
      setStartDate("");
      setStartTime("09:00");
      setEndDate("");
      setEndTime("09:00");
    } catch (err) {
      toast.error("Issue creating an event")
    }
  };

  // ---- Add Profile ----
  const handleAddProfile = async () => {
    const trimmed = newProfile.trim();
    if (!trimmed) return;

    try {
      const created = await addProfile(trimmed, timezone);
      setSelectedProfiles(prev => [...prev, created._id]);
      setNewProfile("");
      setShowAddModal(false);
    } catch (err) {
      toast.error("Error adding profiles")
    }
  };

  // ---- Convert UTC → View Timezone ----
  const convertToTZ = (utcDate, tz) =>
    new Date(utcDate).toLocaleString("en-US", {
      timeZone: tz,
      hour12: false,
    });

return {
  // context data
  events,
  profiles,

  // state
  currentProfile, setCurrentProfile,
  selectedProfiles, setSelectedProfiles,
  timezone, setTimezone,
  viewTimezone, setViewTimezone,
  startDate, setStartDate,
  startTime, setStartTime,
  endDate, setEndDate,
  endTime, setEndTime,

  showAddModal, setShowAddModal,
  newProfile, setNewProfile,

  editingEvent, setEditingEvent,
  showEditModal, setShowEditModal,

  viewingLogsEvent, setViewingLogsEvent,
  showLogsModal, setShowLogsModal,

  logs, setLogs,

  openProfilesDropdown, setOpenProfilesDropdown,
  dropdownRef,

  timezones,

  // functions
  toggleProfile,
  handleCreateEvent,
  handleAddProfile,
  convertToTZ,

  // FIXED UPDATE HANDLER
  saveEditedEvent: async () => {
    if (!editingEvent || !editingEvent._id) return;

    await editEvent(editingEvent._id, editingEvent);
    await loadEvents(currentProfile);
    toast.success("Event updated")
    setShowEditModal(false);
  },

  loadEvents,
};

};
