class TodoListApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(evt) {
        this.setState({
            text: evt.target.value
        });
    }

    onSubmit(evt) {
        evt.preventDefault();
        if (this.state.text.length == 0){
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now(),
            completed: false
        };

        this.setState({
            items: this.state.items.concat(newItem),
            text: ''
        });
    }

    render() {
        return (
            <div>
                <h3>TODO LIST</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.onSubmit}>
                    <label>
                    What needs to be done.
                    </label>
                    <input
                        id="new-todo-item" 
                        onChange={this.onChange}
                        value={this.state.text} 
                    />
                    <button>
                    Add #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }
}

class TodoList extends React.Component {

    render() {
        let lis = '';
        for (let i = 0; i < this.props.items.length; i++){
            lis += <li>{this.props.items[i].text}</li>;
        }
        return (

            <ul>
                    {lis}

            </ul>

        );

    }
}

const container = document.getElementById('todo-app');
const root = ReactDOM.createRoot(container);
root.render(<TodoListApp />);
