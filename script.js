// Wanderlust Catalog - Destinations Data (6 destinations total)
const destinationsData = [
  {
    id: 1,
    name: "Eiffel Tower",
    location: "Paris, France",
    continent: "europe",
    shortDesc: "An iconic iron lattice tower in Paris, France, famous worldwide as a symbol of French culture and a top tourist attraction offering panoramic city views.",
    price: 150,
    currency: "€",
    imageRef: "eiffel",
    imageAlt: "Eiffel Tower at sunset with golden lights",
    imageUrl: "img/E.png"  // Added image URL for easier management
  },
  {
    id: 2,
    name: "Basilica de la Sagrada Familia",
    location: "Barcelona, Spain",
    continent: "europe",
    shortDesc: "A stunning unfinished Roman Catholic church in Barcelona, designed by architect Antoni Gaudí, renowned for its intricate façades, towering spires, and unique blend of Gothic and Art Nouveau architecture.",
    price: 120,
    currency: "€",
    imageRef: "sagrada",
    imageAlt: "Sagrada Familia basilica facade with intricate details",
    imageUrl: "img/b.png"
  },
  {
    id: 3,
    name: "Statue of Liberty",
    location: "New York, United States",
    continent: "america",
    shortDesc: "A monumental copper statue on Liberty Island in New York Harbor, symbolizing freedom and democracy, and is one of the most recognized landmarks in the United States.",
    price: 150,
    currency: "$",
    imageRef: "statue",
    imageAlt: "Statue of Liberty against blue sky",
    imageUrl: "img/s.png"
  },
  // ========== 3 NEW PLACEHOLDER DESTINATIONS ==========
  {
    id: 4,
    name: "Colosseum",
    location: "Rome, Italy",
    continent: "europe",
    shortDesc: "The Colosseum is an ancient amphitheater in Rome, Italy, built between 70-80 AD. It is the largest ancient amphitheater ever built and remains one of the greatest architectural achievements of the Roman Empire.",
    price: 80,
    currency: "€",
    imageRef: "colosseum",
    imageAlt: "Colosseum in Rome with ancient architecture",
    imageUrl: "img/c.png"
  },
  {
    id: 5,
    name: "Fushimi Inari Shrine",
    location: "Kyoto, Japan",
    continent: "asia",
    shortDesc: "Fushimi Inari Shrine is famous for its thousands of vibrant red torii gates that create a stunning path up Mount Inari. It's one of the most iconic and photogenic spots in Japan.",
    price: 95,
    currency: "$",
    imageRef: "kyoto",
    imageAlt: "Fushimi Inari Shrine with red torii gates in Kyoto",
    imageUrl: "img/f.png"
  },
  {
    id: 6,
    name: "Great Pyramids of Giza",
    location: "Cairo, Egypt",
    continent: "africa",
    shortDesc: "The Great Pyramids of Giza are ancient Egyptian pyramids that have stood for over 4,500 years. They are the oldest of the Seven Wonders of the Ancient World and a must-visit historical site.",
    price: 110,
    currency: "$",
    imageRef: "pyramids",
    imageAlt: "Great Pyramids of Giza with desert landscape",
    imageUrl: "img/p.png"
  }
];

// DOM Elements
const gridContainer = document.getElementById('destinationsGrid');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('searchInput');
const toastEl = document.getElementById('toastMsg');

let currentFilter = 'all';
let currentSearch = '';
let toastTimeout = null;

// ========== IMAGE MANAGEMENT FUNCTIONS ==========

/**
 * Update a destination's image by ID
 * @param {number} destinationId - The ID of the destination
 * @param {string} newImageUrl - The new image URL (e.g., "images/new-image.jpg" or full URL)
 * @returns {boolean} - Returns true if successful, false if not found
 */
