import { useCallback, useEffect, useReducer, useState, Component } from 'react';
import './App.css';
import Stories from './components/Stories'
import Input from './components/Input'
import fetchData from './utilities/fetchData'
import useSemiPersistenseState from './hooks/useSemiPersistenseState'
import axios from 'axios';
import LoadingIcon from './components/LoadingIcon';

const api = "https://hn.algolia.com/api/v1/search?query="

class App extends Component {

  constructor() {
    super()
    this.state = {
      stories: [],
      isLoading: false,
      searchTerm: localStorage.getItem("search"),
      url: api
    }
  }

  componentDidMount() {
    this.setState({isLoading: true})
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 3000)

    axios
    .get(this.state.url)
    .then(data => {
      this.setState({
        stories: data.data.hits
      })
    })
    // this.setState({isLoading: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.url !== this.state.url) {
      axios
      .get(this.state.url)
      .then(data => {
      this.setState({
        stories: data.data.hits
      })
    })
    this.setState({isLoading: false})
    }
  }

  deleteStory = (item) => {
    const updatedList = this.state.stories.filter(story => story.objectID !== item.objectID)
    this.setState({stories: updatedList})
  }

  handleSearch = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
    localStorage.setItem("search", e.target.value)
  }

  handleSearchSubmit = () => {
    this.setState({
      url: `${api}${this.state.searchTerm}`
    })
  }

  render() {
    
    const {stories, isLoading, searchTerm} = this.state
    return (
      <div className="App">
        <h1>Hacker news</h1>
        <Input onChange={this.handleSearch} searchTerm={searchTerm}/>
        <button onClick={this.handleSearchSubmit}>Submit</button>
        {isLoading ? <LoadingIcon /> : <Stories stories={stories} onStoryRemove={this.deleteStory} />}
      </div>
    );
  }
}

export default App;
