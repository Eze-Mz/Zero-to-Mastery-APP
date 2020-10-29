import React, { Component } from "react"; // import react component from the library
import Nav from "./Components/Navigation/Nav"; //import nav component
import Logo from "./Components/Logo/Logo"; //import logo component
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition"; //import component
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm"; //import component
import Rank from "./Components/Rank/Rank"; //import component
import SignIn from "./Components/SignIn/SignIn"; //import component
import Register from "./Components/Register/Register"; //import component
import Particles from "react-particles-js"; //import particles library
import "./App.css"; //import css

//Parameters of the particles component that display particles in the background
const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 900,
      },
    },
  },
};

const initialState = {
  //Crea las variables dinámicas de la app
  input: "", //Variable asociada con el cambio de input en el input donde se inserta la URL de la img
  imgUrl: "", //Variable asociada con el src de la imagen del componente "FaceRecognition"
  box: {}, //Objeto que toma la respuesta de la api para luego dibujar una caja en la foto
  route: "signin", //Variable que sirve para saber dónde estamos en la página
  isSignedIn: false, // Variable para checkear si el usuario "is signed in"
  user: {
    //Objeto que toma los datos del usuario en la app
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

// New instance o the component object named "App"
class App extends Component {
  //esta clase nace de Component
  constructor() {
    //! need to read more about this
    super(); //necesario para pasar las propiedades de component
    this.state = initialState;
  }

  // Función para cargar el usuario en la página
  loadUser = (data) => {
    // Recibe los datos del usuario en los componenetes "SignIn" y "Register"
    this.setState({
      // setState es un método que pertenece al componente de React que actualizar a las variables del objeto State
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  // Función para calcular dónde va la caja de la cara en la foto
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box; // esta data es el resultado del fetch hecho a la API, un objeto con muchas cosas adentro
    const image = document.getElementById("inputImage"); // Toma la imagen del ducumento para luego
    const width = Number(image.width); // tomar su ancho
    const height = Number(image.height); //tomar su alto
    return {
      leftCol: clarifaiFace.left_col * width, //calcula la columna izquierda
      topRow: clarifaiFace.top_row * height, // clacula la fila de arriba
      rightCol: width - clarifaiFace.right_col * width, //calcula la columna derecha
      bottomRow: height - clarifaiFace.bottom_row * height, //calcula la fijla de abajo
    };
  };

  // función para otorgar los datos del calculo anterior a la caja que se va a dibujar
  displayFaceBox = (box) => {
    console.log(box); // imprime esos datos (era para chequear que funcione, no hace falta)
    this.setState({ box: box }); // actualiza los datos del objeto box en State
  };

  //función para establecer el valor de la variable input del método state con recibido en la etiqueta de input del componente "ImageLinkForm"
  onInputChange = (event) => {
    this.setState({ input: event.target.value }); //actualiza la variable input
  };

  //Función para tomar la url de la caja de input establecida más arriba y actualizar la url de la imagen a mostrat al mismo tiempo que enviarla a la API de clarifai
  onSubmit = () => {
    this.setState({ imgUrl: this.state.input }); //actualiza la variable imgUrl usada luego para mostrar la imagen
    fetch("http://localhost:3002/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3002/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              //The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the target object.
              this.setState(Object.assign(this.state.user, { entries: count })); //retornar el mismo objeto pero con la variable "entries" actualizadas
              //* Lo siguiente modifica todo el objeto "user"
              // this.setState({
              //   user: {
              //     entries: count,
              //   },
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response)); //con esta promesa luego calculo las dimensiones de la caja y se las otorgo al objeto box, con la función correspondiente
      })
      .catch((err) => console.log(err)); //imprimir el error en caso de que hubiera alguno
  };

  //Función para cambiar la ruta cada vez que cambiemos de página
  onRouteChange = (route) => {
    //tenemos que pasar como parámetro la variable route
    if (route === "signout") {
      // chequear si es "signout" --> para el usuario no "singin"
      // simply with a if statemente that check if the route is home
      this.setState({ initialState }); // si es verdarer entonces el usuario no ha entrado
    } else if (route === "home") {
      //chequear si la ruta es "hombe" --> página principal
      this.setState({ isSignedIn: true }); //actualizar la variable de usuario registrado a verdadero.
    }
    this.setState({ route: route }); //actualizar el estado de la variable route
  };

  //Función de la libería de React que muestra los componentes en la página
  render() {
    return (
      //Es un div que agrupa todo porque react funciona así igual hay herramientas para poder mostrar varios elementos no envueltos en un div
      //!Notar que no se pueden poner comentarios js una ves que el div empieza
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Nav
          isSignedIn={this.state.isSignedIn} //pasar esta variable al componente Nav
          onRouteChange={this.onRouteChange} //pasar este método al componente Nav
        />
        {this.state.route === "home" ? ( // Si la ruta es "home" entonces mostrar los componentes de esa página
          //*Efectivamente es como crear un archivo html con todos los componentes de esta página
          //if "route" is "signin, the SignIn component is rendered, otherwise the app si rendered" Y así con cada ruta
          <div>
            <Logo />
            <Rank
              name={this.state.user.name} //Pasar el nombre del usuario registrado
              entries={this.state.user.entries} //Pasar las entradas del usuario registrado
            />
            <ImageLinkForm
              onSubmit={this.onSubmit} //Pasar la función para analizar la imagen al componente
              onInputChange={this.onInputChange} //pasar la función para actualizar el input al componente
            />
            <FaceRecognition
              box={this.state.box}
              imgUrl={this.state.imgUrl} //pasa los datos del objeto box y de la url de la imagen para mostrarlos en el componente
            />
          </div>
        ) : this.state.route === "signin" ? ( //si lña ruta es "signin" entoncs mostrar estos componentes
          <SignIn
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange} //Pasar las funciones para actualizar el usuario y cambiar la ruta
          />
        ) : (
          // si no es "signin" ni "home" entonces mostrar
          <Register
            loadUser={this.loadUser} //Pasar la función para actualizar el usuario
            onRouteChange={this.onRouteChange} //Pasar la función para cambiar la ruta
          />
        )}
      </div>
    );
  }
}

export default App; // exportar el componente
