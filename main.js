const API_URL = "https://golden-preowned-backend.onrender.com"; // change later when you deploy
const WHATSAPP_NUMBER = "916364102976";

document.addEventListener("DOMContentLoaded", () => {
  const carsContainer = document.getElementById("carsContainer");
  const searchInput = document.getElementById("searchInput");
  const brandFilter = document.getElementById("brandFilter");
  const priceFilter = document.getElementById("priceFilter");
  const yearFilter = document.getElementById("yearFilter");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const yearSpan = document.getElementById("yearSpan");

  const modal = document.getElementById("carDetailsModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalCarImage = document.getElementById("modalCarImage");
  const modalCarTitle = document.getElementById("modalCarTitle");
  const modalCarDescription = document.getElementById("modalCarDescription");
  const modalCarYear = document.getElementById("modalCarYear");
  const modalCarKm = document.getElementById("modalCarKm");
  const modalCarFuel = document.getElementById("modalCarFuel");
  const modalCarTransmission = document.getElementById("modalCarTransmission");
  const modalCarPrice = document.getElementById("modalCarPrice");
  const modalWhatsAppLink = document.getElementById("modalWhatsAppLink");

  let allCars = [];

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  darkModeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Load cars from backend
  async function loadCars() {
    try {
      const res = await fetch(`${API_URL}/api/cars`);
      allCars = await res.json();
      populateFilters(allCars);
      applyFilters();
    } catch (err) {
      console.error("Failed to load cars", err);
      carsContainer.innerHTML =
        "<p>Could not load cars. Check if the backend is running.</p>";
    }
  }

  function populateFilters(cars) {
    // Brand
    const brands = [...new Set(cars.map((c) => c.brand))].sort();
    brandFilter.innerHTML = `<option value="">All Brands</option>`;
    brands.forEach((brand) => {
      const opt = document.createElement("option");
      opt.value = brand;
      opt.textContent = brand;
      brandFilter.appendChild(opt);
    });

    // Year
    const years = [...new Set(cars.map((c) => c.year))].sort(
      (a, b) => b - a
    );
    yearFilter.innerHTML = `<option value="">All Years</option>`;
    years.forEach((year) => {
      const opt = document.createElement("option");
      opt.value = year;
      opt.textContent = year;
      yearFilter.appendChild(opt);
    });
  }

  function renderCars(cars) {
    carsContainer.innerHTML = "";

    if (!cars.length) {
      carsContainer.innerHTML =
        '<p>No cars found matching your filters.</p>';
      return;
    }

    cars.forEach((car) => {
      const card = document.createElement("article");
      card.className = "car-card";

      card.innerHTML = `
        <div class="car-image-wrapper">
          <img src="${car.image}" alt="${car.title}" />
<span class="price-badge">₹${Number(car.price).toLocaleString("en-IN")}</span>
        </div>
        <div class="car-body">
          <div class="car-title-row">
            <div>
              <h3 class="car-title">${car.title}</h3>
              <p class="car-brand">${car.brand}</p>
            </div>
          </div>
          <div class="car-tags">
            <span>${car.year}</span>
            <span>${Number(car.km).toLocaleString()} km</span>
            <span>${car.fuel}</span>
            <span>${car.transmission}</span>
          </div>
          <div class="car-meta">
            <span>Ref: #${car.id}</span>

          </div>
          <div class="car-actions">
            <button class="btn-outline small" data-view-id="${car.id}">
              View Details
            </button>
            <a
              href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Hi, I'm interested in the " +
          car.title +
          " (Ref #" +
          car.id +
          "). Is it still available?"
      )}"
              class="btn-gold small"
              target="_blank"
            >
              WhatsApp
            </a>
          </div>
        </div>
      `;

      carsContainer.appendChild(card);
    });

    const viewButtons = carsContainer.querySelectorAll("[data-view-id]");
    viewButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-view-id"));
        const car = allCars.find((c) => c.id === id);
        if (car) {
          openCarModal(car);
        }
      });
    });
  }

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const brandVal = brandFilter.value;
    const priceVal = priceFilter.value;
    const yearVal = yearFilter.value;

    let filtered = [...allCars];

    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.title.toLowerCase().includes(searchTerm) ||
          car.brand.toLowerCase().includes(searchTerm)
      );
    }

    if (brandVal) {
      filtered = filtered.filter((car) => car.brand === brandVal);
    }

    if (yearVal) {
      filtered = filtered.filter(
        (car) => String(car.year) === String(yearVal)
      );
    }

    if (priceVal) {
      if (priceVal === "1") {
        filtered = filtered.filter((car) => car.price < 15000);
      } else if (priceVal === "2") {
        filtered = filtered.filter(
          (car) => car.price >= 15000 && car.price <= 30000
        );
      } else if (priceVal === "3") {
        filtered = filtered.filter((car) => car.price > 30000);
      }
    }

    renderCars(filtered);
  }

  function openCarModal(car) {
    modalCarImage.src = car.image;
    modalCarImage.alt = car.title;
    modalCarTitle.textContent = car.title;
    modalCarDescription.textContent = car.description || "";
    modalCarYear.textContent = `Year: ${car.year}`;
    modalCarKm.textContent = `KM: ${Number(car.km).toLocaleString()} km`;
    modalCarFuel.textContent = `Fuel: ${car.fuel}`;
    modalCarTransmission.textContent = `Transmission: ${car.transmission}`;
modalCarPrice.textContent = `₹${Number(car.price).toLocaleString("en-IN")}`;

    modalWhatsAppLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hi, I'm interested in the ${car.title} (Ref #${car.id}). Please share more details.`
    )}`;

    modal.classList.add("show");
  }

  closeModalBtn?.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // Filters listeners
  searchInput?.addEventListener("input", applyFilters);
  brandFilter?.addEventListener("change", applyFilters);
  priceFilter?.addEventListener("change", applyFilters);
  yearFilter?.addEventListener("change", applyFilters);

  // Start
  loadCars();
});
