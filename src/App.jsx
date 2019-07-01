import React, { useState, useEffect } from "react";
import classnames from "classnames";
import search from "./assets/icon_search.svg";
import "./App.scss";
import trucGifSrc from "./assets/truc.gif";
import giphyLogo from "./assets/giphy-logo.png";
import giphyApi from "giphy-api";

const giphy = giphyApi("QlkbQy7XpgThOK8oSFYeWNOz9EQ8yOYS");

const handleCopyURL = item => {
  const { images } = item;

  navigator.clipboard.writeText(images.original.url);

  if ("chrome" in window && window.chrome.notifications) {
    const options = {
      title: "Giphy Extension",
      message: `The URL to gif has been copied! with id: ${item.id}`,
      type: "basic",
      iconUrl: giphyLogo
    };

    window.chrome.notifications.create("", options);
  }
};

function App() {
  const [data, setData] = useState([]);
  const [querySearch, setQuery] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (querySearch === null) {
      giphy.trending().then(r => setData(r.data));
    } else {
      giphy.search(querySearch).then(res => setData(res.data));
    }
  }, [querySearch]);

  const submitSearch = () => {
    if (inputValue) {
      setQuery(inputValue);
    }
  };

  return (
    <div className="giphy-app">
      <div className="giphy-search">
        <input
          className="search-box"
          type="text"
          placeholder="Type keywords"
          value={inputValue}
          onChange={e => setInputValue(e.currentTarget.value)}
          onKeyDown={e => e.keyCode === 13 && submitSearch()}
        />
        <div className="search-icon" onClick={submitSearch}>
          <img className="search-img" src={search} alt="kaka" />
        </div>
      </div>
      <div
        className={classnames("giphy-content", {
          notfound: data.length === 0
        })}
      >
        {data.length === 0 && querySearch ? (
          <div className="giphy-notfound">
            <p className="notfound-text">
              No GIFS found for <strong>{querySearch}</strong>, but you have
              this one instead...hí hí...enjoy!!!
            </p>
            <img src={trucGifSrc} alt="truc" />
          </div>
        ) : (
          data.map(item => <GiphResult key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

const GiphResult = ({ item }) => {
  const { width, height, url } = item.images.fixed_width;
  return (
    <div key={item.id} className="content-item">
      <img src={url} alt={item.images.title} width={width} height={height} />
      <span className="icon-link" onClick={() => handleCopyURL(item)} />
    </div>
  );
};

export default App;
