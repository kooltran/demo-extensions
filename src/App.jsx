import React, { useState, useEffect } from "react";
import search from "./assets/icon_search.svg";
import "./App.scss";

const handleTrendingAPI = () => {
  const trendingAPI =
    "https://api.giphy.com/v1/gifs/trending?api_key=QlkbQy7XpgThOK8oSFYeWNOz9EQ8yOYS&q";
  return fetch(trendingAPI, {
    method: "get"
  }).then(res => res.json());
};

const handleSearch = searchText => {
  return fetch(
    `http://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=QlkbQy7XpgThOK8oSFYeWNOz9EQ8yOYS&limit=25`,
    {
      method: "get"
    }
  ).then(res => res.json());
};

function App() {
  const [data, setData] = useState([]);
  const [querySearch, setQuery] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (querySearch === null || querySearch === "") {
      handleTrendingAPI().then(res => setData(res.data));
    } else {
      handleSearch(querySearch).then(res => setData(res.data));
    }
  }, [querySearch]);

  return (
    <div className="giphy-app">
      <div className="giphy-search">
        <input
          className="search-box"
          type="text"
          placeholder="Type keywords"
          value={inputValue}
          onChange={e => setInputValue(e.currentTarget.value)}
          onKeyDown={e => e.keyCode === 13 && setQuery(inputValue)}
        />
        <div className="search-icon" onClick={e => setQuery(inputValue)}>
          <img className="search-img" src={search} alt="kaka" />
        </div>
      </div>
      <div className="giphy-content">
        {data.map(item => {
          const { width, height, url } = item.images.fixed_width;
          return (
            <div key={item.id} className="content-item">
              <img
                src={url}
                alt={item.images.title}
                width={width}
                height={height}
              />
              <span className="icon-link" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
