import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import "./styles.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      img: null,
      repo: null
    };
  }

  componentDidMount() {
    this.fetchAPI();
    console.log("username after mount: ", this.state.username)
  }

  callAPI(){
    axios
    .get(`https://api.github.com/users/ForrestDarabian`)
      .then(data => {
          console.log("username as axios data: ", data.data.login)
          this.setState({
              username: data.data.login,
              img: data.data.avaatar_url,
              repo: data.data.public_repos
          })
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <Users user={this.state.user} />
      </div>
    );
  }
}

export default App;
