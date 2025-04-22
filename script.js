
const PASSWORD = "CACC611121";
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let folio = 1;

function verificarPassword() {
  const pw = document.getElementById("password").value;
  if (pw === PASSWORD) {
    document.getElementById("formulario").classList.remove("hidden");
  } else {
    alert("Contraseña incorrecta.");
  }
}

function numeroATexto(n) {
  const UNIDADES = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const DIEZ_DIECINUEVE = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const DECENAS = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const CENTENAS = ["", "cien", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  if (n === 0) return "cero pesos";

  let texto = "";
  if (n >= 100) {
    let centenas = Math.floor(n / 100);
    texto += CENTENAS[centenas] + " ";
    n %= 100;
  }

  if (n >= 20) {
    let decenas = Math.floor(n / 10);
    texto += DECENAS[decenas];
    let unidades = n % 10;
    if (unidades > 0) texto += " y " + UNIDADES[unidades];
  } else if (n >= 10) {
    texto += DIEZ_DIECINUEVE[n - 10];
  } else if (n > 0) {
    texto += UNIDADES[n];
  }

  return texto.trim() + " pesos";
}

function actualizarCantidadTexto() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  if (!isNaN(cantidad)) {
    document.getElementById("cantidadTexto").value = numeroATexto(cantidad);
  } else {
    document.getElementById("cantidadTexto").value = "";
  }
}

function actualizarMesSiguiente() {
  const mesInicio = document.getElementById("mesInicio").value;
  const index = MESES.indexOf(mesInicio);
  if (index >= 0) {
    const siguiente = MESES[(index + 1) % 12];
    document.getElementById("mesSiguiente").value = "Hasta " + siguiente;
  } else {
    document.getElementById("mesSiguiente").value = "";
  }
}

function generarRecibo() {
  const nombre = document.getElementById("nombre").value;
  const casa = document.getElementById("casa").value;
  const cantidad = parseFloat(document.getElementById("cantidad").value);
  const cantidadTexto = document.getElementById("cantidadTexto").value;
  const mesInicio = document.getElementById("mesInicio").value;
  const mesSiguiente = document.getElementById("mesSiguiente").value;

  const fecha = new Date().toLocaleDateString("es-MX");
  const contenido = `
    <h2>Asociación de Colonos del Circuito Hacienda Santa Bárbara</h2>
    <p><strong>Folio:</strong> ${folio++}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <p><strong>Recibimos de:</strong> ${nombre}</p>
    <p><strong>Número de casa:</strong> ${casa}</p>
    <p><strong>Cantidad:</strong> $${cantidad.toFixed(2)} (${cantidadTexto})</p>
    <p><strong>Periodo:</strong> ${mesInicio} ${mesSiguiente}</p>
    <p style="margin-top:20px; font-style: italic;">El pago de este recibo no lo exime de adeudos anteriores.</p>
    <button onclick="window.print()">Imprimir Recibo</button>
  `;

  const divRecibo = document.getElementById("recibo");
  divRecibo.innerHTML = '<img src="logo_haciendas_blanco_fondo.png" class="logo" />' + contenido;
  divRecibo.classList.remove("hidden");
}