function updateDestinationImageById(destinationId, newImageUrl) {
  const destination = destinationsData.find(d => d.id === destinationId);
  if (!destination) {
    console.error(`❌ Destination with ID ${destinationId} not found`);
    return false;
  }
  
  // Update the image URL in data
  destination.imageUrl = newImageUrl;
  
  // Also update the CSS style dynamically
  updateImageStyle(destination.imageRef, newImageUrl);
  
  // Refresh the catalog
  buildCatalogCards();
  
  console.log(`✅ Updated image for: ${destination.name} → ${newImageUrl}`);
  return true;
}

/**
 * Update a destination's image by name
 * @param {string} destinationName - The name of the destination
 * @param {string} newImageUrl - The new image URL
 * @returns {boolean} - Returns true if successful, false if not found
 */
function updateDestinationImageByName(destinationName, newImageUrl) {
  const destination = destinationsData.find(d => d.name === destinationName);
  if (!destination) {
    console.error(`❌ Destination "${destinationName}" not found`);
    console.log(`📝 Available destinations: ${destinationsData.map(d => d.name).join(', ')}`);
    return false;
  }
  
  destination.imageUrl = newImageUrl;
  updateImageStyle(destination.imageRef, newImageUrl);
  buildCatalogCards();
  
  console.log(`✅ Updated image for: ${destination.name} → ${newImageUrl}`);
  return true;
}

/**
 * Add a new destination with image
 * @param {string} name - Destination name
 * @param {string} location - City, Country
 * @param {string} continent - europe, america, asia, africa
 * @param {string} description - Short description
 * @param {number} price - Price amount
 * @param {string} currency - Currency symbol ($, €, ₱, etc.)
 * @param {string} imageUrl - Image URL path
 * @returns {object} - The newly created destination object
 */
function addDestinationWithImage(name, location, continent, description, price, currency, imageUrl) {
  const newId = Date.now();
  const imageRef = name.toLowerCase().replace(/\s+/g, '-');
  
  const newDestination = {
    id: newId,
    name: name,
    location: location,
    continent: continent,
    shortDesc: description,
    price: price,
    currency: currency,
    imageRef: imageRef,
    imageAlt: name,
    imageUrl: imageUrl
  };
  
  destinationsData.push(newDestination);
  
  // Add CSS style for the new image
  addImageStyle(imageRef, imageUrl);
  
  // Refresh the catalog
  buildCatalogCards();
  
  console.log(`✅ Added new destination: ${name} with image: ${imageUrl}`);
  console.log(`📊 Total destinations: ${destinationsData.length}`);
  return newDestination;
}

/**
 * Add CSS rule for image dynamically
 */
function addImageStyle(imageRef, imageUrl) {
  const styleId = 'dynamic-image-styles';
  let styleElement = document.getElementById(styleId);
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  
  const rule = `.card-image[data-image="${imageRef}"] { background-image: url('${imageUrl}'); }`;
  styleElement.textContent += rule;
}

/**
 * Update existing CSS rule for image
 */
function updateImageStyle(imageRef, imageUrl) {
  const styleId = 'dynamic-image-styles';
  let styleElement = document.getElementById(styleId);
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  
  // Get all rules and remove existing one for this imageRef
  const rules = styleElement.textContent.split('}').filter(r => r.trim());
  const newRules = rules.filter(rule => !rule.includes(`data-image="${imageRef}"`));
  newRules.push(`.card-image[data-image="${imageRef}"] { background-image: url('${imageUrl}'); }`);
  styleElement.textContent = newRules.join('}') + '}';
}

/**
 * Get all destinations with their current image URLs
 */
function getAllDestinationsWithImages() {
  console.table(destinationsData.map(d => ({
    id: d.id,
    name: d.name,
    location: d.location,
    price: `${d.currency}${d.price}`,
    imageUrl: d.imageUrl,
    imageRef: d.imageRef
  })));
  return destinationsData;
}

/**
 * Batch update multiple images at once
 * @param {array} updates - Array of {id or name, imageUrl} objects
 */
