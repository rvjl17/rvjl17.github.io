
const PASSWORD = "CACC611121";
let folioActual = parseInt(localStorage.getItem("ultimoFolio")) || 11794;
let recibos = JSON.parse(localStorage.getItem("recibos")) || [];

function verificarPassword() {
  const pw = document.getElementById("password").value;
  if (pw === PASSWORD) {
    document.getElementById("formulario").classList.remove("hidden");
    document.getElementById("login").classList.add("hidden");
    mostrarHistorial();
  } else {
    alert("Contraseña incorrecta.");
  }
}

function numeroALetras(n) {
  const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const especiales = ["diez", "once", "doce", "trece", "catorce", "quince"];
  const decenas = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const centenas = ["", "cien", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  if (n < 10) return unidades[n];
  if (n < 16) return especiales[n - 10];
  if (n < 100) return decenas[Math.floor(n / 10)] + (n % 10 !== 0 ? " y " + unidades[n % 10] : "");
  if (n < 1000) return centenas[Math.floor(n / 100)] + (n % 100 !== 0 ? " " + numeroALetras(n % 100) : "");

  return n;
}

function actualizarTextoCantidad() {
  const cantidad = parseFloat(document.getElementById("cantidad").value);
  const texto = isNaN(cantidad) ? "" : numeroALetras(Math.floor(cantidad)) + " pesos 00/100 M.N.";
  document.getElementById("textoCantidad").textContent = texto;
}

function actualizarMesFin() {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const mesInicio = document.getElementById("mesInicio").value;
  const idx = meses.indexOf(mesInicio);
  const mesFin = meses[(idx + 1) % 12];
  document.getElementById("mesFin").textContent = "Hasta " + mesFin;
}

function generarRecibo() {
  const nombre = document.getElementById("nombre").value;
  const casa = document.getElementById("casa").value;
  const cantidad = parseFloat(document.getElementById("cantidad").value);
  const cantidadTexto = numeroALetras(Math.floor(cantidad)) + " pesos 00/100 M.N.";
  const fecha = new Date().toLocaleDateString("es-MX");
  folioActual++;

  localStorage.setItem("ultimoFolio", folioActual);
  const periodo = document.getElementById("mesInicio").value + " a " + document.getElementById("mesFin").textContent.split(" ")[1];

  const reciboHTML = `
    <div class="recibo-contenido">
      <img src="logo_haciendas_blanco_fondo.png" style="width: 150px; display:block; margin:auto;" />
      <h2>Asociación de Colonos del Circuito Hacienda Santa Bárbara</h2>
      <p><strong>Folio:</strong> ${folioActual}</p>
      <p><strong>Fecha:</strong> ${fecha}</p>
      <p><strong>Recibimos de:</strong> ${nombre}</p>
      <p><strong>Número de casa:</strong> ${casa}</p>
      <p><strong>Cantidad:</strong> $${cantidad.toFixed(2)} (${cantidadTexto})</p>
      <p><strong>Periodo:</strong> ${periodo}</p>
      <p style="margin-top:20px; font-style: italic;">El pago de este recibo no lo exime de adeudos anteriores.</p>
    </div>
  `;

  const reciboDiv = document.getElementById("recibo");
  reciboDiv.innerHTML = reciboHTML;
  reciboDiv.classList.remove("hidden");

  document.getElementById("btnPDF").classList.remove("hidden");
  document.getElementById("btnExcel").classList.remove("hidden");

  const nuevoRecibo = { folio: folioActual, nombre, casa, cantidad, cantidadTexto, periodo, fecha };
  recibos.push(nuevoRecibo);
  localStorage.setItem("recibos", JSON.stringify(recibos));
  mostrarHistorial();
}

function mostrarHistorial() {
  const historialDiv = document.getElementById("historial");
  historialDiv.innerHTML = recibos.map(r =>
    `<p>Folio ${r.folio}: ${r.nombre} - ${r.casa} - $${r.cantidad} (${r.periodo})</p>`
  ).join("");
}

function descargarPDF() {
  window.print();
}

function exportarExcel() {
  const rows = recibos.map(r => `${r.folio},${r.nombre},${r.casa},${r.cantidad},${r.periodo},${r.fecha}`).join("\n");
  const blob = new Blob(["Folio,Nombre,Casa,Cantidad,Periodo,Fecha\n" + rows], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "recibos.csv";
  a.click();
}
