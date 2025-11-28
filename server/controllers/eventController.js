import {Event} from "../models/Event.js";
import {Profile} from "../models/Profile.js";
import {convertTimeZone} from "../utils/timezone.js"

export const createEvent = async (req, res) => {
    try {
        const {
            profiles,
            startDate,
            startTime,
            endDate,
            endTime,
            timezone
        } = req.body;

        if (!profiles || profiles.length === 0)
            return res.status(400).json({ message: "Profiles required" });

        // Build local Datetime
        const startLocal = new Date(`${startDate}T${startTime}:00`);
        const endLocal = new Date(`${endDate}T${endTime}:00`);

        if (endLocal <= startLocal)
            return res.status(400).json({ message: "End time cannot be before start time" });

        // Convert to UTC
        const startUTC = startLocal.toISOString();
        const endUTC = endLocal.toISOString();

        // Save in DB
        const event = await Event.create({
            profiles,
            startTimeUTC: startUTC,
            endTimeUTC: endUTC,
        });

        return res.status(201).json(event);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};


export const getEventByProfile = async (req , res) => {
    try {
        const profileId =req.params.profileId;

        const profile = await Profile.findById(profileId);
        if(!profile) return res.status(404).json({error: "Profile not found"});

        const events = await Event.find({ profiles: profileId});

        //here I am converting the time from utc to normal because it will become simpler for future operations
        const convertedEvents = events.map(event => ({
            ...event._doc,
            startTime : convertTimeZone(event.startTimeUTC , profile.timeZone),
            endTime: convertTimeZone(event.endTimeUTC , profile.timeZone)
        }));

        console.log(convertTimeZone);
        res.json(convertedEvents);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateEvent = async (req, res) => {
  try {
    console.log("UPDATE EVENT HIT:", req.params.id, req.body);

    const { id } = req.params;

    const oldEvent = await Event.findById(id);
    if (!oldEvent) {
      console.log("EVENT NOT FOUND");
      return res.status(404).json({ message: "Event not found" });
    }

    const changes = [];

    // PROFILES
    if (req.body.profiles) {
      console.log("Existing profiles:", oldEvent.profiles);
      console.log("New profiles:", req.body.profiles);

      const before = oldEvent.profiles.map(x => x.toString());
      const after = req.body.profiles;

      if (JSON.stringify(before) !== JSON.stringify(after)) {
        console.log("PROFILE CHANGE DETECTED!");
        changes.push(`Profiles changed`);
        oldEvent.profiles = after;
      }
    }

    // START TIME
    if (req.body.startTimeUTC) {
      console.log("OLD start:", oldEvent.startTimeUTC);
      console.log("NEW start:", req.body.startTimeUTC);

      if (req.body.startTimeUTC !== oldEvent.startTimeUTC.toISOString()) {
        console.log("START TIME CHANGE DETECTED!");
        changes.push(`Start time changed`);
        oldEvent.startTimeUTC = req.body.startTimeUTC;
      }
    }

    // END TIME
    if (req.body.endTimeUTC) {
      console.log("OLD end:", oldEvent.endTimeUTC);
      console.log("NEW end:", req.body.endTimeUTC);

      if (req.body.endTimeUTC !== oldEvent.endTimeUTC.toISOString()) {
        console.log("END TIME CHANGE DETECTED!");
        changes.push(`End time changed`);
        oldEvent.endTimeUTC = req.body.endTimeUTC;
      }
    }

    console.log("CHANGES ARRAY:", changes);

    // ADD LOGS IF CHANGES DETECTED
    if (changes.length > 0) {
      console.log("ADDING LOGS...");
      changes.forEach(msg => {
        oldEvent.logs.push({
          message: msg,
          timestamp: new Date()
        });
      });
    } else {
      console.log("NO CHANGES DETECTED");
    }

    await oldEvent.save();
    console.log("EVENT SAVED WITH LOGS:", oldEvent.logs);

    return res.json(oldEvent);
  } catch (err) {
    console.error("ERROR IN updateEvent:", err);
    return res.status(500).json({ error: err.message });
  }
};



