import { useState, useEffect } from "react"

const useSemiPersistenseState = () => {
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem("search"))
    useEffect(() => {
        localStorage.setItem("search", searchTerm)
    }, [searchTerm])

    return [searchTerm, setSearchTerm]
}

export default useSemiPersistenseState