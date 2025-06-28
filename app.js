const citiesToZones = {
  "new york": "America/New_York",
  london: "Europe/London",
  delhi: "Asia/Kolkata",
  tokyo: "Asia/Tokyo",
  sydney: "Australia/Sydney",
  "san francisco": "America/Los_Angeles",
  berlin: "Europe/Berlin",
};

function getTimeRange(zone) {
  const { DateTime } = luxon;
  const start = DateTime.fromObject({ hour: 9 }, { zone });
  const end = DateTime.fromObject({ hour: 20 }, { zone });
  return {
    startUTC: start.toUTC(),
    endUTC: end.toUTC(),
  };
}

function findOverlap(ranges) {
  let maxStart = ranges[0].startUTC;
  let minEnd = ranges[0].endUTC;

  for (let r of ranges.slice(1)) {
    if (r.startUTC > maxStart) maxStart = r.startUTC;
    if (r.endUTC < minEnd) minEnd = r.endUTC;
  }

  if (maxStart >= minEnd) return null;
  return { startUTC: maxStart, endUTC: minEnd };
}

function displayResults(cities) {
  const { DateTime } = luxon;
  const ranges = [];

  for (let city of cities) {
    const zone = citiesToZones[city.toLowerCase()];
    if (!zone) {
      alert("Unsupported city: " + city);
      return;
    }
    ranges.push({ city, zone, ...getTimeRange(zone) });
  }

  const overlap = findOverlap(ranges);
  const output = document.getElementById("output");
  output.innerHTML = "";

  if (!overlap) {
    output.innerHTML = `<p class="text-red-600 font-semibold">No common time found.</p>`;
    return;
  }

  const list = document.createElement("ul");
  list.className = "list-disc pl-6";
  ranges.forEach(({ city, zone }) => {
    const localStart = overlap.startUTC.setZone(zone).toFormat("h:mm a");
    const localEnd = overlap.endUTC.setZone(zone).toFormat("h:mm a");
    const li = document.createElement("li");
    li.textContent = `${city}: ${localStart} - ${localEnd}`;
    list.appendChild(li);
  });

  output.innerHTML = `<h3 class="text-lg font-bold mb-2">Suggested Meeting Time:</h3>`;
  output.appendChild(list);
}

function handleSubmit() {
  const input = document.getElementById("cityInput").value;
  const cities = input
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
  if (cities.length < 2) {
    alert("Please enter at least two cities.");
    return;
  }
  displayResults(cities);
}
