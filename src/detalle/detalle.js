const Database = window.__TAURI__.sql;

function getQueryParam(param) {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}

window.addEventListener("DOMContentLoaded", async () => {
  const userId = getQueryParam("id");
  const db = await Database.load("sqlite:test.db");
  const result = await db.select("SELECT * FROM users WHERE id = ?", [userId]);

  const user = result[0];

  const container = document.getElementById("user-details");

  if (!user) {
    container.textContent = "Usuario no encontrado.";
    return;
  }

  container.innerHTML = `
    <p><strong>Nombre:</strong> ${user.name}</p>
    <p><strong>Cédula:</strong> ${user.cedula}</p>
    <p><strong>Teléfono:</strong> ${user.phone}</p>
    <p><strong>Dirección:</strong> ${user.address}</p>
    <p><strong>Valor del préstamo:</strong> ${user.value}</p>
    <p><strong>Tiempo (años):</strong> ${user.time}</p>
    <p><strong>Codeudor:</strong> ${user.nameCodeudor}</p>
    <p><strong>Tasa:</strong> ${user.tasa}</p>
  `;
});
