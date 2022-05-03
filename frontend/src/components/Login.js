import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <section className="login">
      <AuthForm title="Вход"
                sendProperty={props.onLogin}
                property={props.loggedIn}
                formName="login"
                buttonText="Войти" />
    </section>
  );
}

export default Login;
