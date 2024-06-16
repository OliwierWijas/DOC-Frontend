export function useEditStory() {
    const editStory = async (id, editedStory, setRefreshIndex) => {
        if (!id || !editedStory.title || !editedStory.description) {
            alert("All fields have to be filled")
            return
        }

        const response = await fetch(`http://localhost:8080/stories/${id}`, {
            body: JSON.stringify(editedStory),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT"
        })
        if (response) {
            setRefreshIndex(prev => prev + 1)
            if (response.ok) {
                alert("Story edited successfully")
            } else {
                alert("Error editing a story")
            }
        }
    }
    return editStory
}