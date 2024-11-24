// Mostrar el carrusel en un modal
function mostrarCarrusel(categoria) {
    const contenedor = document.getElementById('carrusel-3d-container-modal');
    contenedor.innerHTML = ''; // Limpiar el carrusel previo

    let videos = [];
    if (categoria === 'persona') {
        videos = [
            { src: 'videos/persona_monografica.mp4', alt: 'Persona Monográfica' },
            { src: 'videos/persona_camI.mp4', alt: 'Persona Perspectiva Izquierda' },
            { src: 'videos/persona_camD.mp4', alt: 'Persona Perspectiva Derecha' }
        ];
    } else if (categoria === 'movimiento') {
        videos = [
            { src: 'videos/movimiento.mp4', alt: 'Movimiento Monográfico' },
            { src: 'videos/movD.mp4', alt: 'Movimiento Perspectiva Derecha' },
            { src: 'videos/movI.mp4', alt: 'Movimiento Perspectiva Izquierda' }
        ];
    } else if (categoria === 'caminata') {
        videos = [
            { src: 'videos/caminata.mp4', alt: 'Caminata Monográfica' },
            { src: 'videos/camI.mp4', alt: 'Caminata Perspectiva Derecha' },
            { src: 'videos/camD.mp4', alt: 'Caminata Perspectiva Izquierda' }
        ];
    }

    // Crear elementos de video para el carrusel
    videos.forEach((videoData, index) => {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'carrusel-item';

        if (index === 0) videoDiv.classList.add('active'); // El primer video será visible inicialmente

        const video = document.createElement('video');
        video.src = videoData.src;
        video.alt = videoData.alt;
        video.controls = true;
        video.autoplay = true; // Reproducir automáticamente
        video.muted = true; // Silenciar para evitar bloqueo de reproducción automática
        video.loop = false; // Opcional: si deseas que los videos se reinicien automáticamente
        
        // Reiniciar la reproducción del video cuando se muestre
        video.addEventListener('ended', () => {
            video.currentTime = 0; // Reinicia el tiempo de reproducción
            video.play(); // Vuelve a reproducir el video
        });

        // Añadir video y texto al div
        const videoText = document.createElement('p');
        videoText.className = 'carrusel-text';
        videoText.textContent = videoData.alt;

        videoDiv.appendChild(video);
        videoDiv.appendChild(videoText);
        contenedor.appendChild(videoDiv);
    });

    // Mostrar el modal
    const modal = document.getElementById('carrusel-3d-modal');
    modal.style.display = 'flex';

    iniciarCarrusel(); // Inicializar el carrusel sin cambio automático
}

function cerrarModal() {
    const modal = document.getElementById('carrusel-3d-modal');
    modal.style.display = 'none';

    // Detener todos los videos
    const videos = modal.querySelectorAll('video');
    videos.forEach(video => video.pause());

    detenerCarrusel();
}

let carruselIndex = 0;

// Inicializar carrusel (sin cambio automático)
function iniciarCarrusel() {
    const items = document.querySelectorAll('.carrusel-item');
    carruselIndex = 0; // Reiniciar índice del carrusel

    items.forEach(item => item.classList.remove('active'));
    if (items.length > 0) items[0].classList.add('active');
}

function detenerCarrusel() {
    // No se usa cambio automático, pero esta función queda aquí por consistencia
}

// Cambiar el video del carrusel
function cambiarVideo(direccion) {
    const items = document.querySelectorAll('.carrusel-item');
    if (items.length === 0) return;

    items[carruselIndex].classList.remove('active'); // Ocultar el video actual
    carruselIndex = (carruselIndex + direccion + items.length) % items.length; // Cambiar índice
    items[carruselIndex].classList.add('active'); // Mostrar el nuevo video
}

// Funciones para los botones flotantes
function irIzquierda(event) {
    event.stopPropagation(); // Evita cerrar el modal al hacer clic en el botón
    cambiarVideo(-1); // Cambiar al video anterior
}

function irDerecha(event) {
    event.stopPropagation(); // Evita cerrar el modal al hacer clic en el botón
    cambiarVideo(1); // Cambiar al video siguiente
}

// Agregar eventos de clic en las tarjetas para abrir el carrusel
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const categoria = card.getAttribute('data-category');
        mostrarCarrusel(categoria);
    });
});

// Agregar eventos de hover para cambiar el brillo de las tarjetas
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.card').forEach(c => {
            if (c !== card) {
                c.style.filter = 'brightness(0.6)'; // Reducir brillo en tarjetas no seleccionadas
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.card').forEach(c => {
            c.style.filter = 'brightness(1)'; // Restaurar brillo de todas las tarjetas
        });
    });
});
