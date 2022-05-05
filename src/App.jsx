import { useCallback, useEffect, useReducer, useState } from 'react';
import './App.css';
import Stories from './components/Stories'
import Input from './components/Input'
import fetchData from './utilities/fetchData'
import useSemiPersistenseState from './hooks/useSemiPersistenseState'

const api = "https://hn.algolia.com/api/v1/search?query="

function App() {

  const storiesReducer = (state, action) => {
    switch(action.type) {
      case "INIT_FETCH_STORIES":
        return {
          ...state,
          isLoading: true
        }
      case "SET_STORIES":
        return {
          ...state,
          data: action.payload,
          isLoading: false
        }
      case "REMOVE_STORY":
        return {
          ...state,
          data: state.data.filter(item => item.objectID !== action.payload.objectID)
        }
    }
  }
  
  const [ searchTerm, setSearchTerm ] = useSemiPersistenseState()
  const [ stories, dispatchStories ] = useReducer(storiesReducer, {
    data: [], isLoading: false
  })
  const [ url, setUrl ] = useState(`${api}${searchTerm}`)

  const handleFetchStories = useCallback(() => {
    fetchData(url)
    .then(data => {
      dispatchStories({
        type: "SET_STORIES",
        payload: data
      })
    })
}, [url])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const deleteStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item
    })
  }

  const handleSearchSubmit = () => {
    setUrl(`${api}${searchTerm}`)
  }

  useEffect(() => {
    if(searchTerm === '') return

    fetchData(`${api}${searchTerm}`)
    .then(data => {
      dispatchStories({
        type: "SET_STORIES",
        payload: data
      })
    })
  }, [])

  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories])

  return (
    <div className="App">
      <h1>Hacker news</h1>
      <Input onChange={handleSearch} searchTerm={searchTerm}/>
      <button onClick={handleSearchSubmit}>Submit</button>
      {stories.isLoading ? 'Loading...' : <Stories stories={stories.data} onStoryRemove={deleteStory}/>}
    </div>
  );
}

export default App;
