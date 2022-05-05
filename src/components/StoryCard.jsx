const StoryCard = ({story, onStoryRemove}) => {
    const {url, title, author} = story
    return (
        <div className="story-card">
            <div>
                <strong><a href={url}>{title || "No title"}</a></strong>
                <div>Author: {author}</div>
            </div>
            <span onClick={() => onStoryRemove(story)}>x</span>
        </div>
    )
}

export default StoryCard