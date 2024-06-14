export function useEditStory() {
    const editStory = async (id, editedStory) => {
        if (!id || !editedStory.title || !editedStory.description) {
            alert("All fields have to be filled")
            return
        }

        const response = await fetch(`http://localhost:8080/stories/${id}`, { body: JSON.stringify(editedStory), method: "PUT" })
        if (response) {
            alert(await response.text())
        }
    }
    return editStory
}