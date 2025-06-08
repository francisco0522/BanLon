const Database = window.__TAURI__.sql;

window.addEventListener("DOMContentLoaded", async () => {
  const db = await Database.load("sqlite:test.db");

  let users = await db.select("SELECT * FROM users");
  let filteredUsers = [...users];

  const container = document.getElementById("users-list");

  if (users.length === 0) {
    container.textContent = "No hay usuarios registrados.";
    return;
  }

  // Agregamos un contenedor para la tabla si no existe
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");
  container.appendChild(tableContainer);

  function renderTable(usersToRender) {
    const maxTime = Math.max(...users.map((user) => parseInt(user.time)));
    const maxMonths = maxTime * 12;

    const table = document.createElement("table");
    table.classList.add("user-table");

    let header = `
      <thead>
        <tr>
          <th>Nombre Deudor</th>
          <th>Valor del Préstamo</th>
          <th>Tiempo (años)</th>
          <th>Codeudor</th>
          <th>Tasa</th>`;

    for (let i = 1; i <= maxMonths; i++) {
      header += `<th>Mes ${i}</th><th>Interés ${i}</th>`;
    }

    header += `</tr></thead>`;
    table.innerHTML = header;

    let body = `<tbody>`;

    usersToRender.forEach((user) => {
      const months = parseInt(user.time) * 12;
      let row = `
        <tr>
          <td>
            <button class="user-link" data-id="${user.id}">
              ${user.name}
            </button>
          </td>
          <td>${user.value}</td>
          <td>${user.time}</td>
          <td>${user.nameCodeudor}</td>
          <td>${user.tasa}</td>
      `;

      for (let i = 1; i <= maxMonths; i++) {
        if (i <= months) {
          const interes = (
            (parseFloat(user.value) * parseFloat(user.tasa) * i) /
            100
          ).toFixed(2);
          row += `<td>${i}</td><td>${interes}</td>`;
        } else {
          row += `<td>-</td><td>-</td>`;
        }
      }

      row += `</tr>`;
      body += row;
    });

    body += `</tbody>`;
    table.innerHTML += body;

    // Limpiar antes de volver a renderizar
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  }

  // Mostrar tabla inicialmente
  renderTable(filteredUsers);

  // Filtro por nombre
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    renderTable(results);
  });

  // Añadir evento a cada botón de nombre
  const nameButtons = document.querySelectorAll(".user-link");
  nameButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const userId = e.currentTarget.getAttribute("data-id");
      window.location.href = `../detalle/detalle.html?id=${userId}`;
    });
  });
  // Botón de regreso
  document.getElementById("volver").onclick = function () {
    window.location.href = "index.html";
  };
});
