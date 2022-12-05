//variables
const formProducto = document.querySelector('#formProductos');
let nuevo;
const user = JSON.parse(localStorage.getItem('usuario'));

class Producto {
	constructor(codigo, nombre, imagen, precio, stock) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.imagen = imagen;
		this.precio = precio;
		this.stock = stock;
	}
}

if (user.id === 9999) {
	const tablaUsuarios = document.querySelector('#tableUser');
	const tablaProductos = document.querySelector('#bodyTable');
	const myModal = document.querySelector('#myModal');
	const content = document.querySelector('#bodyModificaModal');
	const usuarios = JSON.parse(localStorage.getItem('usuarios'));
	let productos = JSON.parse(localStorage.getItem('productos')) || [];

	console.log(productos);

	//evento
	formProducto.addEventListener('submit', cargarProducto);

	//mostrar los usuarios en la tabla
	function cargarTablaUsuarios() {
		usuarios.forEach((user) => {
			let tr = document.createElement('tr');

			tr.innerHTML = `
                <th scope="row">${user.usuario}</th>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
            `;

			tablaUsuarios.appendChild(tr);
		});
	}

	cargarTablaUsuarios();

	//mostrar los productos en la tabla
	function cargarTablaProductos() {
		productos.forEach((product) => {
			let tr = document.createElement('tr');

			tr.innerHTML = `
                <th scope="row">${product.codigo}</th>
                <td>${product.nombre}</td>
                <td>${product.precio}</td>
				<td>${product.stock}</td>
				<a href="#" class="btn btn-warning" onclick="modificarProduct(${product.codigo})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> 
            <a href="#" class="btn btn-danger" onclick="borrarProduct(${product.codigo})"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
            `;

			tablaProductos.appendChild(tr);
		});
	}

	cargarTablaProductos();

	function abrirModal(product = null) {
		console.log(product);
		if (product === null) {
			nuevo = true;
			content.innerHTML = `
			<div class="form-group">
								<label for="nombre">Producto</label>
								<input type="text" class="form-control" id="nombre" value="" autocomplete="off" />
							</div>
							<div class="form-group">
								<label for="imagen">Imagen</label>
								<input type="text" class="form-control" id="imagen" value="" autocomplete="off" />
							</div>
							<div class="form-row">
								<div class="col">
									<label for="precio">Precio</label>
									<input type="number" class="form-control" id="precio" min="0" autocomplete="off" />
								</div>
								<div class="col">
									<label for="stock">Stock</label>
									<input type="number" class="form-control" id="stock" value="0" min="0" autocomplete="off" />
								</div>
							</div>
			`;
		} else {
			content.innerHTML = `
			<div class="form-group">
								<label for="nombre">Producto</label>
								<input type="text" class="form-control" id="nombre" value="${product.nombre}" autocomplete="off" />
							</div>
							<div class="form-group">
								<label for="imagen">Imagen</label>
								<input type="text" class="form-control" id="imagen" value="${product.imagen}" autocomplete="off" />
							</div>
							<div class="form-row">
								<div class="col">
									<label for="precio">Precio</label>
									<input type="number" class="form-control" id="precio" min="0" value="${product.precio}" autocomplete="off" />
								</div>
								<div class="col">
									<label for="stock">Stock</label>
									<input type="number" class="form-control" id="stock" value="${product.stock}" min="0" autocomplete="off" />
								</div>
							</div>
			`;
		}
	}

	//una vez que hagamos el submit del modal leer los datos y cargar el producto
	function cargarProducto(e) {
		tablaProductos.innerHTML = '';
		e.preventDefault();
		//leer los datos del formulario
		const codigo = new Date().getTime();
		const nombre = document.querySelector('#nombre').value;
		let imagen = document.querySelector('#imagen').value;
		const precio = parseInt(document.querySelector('#precio').value);
		const stock = parseInt(document.querySelector('#stock').value);

		if (imagen === '') {
			imagen = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
		}

		if (nuevo) {
			const newProduct = new Producto(codigo, nombre, imagen, precio, stock);
			productos = [...productos, newProduct];
		} else {
			//me retorna la posicion de donde se cumplio su condicion
			let index = productos.findIndex((product) => {
				return product.codigo === producto.codigo;
			});

			productos[index].nombre = nombre;
			productos[index].imagen = imagen;
			productos[index].precio = precio;
			productos[index].stock = stock;
		}

		//si el input de la iamgen es vacio agrego una por defecto

		localStorage.setItem('productos', JSON.stringify(productos));

		$(myModal).modal('hide');

		cargarTablaProductos();
	}

	//borrar un producto del admin
	function borrarProduct(codigo) {
		tablaProductos.innerHTML = '';
		productos = productos.filter((producto) => producto.codigo !== codigo);
		localStorage.setItem('productos', JSON.stringify(productos));
		cargarTablaProductos();
	}

	//se ejecuta cuando edito un producto
	function modificarProduct(codigo) {
		nuevo = false;

		//me retorna el producto completo
		producto = productos.find((prod) => {
			return prod.codigo === codigo;
		});

		//lee mando los datos del producto al modal
		abrirModal(producto);

		$(myModal).modal('show');
	}
} else {
	location.href = 'home.html';
}