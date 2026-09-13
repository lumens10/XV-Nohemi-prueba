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


if (passNumber) {

    if (
        invitation.pass &&
        invitation.pass.guests
    ) {

        passNumber.textContent =
            invitation.pass.guests;

    } else {

        passNumber.textContent =
            "Próximamente";

    }

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
