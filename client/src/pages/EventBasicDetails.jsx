const EventBasicDetails = ({
  timezone,
  setTimezone,
  timezones,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
}) => {
  return (
    <>
      {/* Timezone */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl"
        >
          {timezones.map((tz) => (
            <option key={tz}>{tz}</option>
          ))}
        </select>
      </div>

      {/* Start */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Start</label>
        <div className="flex gap-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-32 border rounded-lg p-2"
          />
        </div>
      </div>


      {/* End */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">End</label>
        <div className="flex gap-3">
          <input
            type="date"
            value={endDate}
            min={startDate}                 
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-32 border rounded-lg p-2"
            disabled={!endDate}           
          />
        </div>
      </div>

    </>
  );
};

export default EventBasicDetails;
