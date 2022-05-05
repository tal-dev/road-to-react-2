const StoryCard = ({story, onStoryRemove}) => {
    return (
        <div className="story-card">
            <div>
                <strong><a href={story.url}>{story.title || "No title"}</a></strong>
                <div>Author: {story.author}</div>
            </div>
            <span onClick={() => onStoryRemove(story)}>x</span>
        </div>
    )
}

export default StoryCard