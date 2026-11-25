
// Preguntas del quiz
const preguntas = [

    {
        pregunta: "¿Cómo se llama el personaje de Vin Diesel?",
        opciones: ["Brian", "Dominic", "Roman", "Hobbs"],
        correcta: 1
    },

    {
        pregunta: "¿Qué actor interpreta a Brian O'Conner?",
        opciones: ["Jason Statham", "Dwayne Johnson", "Paul Walker", "Tyrese Gibson"],
        correcta: 2
    },

    {
        pregunta: "¿Cómo se llama la hermana de Dominic?",
        opciones: ["Letty", "Mia", "Gisele", "Ramsey"],
        correcta: 1
    },

    {
        pregunta: "¿En qué ciudad ocurre principalmente la segunda película?",
        opciones: ["Tokio", "Miami", "Londres", "Río de Janeiro"],
        correcta: 1
    },

    {
        pregunta: "¿Cómo se llama el protagonista de Reto Tokio?",
        opciones: ["Sean Boswell", "Brian O'Conner", "Han", "Roman"],
        correcta: 0
    },

    {
        pregunta: "¿Qué actor interpreta a Luke Hobbs?",
        opciones: ["Vin Diesel", "Paul Walker", "Dwayne Johnson", "Jason Statham"],
        correcta: 2
    },

    {
        pregunta: "¿Cómo se llama el personaje interpretado por Sung Kang?",
        opciones: ["Tej", "Han", "Roman", "Deckard"],
        correcta: 1
    },

    {
        pregunta: "¿En qué país ocurre principalmente Fast Five?",
        opciones: ["Japón", "Brasil", "México", "España"],
        correcta: 1
    },

    {
        pregunta: "¿Cómo se llama la pareja de Dominic Toretto?",
        opciones: ["Mia", "Gisele", "Ramsey", "Letty"],
        correcta: 3
    },

    {
        pregunta: "¿En qué año se estrenó la primera película?",
        opciones: ["1999", "2001", "2003", "2005"],
        correcta: 1
    }

];


// Elementos del HTML
const preguntaHTML = document.getElementById("pregunta");
const opcionesHTML = document.getElementById("opciones");
const mensajeHTML = document.getElementById("mensaje");
const puntajeHTML = document.getElementById("puntaje");
const tiempoHTML = document.getElementById("tiempo");

const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");
const revision = document.getElementById("revision");

const siguiente = document.getElementById("siguiente");
const reiniciar = document.getElementById("reiniciar");


// Variables del examen
let numero = 0;
let puntaje = 0;
let tiempo = 60;
let temporizador;
let avance;
let respondida = false;

let respuestasUsuario = [];


// Mostrar pregunta
function mostrarPregunta() {

    clearInterval(temporizador);
    clearTimeout(avance);

    respondida = false;
    tiempo = 60;

    tiempoHTML.textContent = tiempo;
    mensajeHTML.textContent = "";
    siguiente.hidden = true;

    preguntaHTML.textContent = preguntas[numero].pregunta;

    document.getElementById("contador").textContent =
        `Pregunta ${numero + 1} de ${preguntas.length}`;

    opcionesHTML.innerHTML = "";

    preguntas[numero].opciones.forEach(function(opcion, i) {

        const boton = document.createElement("button");

        boton.textContent = opcion;
        boton.classList.add("opcion");

        boton.addEventListener("click", function() {

            comprobarRespuesta(i);

        });

        opcionesHTML.appendChild(boton);

    });

    iniciarTemporizador();

}


