const StoryCard = ({story, onStoryRemove, showUserDetails}) => {
    const {url, title, author} = story
    return (
        <div className="story-card">
            <div>
                <strong><a href={url} className="title">{title || "No title"}</a></strong>
                
                <div>Author: <span className="author" onClick={() => showUserDetails(author)}>{author}</span></div>
            </div>
            <span onClick={() => onStoryRemove(story)}>x</span>
        </div>
    )
}

export default StoryCard