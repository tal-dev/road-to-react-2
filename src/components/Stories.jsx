import { memo } from "react"
import StoryCard from "./StoryCard"

const Stories = memo(({stories, onStoryRemove, usersApi, showUserDetails}) => {
    return stories.map(story => <StoryCard key={story.objectID} story={story} onStoryRemove={onStoryRemove} usersApi={usersApi} showUserDetails={showUserDetails}/>)
})

export default Stories