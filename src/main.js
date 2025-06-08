// when using `"withGlobalTauri": true`, you may use

async function deleteDb() {
  const db = await Database.load("sqlite:test.db");

  await db.execute("DROP TABLE IF EXISTS users;");
  const users = await db.select("SELECT * FROM users");
  console.log(users);
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("eliminarDB").onclick = function () {
    deleteDb();
  };
  document.getElementById("fondo").onclick = function () {
    window.location.href = "../fondo/fondo.html"; // redirecciona a la nueva página
  };
  document.getElementById("agregar").onclick = function () {
    window.location.href = "../agregar/agregar.html"; // redirecciona a la nueva página
  };
});
