//LETs and CONSTs
const validarUsuario = document.querySelector('#form-submit');
const formError = document.querySelector('#formError');

document.addEventListener('DOMContentLoaded', () => {
	usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
});

let usuarios = [];

class Usuario {
	constructor(id, user, name, email,  password) {
		this.id = id;
		this.user = user;
        this.name = name;
		this.email = email;
		this.password = password;
	}
}
					//	(id,  user, name, email, password)
let admin = new Usuario(9999, 'admin', 'admin', 'admin@gmail.com', 'admin');
usuarios = [...usuarios, admin];
localStorage.setItem('usuarios', JSON.stringify(usuarios));

console.log(usuarios);

//EVENTs
validarUsuario.addEventListener('submit', validarFormulario)

//FUNCTIONs
function validarFormulario(e) {
    e.preventDefault();
    console.log('hola mundo');
	const id = Date.now();
	const user = document.querySelector('#inputUser').value.toLowerCase();
	console.log(user);
	const name = document.querySelector('#inputName').value;
	
	const email = document.querySelector('#inputEmail').value.toLowerCase();
	const emailConfirm = document.querySelector('#inputEmailConfirm').value.toLowerCase();
	console.log(email);
	console.log(emailConfirm);
	
	const password = document.querySelector('#inputPassword').value;
	const passwordConfirm = document.querySelector('#inputPasswordConfirm').value;


	// Validar mail y usuario espresiones regulares
	const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
	const validarUser = /^[a-zA-Z0-9_/£$€]+$/;
	
	const resultadoEmail = validarEmail.test(email);
	const resultadoUser = validarUser.test(user);
    
    console.log(resultadoUser);

	if (!resultadoUser) {
		Swal.fire({
			icon: 'error',
			title: 'Nombre de Usuario no puede contener espacios vacios',
			text: 'Lo siento para registrar Usuario, ingrese un nombre de Usuario sin espacios vacios!',
			// footer: '<a href="">Why do I have this issue?</a>'
		  })		
	}

	let existeEmail = usuarios.find((user) => {
		return user.email === email;
	});

	if (existeEmail !== undefined) {
		Swal.fire({
			icon: 'error',
			title: 'Usuario Existente',
			text: 'Lo siento el usuario ingresado ya esta registrado!',
			// footer: '<a href="">Why do I have this issue?</a>',
		});
		formulario.reset();
		return;
	}

	//validar usuario
	if (name.trim() == '' || email.trim() == '' || emailConfirm.trim() == '' || password.trim() == '' || passwordConfirm.trim() == '') {
		formError.textContent = 'todos los campos son obligatorios';
        formError.classList.add('bg-danger', 'text-white', 'p-3', 'text-center', 'ms-2', 'w-25');

        setTimeout(() => {
            formError.remove('bg-danger', 'text-white', 'p-3', 'text-center', 'ms-2', 'w-25');
        }, 3000);

        return;

	} else if(!resultadoEmail) { //aca niego resultado
	//        console.log('email no es valido');
		formError.textContent = 'email no es valido';
		formError.classList.add('bg-danger', 'text-white', 'p-3', 'text-center', 'ms-2', 'w-25');

		setTimeout(() => {
			formError.remove('bg-danger', 'text-white', 'p-3', 'text-center', 'ms-2', 'w-25');
			formError.textContent = '';
			}, 3000);
	
		return;
    } else if (password !== passwordConfirm) {
	//        console.log('las contraseñas son distintas');
		formError.textContent = 'las contraseñas son distintas';
		formError.classList.add('bg-danger', 'text-white', 'p-3', 'text-center', 'ms-2', 'w-25');

		setTimeout(() => {
			formError.remove('bg-danger', 'text-white', 'p-3', 'text-center', 'ms-2', 'w-25');
			formError.textContent = '';
			}, 3000);
		// verificar esto.  
			validarUsuario.reset();
		//
		return;
	}

	console.log(user);
	console.log(name);
	console.log(email);
	console.log(emailConfirm);
	console.log(password);
	console.log(passwordConfirm);
						//	(id,  user, name, email, password
	let newUser = new Usuario(id, user, name, email,  password);

	usuarios = [...usuarios, newUser];
	localStorage.setItem('usuarios', JSON.stringify(usuarios));

	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: 'Usuario Registrado',
		showConfirmButton: false,
		timer: 1500,
	});

	validarUsuario.reset();

}
