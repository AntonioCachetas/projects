// Sample houses with location (lat/lng)
const houses = [
  {
    id: 1,
    title: "Modern Family Home",
    img: "assets/house3.jpg",
    price: "$550,000",
    beds: 4,
    baths: 3,
    kitchens: 1,
    lat: 43.6532,
    lng: -79.3832
  },
  {
    id: 2,
    title: "Luxury Condo Downtown",
    img: "assets/house2.jpg",
    price: "$750,000",
    beds: 2,
    baths: 2,
    kitchens: 1,
    lat: 43.6426,
    lng: -79.3871
  },
  {
    id: 3,
    title: "Cozy Suburban House",
    img: "assets/house1.jpg",
    price: "$420,000",
    beds: 3,
    baths: 2,
    kitchens: 1,
    lat: 43.7001,
    lng: -79.4163
  }
];

// Add to watchlist
function addToWatchlist(id) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Added to watchlist!");
  }
}

// Show houses on listings page
function renderListings() {
  const container = document.getElementById("house-list");
  if (!container) return;
  container.innerHTML = houses.map(h => `
    <div class="house-card">
      <img src="${h.img}" alt="${h.title}">
      <div class="info">
        <h3>${h.title}</h3>
        <p>Price: ${h.price}</p>
        <p>${h.beds} Beds • ${h.baths} Baths • ${h.kitchens} Kitchen</p>
        <button onclick="addToWatchlist(${h.id})">Add to Watchlist</button>
        <button onclick="viewDetails(${h.id})">View Details</button>
      </div>
    </div>
  `).join("");
}

// Show featured on home
function renderFeatured() {
  const container = document.getElementById("featured-listings");
  if (!container) return;
  container.innerHTML = houses.slice(0, 2).map(h => `
    <div class="house-card">
      <img src="${h.img}" alt="${h.title}">
      <div class="info">
        <h3>${h.title}</h3>
        <p>${h.price}</p>
        <button onclick="viewDetails(${h.id})">View Details</button>
      </div>
    </div>
  `).join("");
}

// Save ID to localStorage & go to details.html
function viewDetails(id) {
  localStorage.setItem("selectedHouse", id);
  window.location.href = "details.html";
}

// Show single house details
function renderDetails() {
  const container = document.getElementById("house-details");
  if (!container) return;

  const id = parseInt(localStorage.getItem("selectedHouse"));
  const h = houses.find(h => h.id === id);
  if (!h) {
    container.innerHTML = "<p>House not found.</p>";
    return;
  }

  container.innerHTML = `
    <h1>${h.title}</h1>
    <img src="${h.img}" alt="${h.title}" style="max-width:100%; border-radius:8px;">
    <p><strong>Price:</strong> ${h.price}</p>
    <p><strong>Bedrooms:</strong> ${h.beds}</p>
    <p><strong>Bathrooms:</strong> ${h.baths}</p>
    <p><strong>Kitchens:</strong> ${h.kitchens}</p>
  `;

  // Map
  const map = L.map('map').setView([h.lat, h.lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  L.marker([h.lat, h.lng]).addTo(map).bindPopup(h.title).openPopup();
}

// Show watchlist
function renderWatchlist() {
  const container = document.getElementById("watchlist");
  if (!container) return;
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const items = houses.filter(h => watchlist.includes(h.id));
  container.innerHTML = items.length ? items.map(h => `
    <div class="house-card">
      <img src="${h.img}" alt="${h.title}">
      <div class="info">
        <h3>${h.title}</h3>
        <p>${h.price}</p>
        <button onclick="removeFromWatchlist(${h.id})">Remove</button>
        <button onclick="viewDetails(${h.id})">View Details</button>
      </div>
    </div>
  `).join("") : "<p>No houses in your watchlist yet.</p>";
}

function removeFromWatchlist(id) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist = watchlist.filter(item => item !== id);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  renderWatchlist();
}

renderListings();
renderFeatured();
renderDetails();
renderWatchlist();
