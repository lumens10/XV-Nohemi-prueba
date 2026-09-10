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
   Evita errores si algún elemento no existe.
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

    /*
       Evitamos que el botón pueda ejecutarse
       varias veces.
    */

    if (opening.classList.contains("opening-hidden")) {
        return;
    }


    /*
       Permitir desplazamiento de la página.
    */

    document.body.classList.add("page-open");


    /*
       Mostrar el contenido principal.
    */

    invitationPage.classList.add("is-visible");


    /*
       Ocultar la pantalla de apertura.
    */

    opening.classList.add("opening-hidden");


    /*
       Intentar reproducir la música.

       Como esta acción ocurre después de un clic
       del usuario, los navegadores normalmente
       permiten la reproducción.
    */

    if (music) {

        try {

            await music.play();

            musicPlaying = true;

            musicButton?.classList.add("playing");

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

if (musicButton && music) {

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

/*
   El evento está configurado para:
   19 de diciembre de 2026
   6:00 PM

   Usamos directamente la fecha del config.js.
*/

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
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference /
            1000) % 60
        );


    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(2, "0");

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(2, "0");

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

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
    document.querySelector(".pass-number");


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

/*
   Detectamos todos los bloques que tienen
   la clase ".reveal".

   IMPORTANTE:
   El Hero NO utiliza esta clase.

   Por lo tanto, sus animaciones originales
   continúan funcionando exactamente igual.
*/

const revealElements =
    document.querySelectorAll(".reveal");


/* =====================================================
   DIRECCIÓN DEL SCROLL
===================================================== */

/*
   Guardamos la posición anterior del scroll
   para saber si el usuario está:

   - bajando
   - subiendo

   Esto nos permite hacer que cada bloque
   desaparezca en la dirección correcta.
*/

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


/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

/*
   IntersectionObserver detecta cuándo cada
   bloque entra o sale de la zona visible.

   rootMargin:

   - hace que la animación comience un poco
     antes de llegar al centro de la pantalla.

   - también permite que desaparezca suavemente
     antes de salir completamente.

   Esto hace que el movimiento se sienta
   más cinematográfico y menos brusco.
*/

if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {


    const observer =
        new IntersectionObserver(
            (entries) => {


                entries.forEach(
                    entry => {


                        /* =================================
                           BLOQUE ENTRANDO
                        ================================= */

                        if (
                            entry.isIntersecting
                        ) {


                            /*
                               Quitamos cualquier estado
                               anterior de salida.

                               Esto es importante cuando
                               el usuario regresa haciendo
                               scroll hacia arriba.
                            */

                            entry.target.classList.remove(
                                "exit-up",
                                "exit-down"
                            );


                            /*
                               Activamos la animación
                               de entrada.
                            */

                            entry.target.classList.add(
                                "visible"
                            );


                        }


                        /* =================================
                           BLOQUE SALIENDO
                        ================================= */

                        else {


                            /*
                               Primero quitamos "visible"
                               para iniciar la desaparición.
                            */

                            entry.target.classList.remove(
                                "visible"
                            );


                            /*
                               Si el usuario está bajando,
                               el bloque desaparece hacia arriba.

                               Esto da la sensación de que
                               el contenido acompaña al scroll.
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

                            }


                            /*
                               Si el usuario está subiendo,
                               el bloque desaparece hacia abajo.

                               Al regresar aparecerá
                               nuevamente desde abajo.
                            */

                            else {

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
                   La animación comienza cuando
                   aproximadamente el 15% del bloque
                   entra en la zona de observación.
                */

                threshold: 0.15,


                /*
                   Reducimos ligeramente la zona de
                   observación para que los bloques
                   aparezcan y desaparezcan de forma
                   más elegante.
                */

                rootMargin:
                    "-10% 0px -10% 0px"

            }

        );


    /* =================================================
       COMENZAR A OBSERVAR
    ================================================= */

    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}
/* =====================================================
   INICIALIZACIÓN
===================================================== */

/*
   La invitación empieza bloqueada detrás
   de la pantalla de apertura.
*/

document.body.classList.remove(
    "page-open"
);


/*
   Nos aseguramos de que la pantalla
   de apertura esté visible al cargar.
*/

opening.classList.remove(
    "opening-hidden"
);


console.log(
    `Invitación de ${name} cargada correctamente.`
);


});