function batchUpdateImages(updates) {
  let successCount = 0;
  updates.forEach(update => {
    let success = false;
    if (update.id) {
      success = updateDestinationImageById(update.id, update.imageUrl);
    } else if (update.name) {
      success = updateDestinationImageByName(update.name, update.imageUrl);
    }
    if (success) successCount++;
  });
  console.log(`✅ Batch update complete: ${successCount}/${updates.length} images updated`);
}

// ========== END IMAGE MANAGEMENT FUNCTIONS ==========

// Show toast notification
function showInteractiveToast(destName, priceInfo) {
  if (!toastEl) return;
  
  if (toastTimeout) clearTimeout(toastTimeout);
  
  const message = `✨ ${destName} · ${priceInfo} · experience added to wishlist`;
  toastEl.textContent = message;
  
  toastEl.classList.add('show');
  
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2600);
}

// Format price
function formatPrice(price, currency) {
  return `${currency}${price.toLocaleString()}`;
}

// Filter destinations
function getFilteredDestinations() {
  let filtered = [...destinationsData];
  
  // Apply continent filter
  if (currentFilter !== 'all') {
    filtered = filtered.filter(dest => dest.continent === currentFilter);
  }
  
  // Apply search filter
  if (currentSearch.trim()) {
    const searchTerm = currentSearch.toLowerCase();
    filtered = filtered.filter(dest => 
      dest.name.toLowerCase().includes(searchTerm) || 
      dest.location.toLowerCase().includes(searchTerm) ||
      dest.shortDesc.toLowerCase().includes(searchTerm)
    );
  }
  
  return filtered;
}

