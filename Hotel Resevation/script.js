// --------- HOTEL DATA ---------
const floors = {};
const occupied = new Set();

// Floors 1–9 (10 rooms each)
for (let f = 1; f <= 9; f++) {
  floors[f] = [];
  for (let r = 1; r <= 10; r++) {
    floors[f].push(f * 100 + r);
  }
}

// Floor 10 (7 rooms)
floors[10] = [1001,1002,1003,1004,1005,1006,1007];


// --------- RENDER ROOMS ---------
function render() {
  const hotel = document.getElementById("hotel");
  hotel.innerHTML = "";

  for (let f = 1; f <= 10; f++) {
    const floorDiv = document.createElement("div");
    floorDiv.className = "floor" + (f === 10 ? " floor10" : "");

    floors[f].forEach(room => {
      const div = document.createElement("div");
      div.className = "room " + (occupied.has(room) ? "booked" : "free");
      div.innerText = room;
      floorDiv.appendChild(div);
    });

    hotel.appendChild(floorDiv);
  }
}


// --------- TRAVEL TIME CALCULATION ---------
function travelTime(rooms) {
  let first = rooms[0];
  let last = rooms[rooms.length - 1];

  let floor1 = Math.floor(first / 100);
  let floor2 = Math.floor(last / 100);

  let pos1 = first % 100;
  let pos2 = last % 100;

  let horizontal = Math.abs(pos1 - pos2);       // 1 min per room
  let vertical = Math.abs(floor1 - floor2) * 2; // 2 min per floor

  return horizontal + vertical;
}


// --------- BOOK ROOMS ---------
function book() {
  let n = Number(document.getElementById("roomCount").value);

  if (!n || n < 1 || n > 5) {
    alert("Enter a number between 1 and 5");
    return;
  }

  let bestRooms = [];
  let minTime = Infinity;

  // Priority: same floor
  for (let f in floors) {
    let available = floors[f].filter(r => !occupied.has(r));

    if (available.length >= n) {
      let selected = available.slice(0, n);
      let time = travelTime(selected);

      if (time < minTime) {
        minTime = time;
        bestRooms = selected;
      }
    }
  }

  if (bestRooms.length === 0) {
    alert("Not enough rooms available");
    return;
  }

  bestRooms.forEach(r => occupied.add(r));
  render();
}


// --------- RANDOM OCCUPANCY ---------
function randomFill() {
  occupied.clear();

  for (let i = 0; i < 25; i++) {
    let f = Math.ceil(Math.random() * 10);
    let room = floors[f][Math.floor(Math.random() * floors[f].length)];
    occupied.add(room);
  }

  render();
}


// --------- RESET ---------
function resetAll() {
  occupied.clear();
  render();
}


// Initial load
render();
