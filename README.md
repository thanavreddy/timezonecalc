# Meeting Time Finder

A web-based tool that helps users from different time zones find overlapping meeting hours. Just enter two or more city names, and the app calculates suitable time slots based on each participant's local working hours (9:00 AM to 8:00 PM).

---

## Features

-  Input two or more cities or countries
-  Calculates local availability (9 AM – 8 PM)
-  Converts availability to UTC and finds overlap
-  Displays suggested meeting time in each participant's local time
-  Minimal, fast, and fully client-side

---

## Tech Stack

- **HTML, TailwindCSS** - Frontend structure and styling
- **JavaScript (Vanilla)** - Core functionality
- **Timezone handling** via [Luxon](https://moment.github.io/luxon/)
- **Predefined timezone mapping** for popular cities

---

##  Getting Started

###  1. Clone the repository

```bash
git clone https://github.com/thanavreddy/timezonecalc.git
cd timezonecalc
```

###  2. Open index.html in your browser

You can open the file directly or use a local server like:

```bash
npx live-server
```

---

##  Usage

1. Enter city names separated by commas (e.g., `New York, London, Delhi`)
2. Click **"Find Overlap"**
3. View the common available time range in each participant's local time

---

##  Screenshot
![image](https://github.com/user-attachments/assets/3fb4d02f-9a9e-49df-8684-25af715c9a67)



---

## Example

**Input:**
```
New York, London, Delhi
```

**Output:**
```
Suggested Meeting Time:
• New York: 10:30 AM - 12:30 PM
• London: 3:30 PM - 5:30 PM
• Delhi: 8:00 PM - 10:00 PM
```

---

## Limitations

- Only supports a predefined list of cities (e.g., New York, London, Delhi, Tokyo, Sydney, San Francisco, Berlin)
- Assumes availability between 9:00 AM to 8:00 PM local time
- No account or calendar sync (yet!)

