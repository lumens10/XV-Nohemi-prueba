document.addEventListener("DOMContentLoaded", () => {

    /* ================================================
       ELEMENTOS
    ================================================= */

    const opening = document.getElementById("opening");
    const invitation = document.getElementById("invitation");

    const openButton = document.getElementById("openInvitation");

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    let musicPlaying = false;


    /* ================================================
       CONFIGURACIÓN GENERAL
    ================================================= */

    document.title = `Mis XV — ${invitation.quinceanera.name}`;

    document.getElementById("openingName").textContent =
        invitation.quinceanera.name;


    /* ================================================
       ABRIR INVITACIÓN
    ================================================= */
openButton.addEventListener("click", async () => {

    // Mostrar la invitación
    invitationPage.classList.remove("hidden");

    // Permitir desplazamiento
    document.body.classList.add("page-open");

    // Ocultar pantalla de bienvenida
    openingScreen.classList.add("opening-hidden");

    // Iniciar música
    try {

        await music.play();

        musicButton.classList.add("playing");

    } catch (error) {

        console.log("El navegador bloqueó la reproducción automática.");

    }

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

                console.log("No fue posible reproducir el audio.");

            }

        }

    });


    /* ================================================
       CONTADOR
    ================================================= */

    const targetDate = new Date(
        `${invitation.quinceanera.date}T18:00:00`
    ).getTime();


    function updateCountdown() {

        const now = new Date().getTime();

        const difference = targetDate - now;


        if (difference <= 0) {

            document.getElementById("countdown").innerHTML = `
                <div class="today-message">
                    ✦ Hoy es el gran día ✦
                </div>
            `;

            return;

        }


        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
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

    setInterval(updateCountdown, 1000);


    /* ================================================
       GALERÍA
    ================================================= */

    const gallery = document.getElementById("gallery");

    invitation.gallery.forEach((image, index) => {

        const item = document.createElement("div");

        item.className = `gallery-item gallery-${index + 1}`;

        item.innerHTML = `
            <img
                src="${image}"
                alt="Fotografía de Nohemi ${index + 1}"
                loading="lazy"
            >
        `;

        gallery.appendChild(item);

    });


    /* ================================================
       PASE
    ================================================= */

    const passPeople = document.getElementById("passPeople");

    if (invitation.pass.people) {

        passPeople.textContent = invitation.pass.people;

    } else {

        passPeople.textContent = "—";

    }


    /* ================================================
       WHATSAPP
    ================================================= */

    const whatsappButton =
        document.getElementById("whatsappButton");


    const message = encodeURIComponent(
        `Hola, quiero confirmar mi asistencia a los XV años de ${invitation.quinceanera.name}.`
    );


    whatsappButton.href =
        `https://wa.me/${invitation.whatsapp}?text=${message}`;


    /* ================================================
       ANIMACIONES AL HACER SCROLL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

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

});

