import { useState, useEffect, useRef } from "react"

const useSemiPersistenseState = () => {
    const isMounted = useRef(false)
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem("search"))
    useEffect(() => {
        if(!isMounted.current) {
            isMounted.current = true
        }
        else {
            localStorage.setItem("search", searchTerm)
        }
    }, [searchTerm])

    return [searchTerm, setSearchTerm]
}

export default useSemiPersistenseState