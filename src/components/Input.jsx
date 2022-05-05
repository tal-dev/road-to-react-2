const Input = ({onChange, searchTerm}) => {
    
    return <input type="text" placeholder="Search" autocomplete onChange={onChange} value={searchTerm}/>
}

export default Input