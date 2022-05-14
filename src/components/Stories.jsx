import { memo } from "react"
import StoryCard from "./StoryCard"

const Stories = memo(({stories, onStoryRemove}) => {
    return stories.map(story => <StoryCard key={story.objectID} story={story} onStoryRemove={onStoryRemove} />)
})

export default Stories