import { useState, useEffect } from 'react'

export function useStories(departmentId, refreshIndex) {
    const [stories, setStories] = useState([])

    useEffect(() => {
        const contoller = new AbortController()
        const signal = contoller.signal

        fetch(`http://localhost:8080/stories?departmentId=${departmentId}`, {signal, method: "GET"})
        .then(response => response.json())
        .then(stories => setStories(stories))
        .catch(error => {
            if (error.name !== "AbortError")
                console.log(`Error fetching stories data: ${error}`)
        })

        return () => {
            contoller.abort()
        }
    }, [departmentId, refreshIndex])

    return stories
}