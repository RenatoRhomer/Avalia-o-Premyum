function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let messageElement = document.getElementById('message');

    let data = {
        "username": username,
        "password": password
    };

    fetch('http://191.252.178.166:8080/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Não foi possível efetuar o login!');
        }
    })
    .then(data => {
        localStorage.setItem('message', data.message);
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'home.html';
        }
    })
    .catch(error => {
        messageElement.innerHTML = error.message;
        alert('Erro ao efetuar o login: ' + error.message);
    });
}

if (window.location.pathname.includes('home.html')) {
    let message = localStorage.getItem('message');
    if (message) {
        let container = document.getElementById('container');
        if (container) {
            container.innerHTML = '<h2>Bem-vindo à página Home</h2><p id="message">' + message + '</p>';
            localStorage.removeItem('message');
        }
    }
    alert('Login realizado com sucesso!');
}
