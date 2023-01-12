const HOST = "http://localhost:3000";

export async function buscarPorId(id) {
  console.log("--- Realizando petición GET");
  if (!id) return null;

  let response = await fetch(`${HOST}/account/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  return response;
}

export async function eliminarPorId(id) {
  console.log("--- Realizando petición DELETE");
  if (!id) return null;

  let response = await fetch(`${HOST}/account/${id}`, {
    method: "DELETE",
  })
    .then((data) => {
      return true;
    })
    .catch((error) => {
      return error;
    });

  return response;
}

export async function editarPorId(id, body) {
  console.log("--- Realizando petición PATCH");
  if (!id || !body) return null;

  let response = await fetch(`${HOST}/account/${id}`, {
    method: "PATCH",
    body: body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("---- Cuenta actualizada");
      return data;
    })
    .catch((error) => {
      return error;
    });

  return response;
}

export async function altaDeUsuario(body) {
  console.log("--- Realizando petición POST");
  if (!body) return null;
  let response = await fetch(`${HOST}/account/`, {
    method: "POST",
    body: body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("---- Cuenta registrada");
      return data;
    })
    .catch((error) => {
      return null;
    });

  return response;
}
