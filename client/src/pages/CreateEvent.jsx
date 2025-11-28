import React from "react";
import { Plus, ChevronDown, Calendar } from "lucide-react";
import EventBasicDetails from "./EventBasicDetails";
import { useCreateEvent } from "../hooks/useCreateEvent";

const CreateEvent = () => {
  const h = useCreateEvent();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Event Management</h1>
          </div>

          {/* Current profile select */}
          <select
            value={h.currentProfile}
            onChange={async (e) => {
              const id = e.target.value;
              h.setCurrentProfile(id);
              if (id) await h.loadEvents(id);
            }}
            className="border p-2 rounded-lg"
          >
            <option value="">Select current profile...</option>
            {h.profiles.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Create Event */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Create Event</h2>

            {/* PROFILES DROPDOWN — unchanged */}
            <div className="mb-6">
              <label className="block text-sm mb-2">Profiles</label>
              <div className="relative">
                <button
                  onClick={() => h.setOpenProfilesDropdown((s) => !s)}
                  className="w-full p-2 border rounded-lg flex justify-between"
                >
                  <span>
                    {h.selectedProfiles.length === 0
                      ? "Select profiles..."
                      : h.selectedProfiles
                        .map((id) => h.profiles.find((p) => p._id === id)?.name)
                        .join(", ")}
                  </span>
                  <ChevronDown />
                </button>

                {h.openProfilesDropdown && (
                  <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg p-3 z-20">
                    {h.profiles.map((p) => (
                      <label key={p._id} className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={h.selectedProfiles.includes(p._id)}
                          onChange={() => h.toggleProfile(p._id)}
                        />
                        {p.name}
                      </label>
                    ))}

                    <div className="flex justify-between mt-3 pt-3 border-t">
                      <button
                        onClick={() => {
                          h.setShowAddModal(true);
                          h.setOpenProfilesDropdown(false);
                        }}
                        className="text-purple-600 text-sm"
                      >
                        + Add People
                      </button>
                      <button
                        onClick={() => h.setOpenProfilesDropdown(false)}
                        className="text-sm text-gray-500"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BASIC DETAILS COMPONENT */}
            <EventBasicDetails
              timezone={h.timezone}
              setTimezone={h.setTimezone}
              timezones={h.timezones}
              startDate={h.startDate}
              setStartDate={h.setStartDate}
              startTime={h.startTime}
              setStartTime={h.setStartTime}
              endDate={h.endDate}
              setEndDate={h.setEndDate}
              endTime={h.endTime}
              setEndTime={h.setEndTime}
            />

            <button
              onClick={h.handleCreateEvent}
              className="w-full bg-purple-600 text-white py-3 rounded-lg"
            >
              <Plus className="inline" /> Create Event
            </button>
          </div>

          {/* EVENTS LIST — unchanged */}
          {/* EVENTS LIST */}
          {/* EVENTS LIST */}
          <div className="bg-white rounded-xl shadow-sm border p-6">

            {/* Header + Timezone Selector */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Events</h2>

              {/* TIMEZONE SELECT */}
              <select
                value={h.viewTimezone}
                onChange={(e) => h.setViewTimezone(e.target.value)}
                className="border p-2 rounded-lg text-sm"
              >
                {h.timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            {/* Event List */}
            <div className="space-y-4">
              {h.events.length === 0 ? (
                <p className="text-gray-500 text-center">No events found.</p>
              ) : (
                h.events.map((event) => (
                  <div key={event._id} className="border p-4 rounded-lg">

                    {/* Top Row: Profiles + Event Timezone */}
                    <div className="flex justify-between">
                      <div className="flex flex-wrap gap-1">
                        {event.profiles.map((id) => (
                          <span
                            key={id}
                            className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs mr-1"
                          >
                            {h.profiles.find((p) => p._id === id)?.name}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs text-gray-500">{event.timezone}</span>
                    </div>

                    {/* Converted Time */}
                    <div className="mt-2 text-sm text-gray-700">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      {h.convertToTZ(event.startTimeUTC, h.viewTimezone)} →{" "}
                      {h.convertToTZ(event.endTimeUTC, h.viewTimezone)}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => {
                          h.setEditingEvent(event);
                          h.setShowEditModal(true);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          h.setViewingLogsEvent(event);
                          h.setLogs(event.logs);
                          h.setShowLogsModal(true);
                        }}

                        className="px-3 py-1 bg-gray-800 text-white rounded text-sm"
                      >
                        View Logs
                      </button>

                    </div>

                  </div>
                ))
              )}
            </div>
          </div>


        </div>

      {h.showAddModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-80 shadow-lg">

      <h2 className="text-lg font-semibold mb-4">Add New Person</h2>

      <input
        type="text"
        value={h.newProfile}
        onChange={(e) => h.setNewProfile(e.target.value)}
        placeholder="Enter name..."
        className="w-full border p-2 rounded mb-4"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => h.setShowAddModal(false)}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={h.handleAddProfile}
          className="px-3 py-1 bg-purple-600 text-white rounded"
        >
          Add
        </button>
      </div>

    </div>
  </div>
)}


        {h.showEditModal && h.editingEvent && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Event</h2>

              {/* --- Profiles --- */}
              <label className="block text-sm mb-2">Profiles</label>
              {h.profiles.map((p) => (
                <label key={p._id} className="flex gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={h.editingEvent.profiles.includes(p._id)}
                    onChange={() => {
                      h.setEditingEvent((prev) => {
                        const exists = prev.profiles.includes(p._id);
                        return {
                          ...prev,
                          profiles: exists
                            ? prev.profiles.filter(id => id !== p._id)
                            : [...prev.profiles, p._id],
                        };
                      });
                    }}
                  />
                  {p.name}
                </label>
              ))}

              {/* --- Timezone --- */}
              <label className="block text-sm mt-4 mb-2">Timezone</label>
              <select
                value={h.editingEvent.timezone}
                onChange={(e) =>
                  h.setEditingEvent((prev) => ({
                    ...prev,
                    timezone: e.target.value
                  }))
                }
                className="w-full border p-2 rounded"
              >
                {h.timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>

              {/* --- Start Time --- */}
              <label className="block text-sm mt-4 mb-2">Start Time</label>
              <input
                type="datetime-local"
                value={h.editingEvent.startTimeUTC?.slice(0, 16)}
                onChange={(e) =>
                  h.setEditingEvent((prev) => ({
                    ...prev,
                    startTimeUTC: new Date(e.target.value).toISOString(),
                  }))
                }
                className="w-full border p-2 rounded mb-4"
              />

              {/* --- End Time --- */}
              <label className="block text-sm mb-2">End Time</label>
              <input
                type="datetime-local"
                 min={h.editingEvent.startTimeUTC?.slice(0, 16)}
                value={h.editingEvent.endTimeUTC?.slice(0, 16)}
                onChange={(e) =>
                  h.setEditingEvent((prev) => ({
                    ...prev,
                    endTimeUTC: new Date(e.target.value).toISOString(),
                  }))
                }
                className="w-full border p-2 rounded mb-4"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => h.setShowEditModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={h.saveEditedEvent}
                  className="px-4 py-1 bg-blue-600 text-white rounded"
                >
                  Save
                </button>

              </div>
            </div>
          </div>
        )}



        {/* ================= LOGS MODAL ================= */}
        {/* LOGS MODAL */}
        {h.showLogsModal && h.viewingLogsEvent && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[450px] shadow-lg">

              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Event Update History</h2>

                <button
                  onClick={() => h.setShowLogsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Logs List */}
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {h.logs.length === 0 ? (
                  <p className="text-gray-500 text-center">No logs available.</p>
                ) : (
                  h.logs.map((log) => (
                    <div
                      key={log._id}
                      className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                    >
                      {/* Timestamp */}
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="mr-2">🕒</span>
                        {new Date(log.timestamp).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>

                      {/* Message */}
                      <p className="text-gray-800 text-sm">
                        {log.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        )}



      </div>
    </div>
  );
};

export default CreateEvent;
