document.addEventListener("DOMContentLoaded", () => {

    /* --- GESTION DU MENU MOBILE --- */
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active'); // Ajoute/supprime la classe 'active'
            
            // Optionnel : change l'icône
            if (navbar.classList.contains('active')) {
                menuToggle.classList.remove('fa-bars');
                menuToggle.classList.add('fa-times'); // Icône "X"
            } else {
                menuToggle.classList.remove('fa-times');
                menuToggle.classList.add('fa-bars');
            }
        });
    }


    /* --- ANIMATION DES COMPÉTENCES (BARRES + CHIFFRES) --- */
    const skillItems = document.querySelectorAll(".skill-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Si l'élément est visible
            if (entry.isIntersecting) {
                const item = entry.target;

                // Ajoute la classe 'is-visible' pour l'animation d'entrée (fade-in)
                item.classList.add('is-visible');

                const skillBar = item.querySelector(".skill-bar");
                const percentageBox = item.querySelector(".skill-percentage-box");
                
                if (!skillBar || !percentageBox) return; // Sécurité

                const target = parseInt(skillBar.dataset.percentage, 10);
                if (isNaN(target)) return; // Sécurité

                // 1. Animer la largeur de la barre (via CSS transition)
                setTimeout(() => {
                    skillBar.style.width = target + "%";
                }, 200); // 200ms après l'apparition
                
                // 2. Animer le chiffre du pourcentage
                let count = 0;
                const interval = setInterval(() => {
                    if (count < target) {
                        count++;
                        percentageBox.textContent = count + "%";
                    } else {
                        clearInterval(interval); // Arrête le compteur
                    }
                }, 20); // Vitesse de comptage (20ms)

                // 3. On arrête d'observer cet élément
                observer.unobserve(item);
            }
        });
    }, { 
        threshold: 0.2 // Se déclenche quand 20% de l'item est visible
    });

    // On observe chaque item de compétence
    skillItems.forEach(item => {
        observer.observe(item);
    });


    /* === FORMULAIRE DE CONTACT 100% AUTOMATIQUE (EmailJS) === */
    const publicKey = "ciX31CjqArFcOSfkb";      // ← Remplace par ta Public Key EmailJS
    const serviceID = "service_ytw5b5f";      // ← Remplace par ton Service ID
    const templateID = "template_egm5ku8";    // ← Remplace par ton Template ID

    // Initialisation EmailJS
    emailjs.init(publicKey);

    const contactForm = document.getElementById("contact-form");
    const statusDiv = document.getElementById("form-status");
    const sendBtn = document.getElementById("send-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Animation bouton pendant l'envoi
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            sendBtn.disabled = true;
            statusDiv.innerHTML = "";

            // Envoi via EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    statusDiv.innerHTML = `
                        <p style="color: #00ff88; text-align:center; margin-top:15px; font-weight:bold;">
                            ✅ Message Sent Successfully ! Thank you for your message 🎉
                        </p>`;
                    contactForm.reset(); // Vide le formulaire
                })
                .catch((error) => {
                    console.error("EmailJS error:", error);
                    statusDiv.innerHTML = `
                        <p style="color: #ff4444; text-align:center; margin-top:15px; font-weight:bold;">
                            ❌ Error sending the message. Please try again later.
                        </p>`;
                })
                .finally(() => {
                    sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
                    sendBtn.disabled = false;
                });
        });
        // ================= CV MODAL =================

const cvBtn = document.getElementById("cv-btn");
const cvModal = document.getElementById("cv-modal");
const closeCv = document.querySelector(".cv-close");

cvBtn.addEventListener("click", function(e) {
    e.preventDefault();
    cvModal.style.display = "flex";
});

closeCv.addEventListener("click", function() {
    cvModal.style.display = "none";
});

window.addEventListener("click", function(e) {
    if (e.target === cvModal) {
        cvModal.style.display = "none";
    }
});
    }
});