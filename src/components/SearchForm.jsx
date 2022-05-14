import Input from "./Input"

const SearchForm = ({onChange, searchTerm, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input onChange={onChange} searchTerm={searchTerm}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SearchForm