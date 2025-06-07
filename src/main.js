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

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  const db = await Database.load("sqlite:test.db");

  await db.execute(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, cedula TEXT, phone TEXT, address TEXT, value TEXT, time TEXT, nameCodeudor TEXT, tasa TEXT)"
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

  const users = await db.select("SELECT * FROM users");
  console.log(users);

  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

async function deleteDb() {
  const db = await Database.load("sqlite:test.db");

  await db.execute("DROP TABLE IF EXISTS users;");
  const users = await db.select("SELECT * FROM users");
  console.log(users);
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
  document.getElementById("eliminarDB").onclick = function () {
    deleteDb();
  };
});
