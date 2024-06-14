import { useState, useEffect } from 'react'

export function useDepartments() {
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        const contoller = new AbortController()
        const signal = contoller.signal

        fetch(`http://localhost:8080/departments`, {signal, method: "GET"})
        .then(response => response.json())
        .then(departments => setDepartments(departments))
        .catch(error => {
            if (error.name !== "AbortError")
                console.log(`Error fetching departments data: ${error}`)
        })

        return () => {
            contoller.abort()
        }
    }, [])

    return departments
}