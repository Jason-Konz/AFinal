
class Login extends React.Component {

    sendLoginRequest() {
        let formData = new FormData( document.querySelector('#login-form') );
        fetch('/api/login/', {
            method: 'POST',
            body: formData
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') {
                    this.props.onLogin();
                }
                else {
                    alert('Bad username/password combo');
                }
            },
            (error) => {
                alert('General login error');
            }
        )
    }

    render() {
        return (
            <form id="login-form">
             <input
                name="username"
                id="username"
                type="text"
                placeholder="username" />
             <input
                name="password"
                id="password"
                type="password"
                placeholder="password" />
             <br />
             <button
                id="login-button"
                onClick={(evt) => {
                    evt.preventDefault();
                    this.sendLoginRequest();
                }}>
               Login
             </button>
            </form>
        );
    }
}

class Register extends React.Component {
    sendRegisterRequest() {
        let formData = new FormData( document.querySelector('#register-form') );
        fetch('/api/register/', {
            method: 'POST',
            body: formData
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') {
                    this.props.onRegister();
                }
                else {
                    alert('Bad username/password combo');
                }
            },
            (error) => {
                alert('General login error');
            }
        )
    }

    render() {
        return (
            <form id="register-form">
             <input
                name="username"
                id="username"
                type="text"
                placeholder="username" />
             <br />
             <input
                name="password"
                id="password"
                type="password"
                placeholder="password" />
             <br />
             <input
                name="email"
                id="email"
                type="email"
                placeholder="email" />
             <br />
             <button
                id="register-button"
                onClick={(evt) => {
                    evt.preventDefault();
                    this.sendRegisterRequest();
                }}>
               Register
             </button>
            </form>
        );
    }


}


class Reservation extends React.Component {


}

class Computers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            computers: [],
            isLoaded: false,
            error: null,
        };
    }

    componentDidMount() {
        fetch('/api/statuses')
        .then(result => result.json())
        .then(
            (result) => {
                this.setState({
                    computers: result,
                    isLoaded: true
                });
            },
            (error) => {
                this.setState({
                    error: error,
                    isLoaded: true
                });
            }
        )
    }

    render() {
        if (this.state.error) {
            return (
                <div>Error: Someone has stolen all the Byte Pipe computers.</div>
            );
        }
        else if (!this.state.isLoaded) {
            return (
                <div>Waiting for statuses...</div>
            );
        }
        else {
            return (
                <div className="computers">
                    <h1>HPCVC Computers</h1>
                    <ul>
                        {this.state.computers.map(computer => {
                            return (
                             <li key={computer.id}>
                                <div className={computer.id}>
                                    {computer.isReserved}&nbsp; 

                                    User: {computer.userID}
                                </div>
                             </li>
                            )
                        })}
                    </ul>
                </div>
            );
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'login'
        };
        this.goToLogin = this.goToLogin.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
    }

    onLogin() {
        this.setState({
            view: 'computers'
        });
    }
    
    onRegister(){
        this.setState({
            view: 'login'
        });
    }

    goToLogin(){
        this.setState({
            view: 'login'
        });
    }

    goToRegister(){
        this.setState({
            view: 'register'
        });
    }

    render() {
        let button = <button onClick={this.goToRegister}>Register</button>;
        let component = <Login onLogin={() => this.onLogin()} />;

        if (this.state.view == 'computers') {
            component = <Computers />;
        }

        if (this.state.view == 'register'){
            button = <button onClick={this.goToLogin}>Login</button>;
            component = <Register />;
        }

        return (
            <div className="app">
                {button}
                {component}
            </div>
        );
    }
}

const container = document.querySelector('#app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
