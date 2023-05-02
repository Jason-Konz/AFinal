
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


// class Reservation extends React.Component {
    
// }

class Computers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            computers: [],
            isLoaded: false,
            error: null,
        };
        this.sendReserveRequest = this.sendReserveRequest.bind(this);
    }

    sendReserveRequest(computer_id) {
        fetch('/api/reserve/'+computer_id+'/', {
            method: 'PUT',
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') {
                    this.updateComputers();
                    this.props.onLogin();
                }
                else {
                    alert('Could not reserve');
                }
            },
            (error) => {
                alert('General login error');
            }
        )
    }

    sendReleaseRequest(computer_id) {
        fetch('/api/release/'+computer_id+'/', {
            method: 'PUT',
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') {
                    this.updateComputers();
                    this.props.onLogin();
                }
                else {
                    alert('Could not reserve');
                }
            },
            (error) => {
                alert('General login error');
            }
        )
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

    updateComputers() {
        fetch('/api/statuses')
        .then(result => result.json())
        .then(
            (result) => {
                this.setState({
                    computers: result,
                });
            },
            (error) => {
                this.setState({
                    error: error,
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
                            let button;
                            if (computer.isReserved) {
                                button = <button onClick={() => this.sendReleaseRequest(computer.id)}>Release</button>;
                            } else {
                                button = <button onClick={() => this.sendReserveRequest(computer.id)}>Reserve</button>;
                            }
                            return (
                             <li key={computer.id}>
                                <div className={computer.id}>
                                    {String(computer.isReserved)}&nbsp; 

                                    User: {computer.userID}
                                    <br />{button}
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
        this.goToLogout = this.goToLogout.bind(this);
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

    goToLogout(){
        this.setState({
            view: 'login'
        });
    }

    render() {
        let button = <button onClick={this.goToRegister}>Register</button>;
        let component = <Login onLogin={() => this.onLogin()} />;

        if (this.state.view == 'computers') {
            button = <button onClick={this.goToLogout}>Logout</button>;
            component = <Computers onLogin={() => this.onLogin()}/>;
        }

        if (this.state.view == 'register'){
            button = <button onClick={this.goToLogin}>Login</button>;
            component = <Register onRegister={() => this.onRegister()} />;
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
