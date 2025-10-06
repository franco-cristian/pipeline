document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('dashboard.html')) {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Por favor, inicia sesión para acceder a tu dashboard.');
            window.location.href = 'index.html';
            return;
        }

        const user = JSON.parse(loggedInUser);
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement) {
            userInfoElement.innerHTML = `
                <p><strong>Nombre:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
            `;
        }
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = registerForm.querySelector('input[type="text"]').value;
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const userExists = users.find(user => user.email === email);
            if (userExists) {
                alert('El correo electrónico ya está registrado.');
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            window.location.href = 'index.html';
        });
    }

    // --- LÓGICA DE LOGIN ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                alert(`¡Bienvenido de nuevo, ${user.name}!`);
                window.location.href = 'dashboard.html';
            } else {
                alert('Credenciales incorrectas.');
            }
        });
    }

    // --- LÓGICA DE LOGOUT ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            alert('Sesión cerrada.');
            window.location.href = 'index.html';
        });
    }

    // --- LÓGICA DE RECUPERACIÓN ---
    const forgotPasswordLink = document.getElementById('forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = prompt('Por favor, ingresa tu correo electrónico para recuperar tu contraseña:');
            if (email) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userExists = users.find(user => user.email === email);
                if (userExists) {
                    alert('Se ha enviado un enlace de recuperación a tu correo (simulación).');
                } else {
                    alert('El correo electrónico no se encuentra registrado.');
                }
            }
        });
    }
});