var React = require('react');
// var ReactDOM = require("react-dom");

const SearchResults = ({ results }) => {
    // results = String(results);
    console.log(results);
    return React.createElement("div", { className: "search-results" },
       React.createElement("h3",null,"add ?keyword=___ in order to search"),
      results.map(result => React.createElement("div", { className: "search-result", key: result.id },
        React.createElement("h2", null, result.title),
        React.createElement("p", null, result.description)
      ))
    )
  };
  
  module.exports = SearchResults;