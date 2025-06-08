// when using `"withGlobalTauri": true`, you may use
const Database = window.__TAURI__.sql;

const { invoke } = window.__TAURI__.core;

let greetName;
let greetCedula;
let greetPhone;
let greetAddress;
let greetValue;
let greetTime;
let greetNameCodeudor;
let greetTasa;
let greetMsgEl;

function mostrarAlerta(campo, mensaje) {
  const alerta = document.getElementById("custom-alert");
  const valorPrestamo = document.getElementById("greet-value");
  const tiempo = document.getElementById("greet-time");
  const tasa = document.getElementById("greet-tasa");
  alerta.textContent = mensaje;
  alerta.style.display = "block";
  alerta.style.color = "red";

  if (campo == "greet-value") valorPrestamo.style.color = "red";
  if (campo == "greet-time") tiempo.style.color = "red";
  if (campo == "greet-tasa") tasa.style.color = "red";
}

function ocultarAlerta(campo, mensaje) {
  const alerta = document.getElementById("custom-alert");
  const valorPrestamo = document.getElementById("greet-value");
  const tiempo = document.getElementById("greet-time");
  const tasa = document.getElementById("greet-tasa");
  alerta.style.display = "block";
  alerta.style.color = "green";
  alerta.textContent = mensaje;

  if (campo == "greet-value") valorPrestamo.style.color = "white";
  if (campo == "greet-time") tiempo.style.color = "white";
  if (campo == "greet-tasa") tasa.style.color = "white";
}

function validarNumero(campo, nombreCampo, nombrePersona) {
  const valor = Number(campo.value.trim());

  if (campo.value.trim() === "" || isNaN(valor) || valor <= 0) {
    mostrarAlerta(
      campo.id,
      `${nombreCampo} debe ser un número válido y mayor que cero.`
    );
    return false;
  } else {
    ocultarAlerta(campo.id, `Se Agrego ${nombrePersona.value}`);
  }

  return true;
}

async function greet() {
  if (!validarNumero(greetValue, "Valor del Préstamo", greetName)) return;
  if (!validarNumero(greetTime, "Tiempo", greetName)) return;
  if (!validarNumero(greetTasa, "Tasa", greetName)) return;

  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  const db = await Database.load("sqlite:test.db");

  await db.execute(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, cedula TEXT, phone TEXT, address TEXT, value INTEGER, time INTEGER, nameCodeudor TEXT, tasa TEXT)"
  );
  await db.execute(
    `INSERT INTO users 
    (name, cedula, phone, address, value, time, nameCodeudor, tasa)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      greetName.value,
      greetCedula.value,
      greetPhone.value,
      greetAddress.value,
      greetValue.value,
      greetTime.value,
      greetNameCodeudor.value,
      greetTasa.value,
    ]
  );

  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  greetName = document.querySelector("#greet-name");
  greetCedula = document.querySelector("#greet-cedula");
  greetPhone = document.querySelector("#greet-phone");
  greetAddress = document.querySelector("#greet-address");
  greetValue = document.querySelector("#greet-value");
  greetTime = document.querySelector("#greet-time");
  greetNameCodeudor = document.querySelector("#greet-nameCodeudor");
  greetTasa = document.querySelector("#greet-tasa");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  document.getElementById("volver").onclick = function () {
    window.location.href = "index.html"; // redirecciona a la nueva página
  };
});
