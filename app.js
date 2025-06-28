const citiesToZones = {
  "new york": "America/New_York",
  london: "Europe/London",
  delhi: "Asia/Kolkata",
  tokyo: "Asia/Tokyo",
  sydney: "Australia/Sydney",
  "san francisco": "America/Los_Angeles",
  berlin: "Europe/Berlin",
  paris: "Europe/Paris",
  dubai: "Asia/Dubai",
  chicago: "America/Chicago",
};

function getAvailabilityRange(zone) {
  const { DateTime } = luxon;
  const start = DateTime.fromObject({ hour: 9 }, { zone });
  const end = DateTime.fromObject({ hour: 20 }, { zone });
  return {
    startUTC: start.toUTC(),
    endUTC: end.toUTC(),
  };
}

function findOverlap(utcRanges) {
  let latestStart = utcRanges[0].startUTC;
  let earliestEnd = utcRanges[0].endUTC;

  for (let i = 1; i < utcRanges.length; i++) {
    if (utcRanges[i].startUTC > latestStart) {
      latestStart = utcRanges[i].startUTC;
    }
    if (utcRanges[i].endUTC < earliestEnd) {
      earliestEnd = utcRanges[i].endUTC;
    }
  }

  if (latestStart >= earliestEnd) {
    return null; // No overlap
  }

  return { startUTC: latestStart, endUTC: earliestEnd };
}

function displayResults(cities) {
  const { DateTime } = luxon;
  const output = document.getElementById("output");
  output.innerHTML = "";

  const ranges = [];

  for (let city of cities) {
    const zone = citiesToZones[city.toLowerCase()];
    if (!zone) {
      output.innerHTML = `<p class="text-red-600">Unsupported city: <strong>${city}</strong></p>`;
      return;
    }
    const range = getAvailabilityRange(zone);
    ranges.push({ city, zone, ...range });
  }

  const overlap = findOverlap(ranges);

  if (!overlap) {
    output.innerHTML = `
            <div class="text-red-600 font-semibold mb-2">
              ❌ No common meeting time found between 9 AM – 8 PM for all cities.
            </div>
            <p class="text-gray-700">
              Try removing a city or adjusting the availability window in a future version.
            </p>`;
    return;
  }

  const list = document.createElement("ul");
  list.className = "list-disc pl-6 space-y-1";

  ranges.forEach(({ city, zone }) => {
    const localStart = overlap.startUTC.setZone(zone).toFormat("h:mm a");
    const localEnd = overlap.endUTC.setZone(zone).toFormat("h:mm a");
    const li = document.createElement("li");
    li.textContent = `${city}: ${localStart} – ${localEnd}`;
    list.appendChild(li);
  });

  output.innerHTML = `<h3 class="text-lg font-bold mb-2"> Common Meeting Time:</h3>`;
  output.appendChild(list);
}

function handleSubmit() {
  const input = document.getElementById("cityInput").value;
  const cities = input
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  const output = document.getElementById("output");
  if (cities.length < 2) {
    output.innerHTML = `<p class="text-red-600">Please enter at least two cities.</p>`;
    return;
  }

  displayResults(cities);
}
