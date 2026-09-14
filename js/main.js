document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   ELEMENTOS DEL HTML
===================================================== */

const opening = document.getElementById("opening");
const invitationPage = document.getElementById("invitation");

const openButton = document.getElementById("openInvitation");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const whatsappButton = document.getElementById("whatsappButton");

let musicPlaying = false;


/* =====================================================
   SEGURIDAD
===================================================== */

if (!opening) {
    console.error("No se encontró #opening");
    return;
}

if (!invitationPage) {
    console.error("No se encontró #invitation");
    return;
}


/* =====================================================
   INFORMACIÓN GENERAL
===================================================== */

document.title = `Mis XV — ${invitation.quinceanera.name}`;


/* =====================================================
   DATOS DE LA INVITACIÓN
===================================================== */

const name = invitation.quinceanera.name;

const father = invitation.family.father;
const mother = invitation.family.mother;

const godfather = invitation.family.godfather;
const godmother = invitation.family.godmother;

const ceremonyName = invitation.ceremony.name;
const ceremonyMap = invitation.ceremony.maps;

const receptionName = invitation.reception.name;
const receptionMap = invitation.reception.maps;

const ceremonyTime = invitation.event.ceremonyTime;
const receptionTime = invitation.event.receptionTime;

const dressCode = invitation.dressCode;

const whatsappPhone = invitation.rsvp.phone;
const whatsappMessage = invitation.rsvp.message;


/* =====================================================
   INSERTAR DATOS EN EL HTML
===================================================== */

const nameElements =
    document.querySelectorAll("[data-name]");

nameElements.forEach(element => {
    element.textContent = name;
});


const fatherElement =
    document.querySelector("[data-father]");

if (fatherElement) {
    fatherElement.textContent = father;
}


const motherElement =
    document.querySelector("[data-mother]");

if (motherElement) {
    motherElement.textContent = mother;
}


const godfatherElement =
    document.querySelector("[data-godfather]");

if (godfatherElement) {
    godfatherElement.textContent = godfather;
}


const godmotherElement =
    document.querySelector("[data-godmother]");

if (godmotherElement) {
    godmotherElement.textContent = godmother;
}


/* =====================================================
   CEREMONIA
===================================================== */

const ceremonyHeading =
    document.querySelector(".ceremony h2");

if (ceremonyHeading) {
    ceremonyHeading.innerHTML =
        ceremonyName.replace(
            " Santiago",
            "<br>Santiago"
        );
}


const ceremonyTimeElement =
    document.querySelector(".ceremony .event-time");

if (ceremonyTimeElement) {
    ceremonyTimeElement.textContent =
        ceremonyTime;
}


const ceremonyButton =
    document.querySelector(".ceremony .gold-button");

if (ceremonyButton) {
    ceremonyButton.href = ceremonyMap;
}


/* =====================================================
   RECEPCIÓN
===================================================== */

const receptionHeading =
    document.querySelector(".reception h2");

if (receptionHeading) {
    receptionHeading.innerHTML =
        receptionName.replace(
            "Casa Nava",
            "Casa Nava"
        );
}


const receptionTimeElement =
    document.querySelector(".reception .event-time");

if (receptionTimeElement) {
    receptionTimeElement.textContent =
        receptionTime;
}


const receptionButton =
    document.querySelector(".reception .gold-button");

if (receptionButton) {
    receptionButton.href = receptionMap;
}


/* =====================================================
   CÓDIGO DE VESTIMENTA
===================================================== */

const dressHeading =
    document.querySelector(".dress-section h2");

if (dressHeading) {
    dressHeading.textContent = dressCode;
}


/* =====================================================
   PANTALLA DE APERTURA
===================================================== */

openButton?.addEventListener("click", async () => {

    if (
        opening.classList.contains(
            "opening-hidden"
        )
    ) {
        return;
    }


    /*
       Permitir desplazamiento.
    */

    document.body.classList.add(
        "page-open"
    );


    /*
       Mostrar la invitación.
    */

    invitationPage.classList.add(
        "is-visible"
    );


    /*
       Ocultar apertura.
    */

    opening.classList.add(
        "opening-hidden"
    );


    /*
       Música
    */

    if (music) {

        try {

            await music.play();

            musicPlaying = true;

            musicButton?.classList.add(
                "playing"
            );

        } catch (error) {

            console.log(
                "La música no pudo reproducirse automáticamente."
            );

            musicPlaying = false;

        }

    }

});


