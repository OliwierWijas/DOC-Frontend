export function useAddStory() {
    const addStory = async (newStory, setRefreshIndex) => {
        if (!newStory || !newStory.title || !newStory.description || !newStory.department) {
            alert("All fiels have to be filled")
            return
        }
        const response = await fetch(`http://localhost:8080/stories`, {
            body: JSON.stringify(newStory),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        if (response) {
            setRefreshIndex(prev => prev + 1)
            if (response.ok) {
                alert("Story added successfully")
            } else {
                alert("Error adding a story")
            }
        }
    }

    return addStory
}