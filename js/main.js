// Base de données et état utilisateur
const usersDB = JSON.parse(localStorage.getItem("usersDB")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let questionCount = parseInt(localStorage.getItem("questionCount")) || 0;

// Données de navigation
const navigationLinks = [
    { "id": 1, "href": "#accueil", "label": "Accueil" },
    { "id": 2, "href": "#apropos", "label": "À propos" },
    { "id": 3, "href": "#services", "label": "Services" },
    { "id": 4, "href": "#avis", "label": "Avis" },
    { "id": 5, "href": "#faq", "label": "FAQ" },
    { "id": 6, "href": "#contact", "label": "Contact" }
];

// Données FAQ
const faqItems = [
    { "id": 1, "question": "Comment fonctionne l'avocat IA ?", "answer": "Notre IA analyse votre situation et vous fournit des conseils juridiques personnalisés basés sur la législation française." },
    { "id": 2, "question": "Est-ce confidentiel ?", "answer": "Absolument. Toutes vos données sont cryptées et protégées conformément au RGPD." }
];

/**
 * Met à jour l'interface utilisateur d'authentification
 */
function updateAuthUI() {
    const authButtons = document.getElementById("auth-buttons");
    const userMenu = document.getElementById("user-menu");
    const userName = document.getElementById("user-name");
    
    if (currentUser) {
        authButtons.classList.add("hidden");
        userMenu.classList.remove("hidden");
        userName.textContent = currentUser.prenom + " " + currentUser.nom;
        questionCount = 0;
        localStorage.setItem("questionCount", questionCount);
        updateChatUI();
    } else {
        authButtons.classList.remove("hidden");
        userMenu.classList.add("hidden");
        updateChatUI();
    }
}

/**
 * Met à jour l'interface utilisateur du chat
 */
function updateChatUI() {
    const chatInputSection = document.getElementById("chat-input-section");
    const authRequired = document.getElementById("auth-required");
    
    if (currentUser || questionCount < 2) {
        chatInputSection.classList.remove("hidden");
        authRequired.classList.add("hidden");
    } else {
        chatInputSection.classList.add("hidden");
        authRequired.classList.remove("hidden");
    }
}

/**
 * Ajoute un message dans le chat
 * @param {string} message - Le message à afficher
 * @param {boolean} isUser - Indique si le message provient de l'utilisateur
 */
function addChatMessage(message, isUser = false) {
    const chatMessages = document.getElementById("chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = isUser ? "bg-gray-100 rounded-lg p-4 ml-8" : "bg-blue-50 rounded-lg p-4 mr-8";
    messageDiv.innerHTML = `<p class="text-gray-700">${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Initialisation de l'application au chargement du DOM
 */
document.addEventListener("DOMContentLoaded", function() {
    updateAuthUI();
    updateChatUI();

    // Récupération des éléments du DOM
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    const closeLogin = document.getElementById("close-login");
    const closeRegister = document.getElementById("close-register");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const loginChatBtn = document.getElementById("login-chat-btn");
    const registerChatBtn = document.getElementById("register-chat-btn");

    // Gestionnaires d'événements pour les modales
    loginBtn.addEventListener("click", () => loginModal.classList.remove("hidden"));
    registerBtn.addEventListener("click", () => registerModal.classList.remove("hidden"));
    logoutBtn.addEventListener("click", () => {
        currentUser = null;
        localStorage.removeItem("currentUser");
        updateAuthUI();
    });

    closeLogin.addEventListener("click", () => loginModal.classList.add("hidden"));
    closeRegister.addEventListener("click", () => registerModal.classList.add("hidden"));
    loginChatBtn.addEventListener("click", () => {
        loginModal.classList.remove("hidden");
        document.getElementById("auth-required").classList.add("hidden");
    });
    registerChatBtn.addEventListener("click", () => {
        registerModal.classList.remove("hidden");
        document.getElementById("auth-required").classList.add("hidden");
    });

    // Gestionnaire de soumission du formulaire de connexion
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        
        const user = usersDB.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            loginModal.classList.add("hidden");
            updateAuthUI();
            loginForm.reset();
        } else {
            alert("Email ou mot de passe incorrect");
        }
    });

    // Gestionnaire de soumission du formulaire d'inscription
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const userData = {
            civilite: document.getElementById("civilite").value,
            nom: document.getElementById("nom").value,
            prenom: document.getElementById("prenom").value,
            telephone: document.getElementById("telephone").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
        
        if (usersDB.find(u => u.email === userData.email)) {
            alert("Un compte avec cet email existe déjà");
            return;
        }
        
        usersDB.push(userData);
        localStorage.setItem("usersDB", JSON.stringify(usersDB));
        currentUser = userData;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        registerModal.classList.add("hidden");
        updateAuthUI();
        registerForm.reset();
    });

    // Gestionnaire d'envoi de message dans le chat
    sendBtn.addEventListener("click", function() {
        const message = chatInput.value.trim();
        if (message) {
            if (!currentUser && questionCount >= 2) {
                document.getElementById("auth-required").classList.remove("hidden");
                document.getElementById("chat-input-section").classList.add("hidden");
                return;
            }
            
            addChatMessage(message, true);
            questionCount++;
            localStorage.setItem("questionCount", questionCount);
            
            setTimeout(() => {
                addChatMessage("Merci pour votre question. Notre équipe juridique vous répondra dans les plus brefs délais.");
            }, 1000);
            
            chatInput.value = "";
            updateChatUI();
        }
    });

    // Gestionnaire pour la touche Entrée dans le chat
    chatInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // Scroll fluide pour les ancres
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});