// Build catalog cards
function buildCatalogCards() {
  if (!gridContainer) return;
  
  const filteredDestinations = getFilteredDestinations();
  
  if (filteredDestinations.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>No destinations found. Try a different search or filter.</p>
      </div>
    `;
    return;
  }
  
  let cardsHTML = '';
  for (let spot of filteredDestinations) {
    const formattedPrice = formatPrice(spot.price, spot.currency);
    
    cardsHTML += `
      <div class="destination-card" data-id="${spot.id}" data-name="${spot.name.replace(/'/g, "\\'")}" data-price="${formattedPrice}">
        <div class="card-image" data-image="${spot.imageRef}" aria-label="${spot.imageAlt}">
          <div class="location-badge-img">
            📍 ${spot.location.split(',')[0]}
          </div>
        </div>
        <div class="card-content">
          <h2 class="destination-title">${spot.name}</h2>
          <div class="location-badge">
            <span class="flag-icon">🗺️</span> ${spot.location}
          </div>
          <p class="description">${spot.shortDesc}</p>
          <div class="price-row">
            <div class="price">${formattedPrice} <small>/ person</small></div>
            <button class="book-btn" data-btn-id="${spot.id}">
              ✈️ Explore
            </button>
          </div>
        </div>
      </div>
    `;
  }
  gridContainer.innerHTML = cardsHTML;
  
  // Add event listeners to all book buttons
  const allButtons = document.querySelectorAll('.book-btn');
  allButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.destination-card');
      if (card) {
        const destinationName = card.getAttribute('data-name') || 'this destination';
        const priceTag = card.getAttribute('data-price') || '';
        showInteractiveToast(destinationName, priceTag);
        
        // Animation effect
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
        
        console.log(`✨ Interest registered: ${destinationName} — starting from ${priceTag}`);
      } else {
        const btnId = btn.getAttribute('data-btn-id');
        const found = destinationsData.find(d => d.id == btnId);
        if (found) {
          showInteractiveToast(found.name, formatPrice(found.price, found.currency));
        }
      }
    });
  });
  
  // Add click event to images
  const images = document.querySelectorAll('.card-image');
  images.forEach((imgContainer) => {
    imgContainer.addEventListener('click', () => {
      const card = imgContainer.closest('.destination-card');
      if (card) {
        const destinationName = card.getAttribute('data-name') || 'this destination';
        const priceTag = card.getAttribute('data-price') || '';
        showInteractiveToast(destinationName, priceTag);
      }
    });
  });
  
  // Apply dynamic image styles
  applyDynamicImageStyles();
}

// Apply all dynamic image styles from destinations data
function applyDynamicImageStyles() {
  const styleId = 'dynamic-image-styles';
  let styleElement = document.getElementById(styleId);
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  
  let cssRules = '';
  destinationsData.forEach(dest => {
    if (dest.imageUrl) {
      cssRules += `.card-image[data-image="${dest.imageRef}"] { background-image: url('${dest.imageUrl}'); }\n`;
    }
  });
  
  styleElement.textContent = cssRules;
}

// Update active navigation link
function updateActiveNavLink(category) {
  navLinks.forEach(link => {
    const navValue = link.getAttribute('data-nav');
    if ((navValue === 'all' && category === 'all') || navValue === category) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Navigation filter handler
function setupNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.getAttribute('data-nav');
      currentFilter = category === 'all' ? 'all' : category;
      updateActiveNavLink(currentFilter);
      buildCatalogCards();
    });
  });
}

// Search functionality
function setupSearch() {
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      buildCatalogCards();
    });
  }
}

// ========== BACKWARD COMPATIBILITY FUNCTIONS ==========

// Keep original function names for compatibility
function addDestination(name, location, continent, description, price, currency, imageRef) {
  // If no imageUrl provided, use default path
  const imageUrl = `images/${imageRef}.jpg`;
  return addDestinationWithImage(name, location, continent, description, price, currency, imageUrl);
}

function updateDestinationImage(destinationId, newImageUrl) {
  return updateDestinationImageById(destinationId, newImageUrl);
}

function getAllDestinations() {
  return getAllDestinationsWithImages();
}

// ========== END BACKWARD COMPATIBILITY ==========

// Make helper functions available globally
window.addDestination = addDestination;
window.addDestinationWithImage = addDestinationWithImage;
window.updateDestinationImage = updateDestinationImage;
window.updateDestinationImageById = updateDestinationImageById;
window.updateDestinationImageByName = updateDestinationImageByName;
window.getAllDestinations = getAllDestinations;
window.getAllDestinationsWithImages = getAllDestinationsWithImages;
window.batchUpdateImages = batchUpdateImages;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupSearch();
  applyDynamicImageStyles();
  buildCatalogCards();
  
  console.log('🗺️ Wanderlust Catalog | Ready to explore!');
  console.log('📸 6 Destinations loaded:');
  console.log('   → Eiffel Tower (Europe)');
  console.log('   → Sagrada Familia (Europe)');
  console.log('   → Statue of Liberty (Americas)');
  console.log('   → Colosseum (Europe)');
  console.log('   → Fushimi Inari Shrine (Asia)');
  console.log('   → Great Pyramids of Giza (Africa)');
  console.log('');
  console.log('💡 IMAGE MANAGEMENT FUNCTIONS:');
  console.log('');
  console.log('🔹 UPDATE IMAGE BY ID:');
  console.log('   updateDestinationImageById(1, "images/new-eiffel.jpg")');
  console.log('');
  console.log('🔹 UPDATE IMAGE BY NAME:');
  console.log('   updateDestinationImageByName("Eiffel Tower", "images/new-eiffel.jpg")');
  console.log('');
  console.log('🔹 ADD NEW DESTINATION WITH IMAGE:');
  console.log('   addDestinationWithImage(');
  console.log('     "Mount Fuji", "Tokyo, Japan", "asia",');
  console.log('     "Beautiful iconic mountain...", 200, "$", "images/fuji.jpg"');
  console.log('   )');
  console.log('');
  console.log('🔹 BATCH UPDATE IMAGES:');
  console.log('   batchUpdateImages([');
  console.log('     { name: "Eiffel Tower", imageUrl: "images/eiffel-new.jpg" },');
  console.log('     { id: 4, imageUrl: "images/colosseum-new.jpg" }');
  console.log('   ])');
  console.log('');
  console.log('🔹 VIEW ALL DESTINATIONS:');
  console.log('   getAllDestinationsWithImages()');
});