/* =====================================================
   CONTROL DE MÚSICA
===================================================== */

if (
    musicButton &&
    music
) {

    musicButton.addEventListener(
        "click",
        async () => {

            if (musicPlaying) {

                music.pause();

                musicPlaying = false;

                musicButton.classList.remove(
                    "playing"
                );

            } else {

                try {

                    await music.play();

                    musicPlaying = true;

                    musicButton.classList.add(
                        "playing"
                    );

                } catch (error) {

                    console.log(
                        "No fue posible reproducir el audio."
                    );

                }

            }

        }
    );

}


/* =====================================================
   CONTADOR
===================================================== */

const targetDate =
    new Date(
        invitation.event.date
    ).getTime();


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const countdown =
    document.getElementById("countdown");


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        targetDate - now;


    if (difference <= 0) {

        if (countdown) {

            countdown.innerHTML = `
                <div class="today-message">
                    ✦ Hoy es el gran día ✦
                </div>
            `;

        }

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(
                2,
                "0"
            );

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   PASE DE INVITACIÓN
===================================================== */

const passNumber =
    document.querySelector(
        ".pass-number"
    );


/*
   Leer el número de pase desde el enlace.

   Ejemplos:

   ?pase=2
   ?pase=3
   ?pase=4
   ?pase=5
   ?pase=6
*/

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const paseParam =
    Number(
        urlParams.get("pase")
    );


/*
   Solo permitimos pases
   de 2 a 6 personas.
*/

const guestCount =
    Number.isInteger(paseParam) &&
    paseParam >= 2 &&
    paseParam <= 6

        ? paseParam

        : (
            invitation.pass &&
            invitation.pass.guests
                ? invitation.pass.guests
                : 2
        );


/*
   Mostrar el número
   correspondiente.
*/

if (passNumber) {

    passNumber.textContent =
        guestCount;

}

/* =====================================================
   WHATSAPP
===================================================== */

if (whatsappButton) {

    const encodedMessage =
        encodeURIComponent(
            whatsappMessage
        );


    whatsappButton.href =
        `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;


    whatsappButton.target =
        "_blank";


    whatsappButton.rel =
        "noopener noreferrer";

}


/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


/* =====================================================
   DIRECCIÓN DEL SCROLL
===================================================== */

let lastScrollY =
    window.scrollY;

let scrollDirection =
    "down";


window.addEventListener(
    "scroll",
    () => {

        const currentScrollY =
            window.scrollY;


        if (
            currentScrollY >
            lastScrollY
        ) {

            scrollDirection =
                "down";

        } else if (
            currentScrollY <
            lastScrollY
        ) {

            scrollDirection =
                "up";

        }


        lastScrollY =
            currentScrollY;

    },
    {
        passive: true
    }
);


/* =========================================================
   INTERSECTION OBSERVER
   ---------------------------------------------------------
   OBSERVER 1:
   Controla la entrada y salida general de cada sección.

   OBSERVER 2:
   Controla cuándo comienza la animación individual
   de los elementos internos.
========================================================= */

if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {


    /* =====================================================
       OBSERVER GENERAL
    ===================================================== */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            /*
                               La sección entra
                               en pantalla.
                            */

                            entry.target.classList.remove(
                                "exit-up",
                                "exit-down"
                            );


                            entry.target.classList.add(
                                "visible"
                            );

                        } else {

                            /*
                               La sección salió
                               de pantalla.

                               También reiniciamos
                               la animación interna.
                            */

                            entry.target.classList.remove(
                                "visible"
                            );


                            entry.target.classList.remove(
                                "animate-content"
                            );


                            /*
                               Dirección de salida.
                            */

                            if (
                                scrollDirection ===
                                "down"
                            ) {

                                entry.target.classList.remove(
                                    "exit-down"
                                );

                                entry.target.classList.add(
                                    "exit-up"
                                );

                            } else {

                                entry.target.classList.remove(
                                    "exit-up"
                                );

                                entry.target.classList.add(
                                    "exit-down"
                                );

                            }

                        }

                    }
                );

            },
            {

                /*
                   Detectamos la sección
                   cuando apenas comienza
                   a entrar.
                */

                threshold: 0.05,

                rootMargin:
                    "5% 0px 5% 0px"

            }
        );


    /* =====================================================
       OBSERVER DE ANIMACIÓN INTERNA
    ===================================================== */

    const contentObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            /*
                               Ahora sí:
                               comienza la animación
                               individual.
                            */

                            entry.target.classList.add(
                                "animate-content"
                            );

                        } else {

                            /*
                               La sección salió
                               de la zona central.

                               La dejamos preparada
                               para reproducirse otra
                               vez al regresar.
                            */

                            entry.target.classList.remove(
                                "animate-content"
                            );

                        }

                    }
                );

            },
            {

                /*
                   ZONA CENTRAL DE ACTIVACIÓN.

                   El bloque debe entrar bastante
                   dentro de la pantalla antes
                   de comenzar su animación.
                */

                threshold: 0.15,

                rootMargin:
                    "-18% 0px -18% 0px"

            }
        );


    /* =====================================================
       COMENZAR A OBSERVAR
    ===================================================== */

    revealElements.forEach(
        element => {

            /*
               Observer general.
            */

            observer.observe(
                element
            );


            /*
               Observer de contenido.
            */

            contentObserver.observe(
                element
            );

        }
    );

}

/* =====================================================
   VISOR DE FOTOGRAFÍAS — GALERÍA
===================================================== */

const galleryImages =
    Array.from(
        document.querySelectorAll(
            ".gallery-item img"
        )
    );


/* =====================================================
   ESTADO DEL VISOR
===================================================== */

let currentGalleryIndex = 0;


/* =====================================================
   CREAR VENTANA DEL VISOR
===================================================== */

const lightbox =
    document.createElement("div");

lightbox.className =
    "gallery-lightbox";


/* =====================================================
   CONTENEDOR DE LA FOTO
===================================================== */

const lightboxContent =
    document.createElement("div");

lightboxContent.className =
    "gallery-lightbox-content";


/* =====================================================
   IMAGEN AMPLIADA
===================================================== */

const lightboxImage =
    document.createElement("img");

lightboxImage.className =
    "gallery-lightbox-image";

lightboxImage.alt =
    "";


/* =====================================================
   BOTÓN ANTERIOR
===================================================== */

const lightboxPrev =
    document.createElement("button");

lightboxPrev.className =
    "gallery-lightbox-prev";

lightboxPrev.type =
    "button";

lightboxPrev.setAttribute(
    "aria-label",
    "Fotografía anterior"
);

lightboxPrev.innerHTML =
    "‹";


/* =====================================================
   BOTÓN SIGUIENTE
===================================================== */

const lightboxNext =
    document.createElement("button");

lightboxNext.className =
    "gallery-lightbox-next";

lightboxNext.type =
    "button";

lightboxNext.setAttribute(
    "aria-label",
    "Fotografía siguiente"
);

lightboxNext.innerHTML =
    "›";


/* =====================================================
   BOTÓN CERRAR
===================================================== */

const lightboxClose =
    document.createElement("button");

lightboxClose.className =
    "gallery-lightbox-close";

lightboxClose.type =
    "button";

lightboxClose.setAttribute(
    "aria-label",
    "Cerrar fotografía"
);

lightboxClose.innerHTML =
    "&times;";


/* =====================================================
   INDICADOR 1 / 6
===================================================== */

const lightboxCounter =
    document.createElement("div");

lightboxCounter.className =
    "gallery-lightbox-counter";


/* =====================================================
   CONSTRUIR VISOR
===================================================== */

lightboxContent.appendChild(
    lightboxImage
);

lightbox.appendChild(
    lightboxContent
);

lightbox.appendChild(
    lightboxPrev
);

lightbox.appendChild(
    lightboxNext
);

lightbox.appendChild(
    lightboxClose
);

lightbox.appendChild(
    lightboxCounter
);

document.body.appendChild(
    lightbox
);


/* =====================================================
   ACTUALIZAR FOTOGRAFÍA
===================================================== */

function updateGalleryImage() {

    if (
        galleryImages.length === 0
    ) {
        return;
    }


    const image =
        galleryImages[
            currentGalleryIndex
        ];


    /*
       Cambiar imagen.
    */

    lightboxImage.src =
        image.currentSrc ||
        image.src;


    lightboxImage.alt =
        image.alt || "";


    /*
       Actualizar contador.
    */

    lightboxCounter.textContent =
        `${currentGalleryIndex + 1} / ${galleryImages.length}`;


    /*
       Reiniciar pequeña animación
       de cambio de fotografía.
    */

    lightboxImage.classList.remove(
        "gallery-image-changing"
    );


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            lightboxImage.classList.add(
                "gallery-image-changing"
            );

        });

    });

}


/* =====================================================
   ABRIR FOTOGRAFÍA
===================================================== */

function openGalleryImage(index) {

    if (
        galleryImages.length === 0
    ) {
        return;
    }


    currentGalleryIndex =
        (
            index +
            galleryImages.length
        ) %
        galleryImages.length;


    updateGalleryImage();


    lightbox.classList.add(
        "is-open"
    );


    document.body.classList.add(
        "gallery-lightbox-open"
    );

}


/* =====================================================
   CERRAR FOTOGRAFÍA
===================================================== */

function closeGalleryImage() {

    lightbox.classList.remove(
        "is-open"
    );


    document.body.classList.remove(
        "gallery-lightbox-open"
    );


    setTimeout(() => {

        if (
            !lightbox.classList.contains(
                "is-open"
            )
        ) {

            lightboxImage.src = "";

        }

    }, 300);

}


/* =====================================================
   FOTOGRAFÍA ANTERIOR
===================================================== */

function showPreviousGalleryImage() {

    currentGalleryIndex =
        (
            currentGalleryIndex -
            1 +
            galleryImages.length
        ) %
        galleryImages.length;


    updateGalleryImage();

}


/* =====================================================
   FOTOGRAFÍA SIGUIENTE
===================================================== */

function showNextGalleryImage() {

    currentGalleryIndex =
        (
            currentGalleryIndex +
            1
        ) %
        galleryImages.length;


    updateGalleryImage();

}


/* =====================================================
   CLIC / TOUCH EN LAS FOTOS
===================================================== */

galleryImages.forEach(
    (image, index) => {

        image.addEventListener(
            "click",
            () => {

                openGalleryImage(
                    index
                );

            }
        );

    }
);


/* =====================================================
   BOTÓN ANTERIOR
===================================================== */

lightboxPrev.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        showPreviousGalleryImage();

    }
);


/* =====================================================
   BOTÓN SIGUIENTE
===================================================== */

lightboxNext.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        showNextGalleryImage();

    }
);


/* =====================================================
   BOTÓN CERRAR
===================================================== */

lightboxClose.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        closeGalleryImage();

    }
);


/* =====================================================
   CERRAR TOCANDO FUERA
===================================================== */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeGalleryImage();

        }

    }
);


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "is-open"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeGalleryImage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            showPreviousGalleryImage();

        }


        if (
            event.key === "ArrowRight"
        ) {

            showNextGalleryImage();

        }

    }
);


/* =====================================================
   DESLIZAMIENTO — CELULAR
===================================================== */

let touchStartX = 0;
let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;


        const swipeDistance =
            touchEndX -
            touchStartX;


        /*
           Evitar movimientos accidentales
           demasiado pequeños.
        */

        if (
            Math.abs(swipeDistance) <
            50
        ) {

            return;

        }


        if (
            swipeDistance < 0
        ) {

            showNextGalleryImage();

        } else {

            showPreviousGalleryImage();

        }

    },
    {
        passive: true
    }
);
/* =====================================================
   INICIALIZACIÓN
===================================================== */

document.body.classList.remove(
    "page-open"
);


opening.classList.remove(
    "opening-hidden"
);


console.log(
    `Invitación de ${name} cargada correctamente.`
);


});
