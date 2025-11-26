const API_URL = "https://golden-preowned-backend.onrender.com"; // change when deploying
const ADMIN_SECRET = "golden-secret-123"; // must match server.js or env var

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("adminLoginForm");
  const adminPanel = document.getElementById("adminPanel");
  const logoutBtn = document.getElementById("logoutBtn");
  const addCarForm = document.getElementById("addCarForm");
  const adminCarsTableBody = document.getElementById("adminCarsTableBody");
  const yearSpan = document.getElementById("yearSpan");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  let isLoggedIn = false;

  async function loadCars() {
    try {
      const res = await fetch(`${API_URL}/api/cars`);
      const cars = await res.json();
      renderCars(cars);
    } catch (err) {
      console.error("Failed to load cars", err);
      adminCarsTableBody.innerHTML =
        "<tr><td colspan='4'>Could not load cars. Check backend.</td></tr>";
    }
  }

  function renderCars(cars) {
    adminCarsTableBody.innerHTML = "";
    cars.forEach((car) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${car.title}</td>
        <td>${car.brand}</td>
        <td>$${Number(car.price).toLocaleString()}</td>
        <td>${car.year}</td>
      `;
      tr.addEventListener("click", () => {
        if (!isLoggedIn) return;
        if (
          confirm(
            `Delete car "${car.title}" (Ref #${car.id})? This cannot be undone.`
          )
        ) {
          deleteCar(car.id);
        }
      });
      adminCarsTableBody.appendChild(tr);
    });
  }

  async function deleteCar(id) {
    try {
      const res = await fetch(`${API_URL}/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": ADMIN_SECRET,
        },
      });
      if (!res.ok) {
        alert("Failed to delete. Check admin secret or server.");
        return;
      }
      await loadCars();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting car.");
    }
  }

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("adminPassword").value.trim();

    if (!password) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        isLoggedIn = true;
        loginForm.classList.add("hidden");
        adminPanel.classList.remove("hidden");
        await loadCars();
      } else {
        alert("Invalid password");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Login failed. Check if backend is running.");
    }
  });

  logoutBtn?.addEventListener("click", () => {
    isLoggedIn = false;
    adminPanel.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  addCarForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("carTitle").value.trim();
    const brand = document.getElementById("carBrand").value.trim();
    const price = document.getElementById("carPrice").value.trim();
    const year = document.getElementById("carYear").value.trim();
    const km = document.getElementById("carKm").value.trim();
    const fuel = document.getElementById("carFuel").value.trim();
    const transmission = document
      .getElementById("carTransmission")
      .value.trim();
    const image = document.getElementById("carImage").value.trim();
    const description = document
      .getElementById("carDescription")
      .value.trim();

    if (
      !title ||
      !brand ||
      !price ||
      !year ||
      !km ||
      !fuel ||
      !transmission
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": ADMIN_SECRET,
        },
        body: JSON.stringify({
          title,
          brand,
          price,
          year,
          km,
          fuel,
          transmission,
          image,
          description,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Failed to save: " + (data.error || "Unknown error"));
        return;
      }

      addCarForm.reset();
      await loadCars();
      alert("Car added successfully!");
    } catch (err) {
      console.error("Add car error", err);
      alert("Failed to add car. Check backend.");
    }
  });
});
