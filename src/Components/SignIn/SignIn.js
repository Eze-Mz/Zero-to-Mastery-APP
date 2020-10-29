import React from "react"; //importa la librería de React

class SignIn extends React.Component {
  // define "SignIn" como una instancia de "Component" definido por react
  constructor(props) {
    //la forma de pasarle métodos y variables a este objeto es a través del parámetro "props" del constructor
    super(props);
    this.state = {
      //creación de dos variables que toman los datos necesarios para que el usuario entre en la app
      signInEmail: "",
      signInPassword: "",
    };
  }
  // función para escribir la variable sigInEmail de acuerdo al input del usuario
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  // función para escribir la variable sigInPassword de acuerdo al input del usuario
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  //Función que toma los inputs de los usuarios y los compara con los usuarios registrados en la base de datos
  onSubmitSignIn = () => {
    fetch("http://localhost:3002/signin", {
      //HTTP request, mandando la información puesta por el usuario
      method: "post", //método del request
      headers: { "Content-Type": "application/json" }, //header que identifica el tipo de body
      body: JSON.stringify({
        //en el body se manda en formato JSON el objeto javascript
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json()) //a la respuesta se la pasa de json a javascript
      .then((user) => {
        if (user.id) {
          // si existe un id significa que en la respuesta se mandó un usuario y por lo canto se puede ejecutar las funciones de cargar ese usuario en el root y cambiarla ruta así se muestra entonces esa página
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn} //Arrow function so the function doesnt get triggered when the app runs; i.e., hacerla un callback (si es que entiendo bien)
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => this.props.onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
