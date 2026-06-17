// ==========================================
// 1. CONFIGURACIÓN DE LA FECHA DEL CUMPLEAÑOS
// ==========================================
// Parámetros: (Año, Mes [0-11], Día, Hora, Minutos, Segundos)
// IMPORTANTE: Recuerda que los meses en JavaScript van de 0 a 11 (Julio es el mes 6)
const fechaCumple = new Date(2026, 6, 1, 20, 0, 0).getTime(); 

// Actualizar la cuenta regresiva cada 1 segundo (1000 milisegundos)
const intervaloContador = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaCumple - ahora;

    // Conversión matemática de milisegundos a Días, Horas, Minutos y Segundos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Inyectar los valores en el HTML agregando un cero a la izquierda si es menor a 10
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

    // Si la fecha ya se cumplió o pasó
    if (distancia < 0) {
        clearInterval(intervaloContador);
        document.querySelector(".contador").innerHTML = "<b style='font-size: 1.2rem; color: #2d3436;'>¡Llegó el gran día! 🥳🎉</b>";
    }
}, 1000);


// ==========================================
// 2. CONTROL DEL FORMULARIO Y ENVÍO A WHATSAPP
// ==========================================
document.getElementById("rsvpForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Detiene el envío clásico del formulario para que la página no se recargue

    // CONFIGURACIÓN DE TU TELÉFONO: Pónlo sin el signo '+' y con el código de país. 
    // Ejemplo: 57 para Colombia + tu número.
    const numeroWhatsApp = "573001234567"; 

    // Captura de datos ingresados por el invitado
    const nombreInvitado = document.getElementById("nombre").value;
    const opcionAsistencia = document.getElementById("asistencia").value;
    const cantidadAcompanantes = document.getElementById("acompanantes").value;

    // Redacción del mensaje estructurado usando saltos de línea codificados (%0A)
    const mensajeTexto = `¡Hola! Confirmo mi asistencia al cumpleaños de Jurany 🎂%0A%0A` +
                          `• *Nombre:* ${nombreInvitado}%0A` +
                          `• *¿Asiste?:* ${opcionAsistencia}%0A` +
                          `• *Acompañantes:* ${cantidadAcompanantes}`;

    // Construcción de la URL oficial de la API de WhatsApp
    const urlDestino = `https://api.whatsapp.com/send?phone=${573182122259}&text=${mensajeTexto}`;

    // Abrir el chat en una pestaña nueva del navegador
    window.open(urlDestino, '_blank');
});


// ==========================================
// 3. VISOR DE IMAGEN GRANDE
// ==========================================
const abrirFoto = document.getElementById("abrirFoto");
const cerrarFoto = document.getElementById("cerrarFoto");
const fotoModal = document.getElementById("fotoModal");

function mostrarFoto() {
    fotoModal.classList.add("activo");
    fotoModal.setAttribute("aria-hidden", "false");
}

function ocultarFoto() {
    fotoModal.classList.remove("activo");
    fotoModal.setAttribute("aria-hidden", "true");
}

abrirFoto.addEventListener("click", mostrarFoto);
cerrarFoto.addEventListener("click", ocultarFoto);

fotoModal.addEventListener("click", function(event) {
    if (event.target === fotoModal) {
        ocultarFoto();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && fotoModal.classList.contains("activo")) {
        ocultarFoto();
    }
});