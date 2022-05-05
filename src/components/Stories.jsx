import StoryCard from "./StoryCard"

const Stories = ({stories, onStoryRemove}) => {
    return stories.map(story => <StoryCard key={story.objectID} story={story} onStoryRemove={onStoryRemove} />)
}

export default Stories