// Comprobar respuesta
function comprobarRespuesta(seleccion) {

    if (respondida) return;

    respondida = true;

    clearInterval(temporizador);

    // Guardar respuesta del usuario
    respuestasUsuario[numero] =
        preguntas[numero].opciones[seleccion];

    const correcta = preguntas[numero].correcta;

    const botones = opcionesHTML.children;


    // Desactivar botones y mostrar respuesta correcta
    for (let i = 0; i < botones.length; i++) {

        botones[i].disabled = true;

        if (i === correcta) {

            botones[i].classList.add("correcta");

        }

    }


    // Comprobar respuesta
    if (seleccion === correcta) {

        puntaje++;

        mensajeHTML.textContent = "¡Correcto! +1 punto.";

    } else {

        botones[seleccion].classList.add("incorrecta");

        mensajeHTML.textContent =
            "Incorrecto. La respuesta correcta era: " +
            preguntas[numero].opciones[correcta];

    }


    // Actualizar puntaje
    puntajeHTML.textContent = puntaje;

    // Mostrar botón siguiente
    siguiente.hidden = false;

    siguiente.textContent =
        numero === preguntas.length - 1
        ? "Ver resultado"
        : "Siguiente";

}


// Iniciar temporizador
function iniciarTemporizador() {

    temporizador = setInterval(function() {

        tiempo--;

        tiempoHTML.textContent = tiempo;

        if (tiempo <= 0) {

            clearInterval(temporizador);

            comprobarTiempo();

        }

    }, 1000);

}


// Cuando se acaba el tiempo
function comprobarTiempo() {

    if (respondida) return;

    respondida = true;

    puntaje--;

    // Guardar pregunta sin responder
    respuestasUsuario[numero] = "Sin responder";

    const correcta = preguntas[numero].correcta;

    const botones = opcionesHTML.children;


    // Desactivar botones
    for (let i = 0; i < botones.length; i++) {

        botones[i].disabled = true;

        if (i === correcta) {

            botones[i].classList.add("correcta");

        }

    }


    mensajeHTML.textContent =
        "¡Tiempo agotado! -1 punto. Respuesta correcta: " +
        preguntas[numero].opciones[correcta];

    puntajeHTML.textContent = puntaje;


    // Avanzar automáticamente
    avance = setTimeout(function() {

        avanzarPregunta();

    }, 2500);

}


// Siguiente pregunta
function avanzarPregunta() {

    clearInterval(temporizador);
    clearTimeout(avance);

    numero++;

    if (numero < preguntas.length) {

        mostrarPregunta();

    } else {

        mostrarResultado();

    }

}


// Mostrar resultados finales
function mostrarResultado() {

    clearInterval(temporizador);

    quiz.hidden = true;
    resultado.hidden = false;

    document.getElementById("total").textContent = puntaje;

    revision.innerHTML = "";


    // Mostrar todas las respuestas
    preguntas.forEach(function(pregunta, i) {

        const correcta = pregunta.opciones[pregunta.correcta];

        const miRespuesta = respuestasUsuario[i];

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("revision");


        // Comprobar si acertó
        if (miRespuesta === correcta) {

            tarjeta.classList.add("correcta");

        } else if (miRespuesta === "Sin responder") {

            tarjeta.classList.add("sin-responder");

        } else {

            tarjeta.classList.add("incorrecta");

        }


        // Crear contenido de la tarjeta
        const titulo = document.createElement("p");

        titulo.textContent =
            (i + 1) + ". " + pregunta.pregunta;

        const respuesta = document.createElement("p");

        respuesta.textContent =
            "Tu respuesta: " + miRespuesta;

        const solucion = document.createElement("p");

        solucion.textContent =
            "Respuesta correcta: " + correcta;


        // Agregar elementos
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(respuesta);
        tarjeta.appendChild(solucion);

        revision.appendChild(tarjeta);

    });

}


// Reiniciar examen
function iniciarQuiz() {

    clearInterval(temporizador);
    clearTimeout(avance);

    numero = 0;
    puntaje = 0;

    respuestasUsuario = [];

    puntajeHTML.textContent = puntaje;

    resultado.hidden = true;
    quiz.hidden = false;

    mostrarPregunta();

}


// Eventos de los botones
siguiente.addEventListener("click", avanzarPregunta);

reiniciar.addEventListener("click", iniciarQuiz);


// Iniciar examen
iniciarQuiz();
