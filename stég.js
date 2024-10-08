const reservationsKey = 'reservations'; // Kulcs a localStorage-hez
let reservations = JSON.parse(localStorage.getItem(reservationsKey)) || {}; // Betöltjük a foglalásokat, ha vannak
const adminPassword="kukoricadara";
function addReservation() {
    const date = document.getElementById('reservationDate').value;
    const name = document.getElementById('reservationName').value;

    if (date && name) {
        if (reservations[date]) {
            alert("Azon a napon már történt foglalás, kérem válasszon egy másik napot!");
        } else {
            reservations[date] = name; // Dátum mint kulcs, név mint érték
            localStorage.setItem(reservationsKey, JSON.stringify(reservations)); // Mentjük a localStorage-ba
            alert("Foglalás sikeresen hozzáadva!");

            // Ürítjük a név mezőt a foglalás után
            document.getElementById('reservationName').value = '';
            document.getElementById('reservationDate').value = ''; // Ürítsd a dátum mezőt is, ha szükséges

            updateAdminReservationList(); // Frissítjük a listát
            displayCalendar(); // Frissítjük a naptárat
        }
    } else {
        alert("Kérlek, add meg a dátumot és a nevet!");
    }
}

function displayCalendar() {
    const calendar = document.getElementById('calendar');
    const calendarTitle = document.getElementById('calendarTitle');
    calendar.innerHTML = ''; // Töröljük a naptár tartalmát

    const today = new Date();
    const month = today.getMonth(); // Aktuális hónap
    const year = today.getFullYear(); // Aktuális év

    // Hónap neve
    const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Aktuális hónap napjainak száma

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${year}-${month + 1}-${day}`; // Dátum string
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';

        // Ellenőrizzük, hogy a nap foglalt-e
        if (reservations[dateString]) {
            dayDiv.classList.add('fogalt'); // Piros
        } else {
            dayDiv.classList.add('szabad'); // Zöld
        }

        dayDiv.textContent = day; // Napi szám
        calendar.appendChild(dayDiv);
    }
}

// Hívjuk meg a naptár megjelenítését az oldal betöltésekor
window.onload = function() {
    updateAdminReservationList();
    displayCalendar(); // Megjelenítjük a naptárat
};


function updateAdminReservationList() {
    const adminReservationList = document.getElementById('adminReservationList');
    adminReservationList.innerHTML = '';

    const dates = Object.keys(reservations); // Csak a foglalt dátumok

    if (dates.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Nincs foglalás.";
        adminReservationList.appendChild(li);
    } else {
        dates.forEach(date => {
            const li = document.createElement('li');
            li.textContent = `${date}: Foglaló - ${reservations[date]}`;
            adminReservationList.appendChild(li);
        });
    }
}

function checkAdminPassword() {
    const passwordInput = document.getElementById('adminPassword').value;
    const adminList = document.getElementById('adminReservationList');
    const logoutButton = document.getElementById('logoutButton');
    const loginButton = document.querySelector('.admin-panel button');

    if (passwordInput === adminPassword) {
        adminList.style.display = 'block';
        logoutButton.style.display = 'inline-block';
        updateAdminReservationList(); // Frissítjük a foglalási listát
        loginButton.style.display = 'none'; // Elrejti a belépés gombot
    } else {
        alert("Helytelen jelszó!");
        adminList.style.display = 'none';
        logoutButton.style.display = 'none';
    }
}

function logout() {
    document.getElementById('adminReservationList').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
    document.querySelector('.admin-panel button').style.display = 'inline-block'; // Újra megjeleníti a belépés gombot
    document.getElementById('adminPassword').value = ''; // Törli a jelszómezőt
}

// Frissítjük a foglalási listát a betöltéskor
window.onload = function() {
    updateAdminReservationList();
};
let currentMonth = new Date().getMonth(); // Aktuális hónap
let currentYear = new Date().getFullYear(); // Aktuális év

function displayCalendar() {
    const calendar = document.getElementById('calendar');
    const calendarTitle = document.getElementById('calendarTitle');
    calendar.innerHTML = ''; // Töröljük a naptár tartalmát

    // Hónap neve
    const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Aktuális hónap napjainak száma

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${currentYear}-${currentMonth + 1}-${day}`; // Dátum string
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';

        // Ellenőrizzük, hogy a nap foglalt-e
        if (reservations[dateString]) {
            dayDiv.classList.add('fogalt'); // Piros
        } else {
            dayDiv.classList.add('szabad'); // Zöld
        }

        dayDiv.textContent = day; // Napi szám
        calendar.appendChild(dayDiv);
    }
}

function changeMonth(direction) {
    currentMonth += direction; // Hónap változtatása

    if (currentMonth < 0) { // Ha az előző hónapra lépünk
        currentMonth = 11; // December
        currentYear--; // Csökkentjük az évet
    } else if (currentMonth > 11) { // Ha a következő hónapra lépünk
        currentMonth = 0; // Január
        currentYear++; // Növeljük az évet
    }

    displayCalendar(); // Frissítjük a naptárat
}

// Hívjuk meg a naptár megjelenítését az oldal betöltésekor
window.onload = function() {
    updateAdminReservationList();
    displayCalendar(); // Megjelenítjük a naptárat
};