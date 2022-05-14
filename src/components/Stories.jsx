import { memo } from "react"
import StoryCard from "./StoryCard"

// const Stories = ({stories, onStoryRemove}) => {
//     console.log("Stories")
//     return stories.map(story => <StoryCard key={story.objectID} story={story} onStoryRemove={onStoryRemove} />)
// }

const Stories = memo(({stories, onStoryRemove}) => {
    console.log("Stories")
    return stories.map(story => <StoryCard key={story.objectID} story={story} onStoryRemove={onStoryRemove} />)
})

export default Stories