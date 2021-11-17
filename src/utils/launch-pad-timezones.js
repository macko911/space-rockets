const LAUNCH_PAD_TIMEZONES = {
  "CCAFS SLC 40": "America/New_York",
  "KSC LC 39A": "America/New_York",
  "Kwajalein Atoll": "Pacific/Majuro",
  "STLS": "America/Chicago",
  "VAFB SLC 3W": "America/Los_Angeles",
  "VAFB SLC 4E": "America/Los_Angeles",
};

/**
 * Get timezone of a launchpad in IANA format accepted by Intl.DateTimeFormat.
 * Fallback to UTC if it doesn't find a match.
 */
export function getLaunchpadTimezone (launchPadName) {
  return LAUNCH_PAD_TIMEZONES[launchPadName] ?? "UTC";
}
