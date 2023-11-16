import React from "react";

const localUrl = "http://localhost:8080/";
const productionUrl = "https://face-recognition-api-7p0u.onrender.com/";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "a@a",
      signInPassword: "aaaa",
      onSubmit: false
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };



  //Función que toma los inputs de los usuarios y los compara con los usuarios registrados en la base de datos
  onSubmitSignIn = () => {
    this.setState({ onSubmit: true })
    fetch(`${productionUrl}signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        this.setState({ onSubmit: false })
        if (user.id) {
          // si existe un id significa que en la respuesta se mandó un usuario y por lo canto se puede ejecutar las funciones de cargar ese usuario en el root y cambiarla ruta así se muestra entonces esa página
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      }).catch(err => {
        console.log(err)
        this.setState({ onSubmit: false })
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
                value={this.state.signInEmail}
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
                value={this.state.signInPassword}
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
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                disabled={this.state.onSubmit}
              />
              {
                this.state.onSubmit &&
                <p className="f6">Processing(waking up the server)...</p>
              }
            </div>

            <div className="lh-copy mt3">
              <button
                onClick={() => {
                  if (!this.state.onSubmit) return this.props.onRouteChange("register")
                }}
                className={"f6 link dim bn ph3 pv2 mb2 dib bg-transparent" + (!this.state.onSubmit ? " black" : " black-30")}
              >
                Register
              </button>
            </div>

          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
