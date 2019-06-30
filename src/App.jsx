import React from 'react';
import search from './assets/icon_search.svg';
import './App.scss';

class App extends React.Component {
  state = {
    searchText: null
  }

  handleSearch = () => {
    const { searchText } = this.state;
    fetch(`http://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=QlkbQy7XpgThOK8oSFYeWNOz9EQ8yOYS&limit=5`, {
      method: 'get',
    }).then(res => res.json()).then(data => {
      console.log(data)
    })
  }

  onChangeInputSearch = (e) => {
    const { value } = e.currentTarget
    this.setState({
      searchText: value
    })
  }

  render() {
    return (
      <div className="giphy-app">
        <div className="giphy-search">
          <input className="search-box" type="text" placeholder="Type keywords" onChange={this.onChangeInputSearch} />
          <div className="search-icon" onClick={this.handleSearch}>
            <img className="search-img" src={search} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
