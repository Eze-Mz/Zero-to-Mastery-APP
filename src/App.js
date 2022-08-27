import React, { Component } from "react";
import Nav from "./Components/Navigation/Nav";
import Logo from "./Components/Logo/Logo";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Particles from "react-particles-js";
import "./App.css";

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
  input: "",
  imgUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // Función para cargar el usuario en la página
  loadUser = (data) => {
    this.setState({
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
    const clarifaiRegionsFaces = data.outputs[0].data.regions;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    for (let i = 0; i < clarifaiRegionsFaces.length; i++) {
      const clarifaiFace = clarifaiRegionsFaces[i].region_info.bounding_box;
      this.setState((prevState) => ({
        boxes: [
          ...prevState.boxes,
          {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height,
          },
        ],
      }));
    }
  };

  // función para otorgar los datos del calculo anterior a la caja que se va a dibujar

  //función para establecer el valor de la variable input del método state con recibido en la etiqueta de input del componente "ImageLinkForm"
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  //Función para tomar la url de la caja de input establecida más arriba y actualizar la url de la imagen a mostrar al mismo tiempo que enviarla a la API de clarifai
  onSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    this.setState({ boxes: [] });
    fetch("http://localhost:8080/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:8080/image", {
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
        this.calculateFaceLocation(response);
      })
      .catch((err) => console.log(err));
  };

  //Función para cambiar la ruta cada vez que cambiemos de página
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Nav
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onSubmit={this.onSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition
              boxes={this.state.boxes}
              imgUrl={this.state.imgUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
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
