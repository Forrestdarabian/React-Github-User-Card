import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "Forrestdarabian",
      user: {},
      followers: [],
      counter: 0
    };
  }

  changeUserName = (userName) => {
    this.setState({ userName });
  }

  fetchUser = () => {
    fetch(`https://api.github.com/users/${this.state.userName}`)
      .then(res => res.json())
      .then(data => this.setState({ user: data }));
  }

  fetchFollowers = () => {
    fetch(`https://api.github.com/users/${this.state.userName}/followers`)
      .then(res => res.json())
      .then(data => this.setState({ followers: data }));
  }

  componentDidMount() {
    console.log("First Render (mounting)");
    this.fetchUser();
    this.fetchFollowers();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);

    if (prevState.userName !== this.state.userName) {
      this.fetchUser();
      this.fetchFollowers();
    }

  }

  render() {
    return (
      <div className="App">
        <Search changeUserName={this.changeUserName} />
        <UserCard user={this.state.user} followers={this.state.followers} />
      </div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.changeUserName(this.state.search);
    this.setState({ search: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input type="text"
               name="search"
               placeholder="search"
               value={this.state.search}
               onChange={this.handleChange} />
        <button type="submit">Search for a User</button>
      </form>
    );
  }
}

function UserCard(props) {
  return (
    <div>
      <h2>{props.user.login}</h2>
      <p>{props.user.location}</p>
      <p>{props.user.url}</p>
      <div>
        {props.followers.map(follower => (
          <div key={follower.id}>{follower.login}</div>
        ))}
      </div>
    </div>
  );
}

export default App;