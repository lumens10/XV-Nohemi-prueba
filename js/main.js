document.addEventListener("DOMContentLoaded", () => {

    /* ================================================
       ELEMENTOS PRINCIPALES
    ================================================= */

    const opening = document.getElementById("opening");
    const invitation = document.getElementById("invitation");

    const openButton =
        document.getElementById("openInvitation");

    const music =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");

    let musicPlaying = false;


    /* ================================================
       CONFIGURACIÓN GENERAL
    ================================================= */

    document.title =
        `Mis XV — ${invitationData.quinceanera.name}`;


    /* ================================================
       NOMBRE
    ================================================= */

    const nameElements =
        document.querySelectorAll("[data-name]");

    nameElements.forEach(element => {
        element.textContent =
            invitationData.quinceanera.name;
    });


    /* ================================================
       FAMILIA
    ================================================= */

    const father =
        document.querySelector("[data-father]");

    const mother =
        document.querySelector("[data-mother]");

    const godfather =
        document.querySelector("[data-godfather]");

    const godmother =
        document.querySelector("[data-godmother]");


    if (father) {
        father.textContent =
            invitationData.family.parents.father;
    }

    if (mother) {
        mother.textContent =
            invitationData.family.parents.mother;
    }

    if (godfather) {
        godfather.textContent =
            invitationData.family.godparents.father;
    }

    if (godmother) {
        godmother.textContent =
            invitationData.family.godparents.mother;
    }


    /* ================================================
       ABRIR INVITACIÓN
    ================================================= */

    openButton.addEventListener("click", async () => {

        /*
         * Primero mostramos la invitación
         */

        invitation.classList.add("is-visible");


        /*
         * Bloqueamos temporalmente el botón
         */

        openButton.disabled = true;


        /*
         * Animación de salida de la portada
         */

        opening.classList.add("opening-hidden");


        /*
         * Permitimos hacer scroll
         */

        document.body.classList.add("page-open");


        /*
         * Reproducimos música
         */

        try {

            await music.play();

            musicPlaying = true;

            musicButton.classList.add("playing");

        } catch (error) {

            console.log(
                "El navegador requiere interacción para reproducir la música."
            );

        }


        /*
         * Después de la animación,
         * eliminamos completamente la pantalla inicial
         */

        setTimeout(() => {

            opening.style.display = "none";

        }, 1000);

    });


    /* ================================================
       CONTROL DE MÚSICA
    ================================================= */

    musicButton.addEventListener("click", async () => {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.classList.remove("playing");

        } else {

            try {

                await music.play();

                musicPlaying = true;

                musicButton.classList.add("playing");

            } catch (error) {

                console.log(
                    "No fue posible reproducir el audio."
                );

            }

        }

    });


    /* ================================================
       CONTADOR
    ================================================= */

    const targetDate =
        new Date(
            invitationData.event.date
        ).getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const difference =
            targetDate - now;


        if (difference <= 0) {

            const countdown =
                document.getElementById("countdown");

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
                (difference / 1000) % 60
            );


        document.getElementById("days").textContent =
            String(days).padStart(2, "0");


        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");


        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");


        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* ================================================
       GALERÍA
    ================================================= */

    const gallery =
        document.querySelector(".gallery");


    if (gallery && invitationData.gallery) {

        gallery.innerHTML = "";


        invitationData.gallery.forEach(
            (image, index) => {

                const item =
                    document.createElement("div");


                item.className =
                    `gallery-item gallery-${index + 1}`;


                item.innerHTML = `
                    <img
                        src="${image}"
                        alt="Fotografía de ${invitationData.quinceanera.name} ${index + 1}"
                        loading="lazy"
                    >
                `;


                gallery.appendChild(item);

            }
        );

    }


    /* ================================================
       PASE
    ================================================= */

    const passNumber =
        document.querySelector(".pass-number");


    if (passNumber) {

        if (invitationData.pass.people) {

            passNumber.textContent =
                invitationData.pass.people;

        } else {

            passNumber.textContent =
                "Próximamente";

        }

    }


    /* ================================================
       WHATSAPP
    ================================================= */

    const whatsappButton =
        document.getElementById("whatsappButton");


    if (whatsappButton) {

        const message =
            encodeURIComponent(
                `Hola, quiero confirmar mi asistencia a los XV años de ${invitationData.quinceanera.name}.`
            );


        whatsappButton.href =
            `https://wa.me/${invitationData.confirmation.whatsapp}?text=${message}`;

    }


    /* ================================================
       ANIMACIONES AL HACER SCROLL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    }

});
