import { useCallback, useEffect, useReducer, useState } from 'react';
import './App.css';
import Stories from './components/Stories'
import SearchForm from './components/SearchForm'
import fetchData from './utilities/fetchData'
import useSemiPersistenseState from './hooks/useSemiPersistenseState'
import UserModal from './components/UserModal';

const api = "https://hn.algolia.com/api/v1/search?query="
const usersApi = "https://hn.algolia.com/api/v1/users/"

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
  const [ userModal, setUserModal ] = useState(false)
  const [ selectedUser, setSelectedUser ] = useState()

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

  const deleteStory = useCallback((item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item
    })
  }, [])

  const handleSearchSubmit = () => {
    setUrl(`${api}${searchTerm}`)
  }

  const showUserDetails = async (username) => {
    fetch(`${usersApi}${username}`)
    .then(res => res.json())
    .then(data => {
      setUserModal(true)
      setSelectedUser(data)
      localStorage.setItem("selectedUser", data)
    })
  }

  const closeModal = () => {
    setUserModal(false)
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
      <SearchForm onChange={handleSearch} searchTerm={searchTerm} onFormSubmit={handleSearchSubmit} />
      { userModal ? <UserModal selectedUser={selectedUser} onModalClose={closeModal} /> : 
      <>
      {stories.isLoading ? 'Loading...' : <Stories stories={stories.data} onStoryRemove={deleteStory} usersApi={usersApi} showUserDetails={showUserDetails} />}
      </>}
    </div>
  );
}

export default App;
