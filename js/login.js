//LETs and CONSTs
const formularioLogin = document.querySelector('#form-submit');

let usuarios = JSON.parse(localStorage.getItem('usuarios'));

//evento
formularioLogin.addEventListener('submit', validarLogin);



function validarLogin(e) {
	e.preventDefault();
	let inputEmail = document.querySelector('#inputEmail').value;
	let inputPassword = document.querySelector('#inputPassword').value;

	let user = usuarios.find((user) => {
		return user.email === inputEmail;
	});

	let password = usuarios.find((user) => {
		return user.password === inputPassword;
	});

	console.log(usuarios);
	console.log(inputEmail);
	console.log(user.password, inputPassword);

	if (user !== undefined && password !== undefined) {
		usuario = {
			id: user.id,
			email: user.email,
		};

		localStorage.setItem('usuario', JSON.stringify(usuario));

		if (user.id === 9999) {
			console.log("entre");
			location.href = 'admin.html';
		} else {
			location.href = 'home.html';
		}
	} else {
		console.log('usuario no valido');
	}
}
