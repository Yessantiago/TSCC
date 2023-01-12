import { buscarPorId, eliminarPorId, editarPorId, altaDeUsuario } from "./crud.js";

const btnBuscar = document.getElementById("buscar");
const btnRegistro = document.getElementById("enviarFormularioAlta");
const btnEliminar = document.getElementById("eliminar");
const btnEdicion = document.getElementById("enviarFormularioEdicion");
const btnMostrarEdicion = document.getElementById("editar");
const btnMostrarAlta = document.getElementById("alta");
const divAlerta = document.getElementById("alerta");
const divConfirmacion = document.getElementById("confirmacion");
const tarjetaResultado = document.getElementById("tarjetaResultado");
const formulario = document.getElementById("formulario");
const tituloFormulario = document.getElementById("tituloFormulario");
const inputId = document.getElementById("idAccount");
const thName = document.getElementById("name");
const thEmail = document.getElementById("email");
const thPhone = document.getElementById("phone");
const thAddress = document.getElementById("address");
const idFormulario = document.getElementById("idFormulario");
const spanIdFormulario = document.getElementById("spanIdFormulario");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");

let idEncontrado,
  nameEncontrado,
  emailEncontrado,
  phoneEncontrado,
  addressEncontrado;

btnMostrarEdicion.disabled = true;
btnEliminar.disabled = true;

btnBuscar.onclick = async () => {
  console.log(">> Iniciamos evento de boton de busqueda");
  divAlerta.hidden = true;
  divConfirmacion.hidden = true;
  formulario.hidden = true;

  if (!inputId.value) {
    divAlerta.hidden = false;
    btnMostrarEdicion.disabled = true;
    btnEliminar.disabled = true;

    divAlerta.innerHTML = "<strong>OU NOU!</strong> Ingresa un ID para buscar";
    return;
  }

  let resultado = await buscarPorId(inputId.value);

  if (resultado.error) {
    btnMostrarEdicion.disabled = true;
    btnEliminar.disabled = true;
    divAlerta.hidden = false;

    divAlerta.innerHTML = `<strong>OU NOU!</strong> La cuenta con el ID <strong>${inputId.value}</strong> no existe`;
    return;
  }

  let { _id, name, email, phone, address } = resultado;

  // Mandamos los valores a la tabla
  thName.innerHTML = name;
  thEmail.innerHTML = email;
  thPhone.innerHTML = phone;
  thAddress.innerHTML = address;

  // Guardamos los valores
  idEncontrado = _id;
  nameEncontrado = name;
  emailEncontrado = email;
  phoneEncontrado = phone;
  addressEncontrado = address;

  // Habilitamos los botones de edición y eliminación
  btnMostrarEdicion.disabled = false;
  btnEliminar.disabled = false;
  tarjetaResultado.hidden = false;
};

btnEliminar.onclick = async () => {
  tarjetaResultado.hidden = true;

  let resultado = await eliminarPorId(idEncontrado);

  if (resultado) {
    divConfirmacion.hidden = false;
    tarjetaResultado.hidden = true;
    divConfirmacion.innerHTML = `<strong>Éxito! La cuenta fue eliminada</strong> `;
  } else {
    divConfirmacion.hidden = true;
    divAlerta.hidden = false;
    divAlerta.innerHTML = `<strong>OU NOU!</strong> Ocurrió un error el querer eliminar la cuenta`;
  }
};

btnMostrarEdicion.onclick = () => {
  formulario.hidden = false;
  btnEdicion.hidden = false;

  idFormulario.hidden = true;
  spanIdFormulario.hidden = true;
  tituloFormulario.innerHTML = `<h5 class="card-title">Edición de usuario</h5>`;

  nombre.value = nameEncontrado;
  correo.value = emailEncontrado;
  telefono.value = phoneEncontrado;
  direccion.value = addressEncontrado;
};

btnEdicion.onclick = async () => {
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");

  let body = JSON.stringify({
    name: nombre.value,
    email: correo.value,
    phone: telefono.value,
    address: direccion.value,
  });

  let resultado = await editarPorId(idEncontrado, body);

  if (resultado) {
    formulario.hidden = true;
    btnEdicion.hidden = true;
    divConfirmacion.hidden = false;
    tarjetaResultado.hidden = false;
    divConfirmacion.innerHTML = `<strong>Éxito! La cuenta fue editada</strong> `;

    let { _id, name, email, phone, address } = resultado;

    // Mandamos los valores a la tabla
    thName.innerHTML = name;
    thEmail.innerHTML = email;
    thPhone.innerHTML = phone;
    thAddress.innerHTML = address;

    // Guardamos los valores
    idEncontrado = _id;
    nameEncontrado = name;
    emailEncontrado = email;
    phoneEncontrado = phone;
    addressEncontrado = address;
  } else {
    divConfirmacion.hidden = true;
    divAlerta.hidden = false;
    divAlerta.innerHTML = `<strong>OU NOU!</strong> Ocurrió un error el querer editar la cuenta`;
  }
};

btnMostrarAlta.onclick = async () => {
  tarjetaResultado.hidden = true;
  divConfirmacion.hidden = true;
  formulario.hidden = false;
  btnRegistro.hidden = false;
  btnEdicion.hidden = true;

  idFormulario.hidden = false;
  spanIdFormulario.hidden = false;
  tituloFormulario.innerHTML = `<h5 class="card-title">Alta de usuario</h5>`;

  idFormulario.value = "";
  nombre.value = "";
  correo.value = "";
  telefono.value = "";
  direccion.value = "";
};

btnRegistro.onclick = async () => {
  if (
    idFormulario.value ||
    nombre.value ||
    correo.value ||
    telefono.value ||
    direccion.value
  ) {
    let body = JSON.stringify({
      _id: idFormulario.value,
      name: nombre.value,
      email: correo.value,
      phone: telefono.value,
      address: direccion.value,
    });

    let resultado = await altaDeUsuario(body);

    if (resultado) {
      formulario.hidden = true;
      btnEdicion.hidden = true;
      divConfirmacion.hidden = false;
      tarjetaResultado.hidden = false;
      divConfirmacion.innerHTML = `<strong>Éxito! La cuenta fue registrada</strong> `;

      let { _id, name, email, phone, address } = resultado;

      // Mandamos los valores a la tabla
      thName.innerHTML = name;
      thEmail.innerHTML = email;
      thPhone.innerHTML = phone;
      thAddress.innerHTML = address;

      // Guardamos los valores
      idEncontrado = _id;
      nameEncontrado = name;
      emailEncontrado = email;
      phoneEncontrado = phone;
      addressEncontrado = address;
    } else {
      divConfirmacion.hidden = true;
      divAlerta.hidden = false;
      divAlerta.innerHTML = `<strong>OU NOU!</strong> Ocurrió un error el querer registrar la cuenta`;
    }
  }
};
