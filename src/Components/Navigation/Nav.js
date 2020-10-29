import React from "react"; //importar la libería

const Nav = ({ onRouteChange, isSignedIn }) => {
  // declarar una función que retorna el elemento nav y pasarle como parámetro un objeto con la función para cambiar ruta y la variable para chequear si el usuario se ha registrado
  if (isSignedIn) {
    //chequear si el usuario está registrado, si es así retorna
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signout")} //*Arrow function so the function doesnt get triggered when the app runs; i.e., hacerla un callback (si es que entiendo bien)¨
          // Se retorna el componente nav con un elemento que tiene un eventlistener que cambiar la ruta cuando es clickeado, la cambia a "signout"
          className="f3 link dim black underline pa3 pointer "
        >
          Sing Out
        </p>
      </nav>
    );
  } else {
    //si no retorna una barra de navegación con dos elementos con un eventListener que cambian la ruta a "signin" y "register" respectivamente
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")} //Arrow function so the function doesnt get triggered when the app runs; i.e., hacerla un callback (si es que entiendo bien)
          className="f3 link dim black underline pa3 pointer"
        >
          Sing In
        </p>
        <p
          onClick={() => onRouteChange("register")} //Arrow function so the function doesnt get triggered when the app runs; i.e., hacerla un callback (si es que entiendo bien)
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Nav;
