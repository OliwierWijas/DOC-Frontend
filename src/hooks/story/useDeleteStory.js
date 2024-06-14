export function useDeleteStory() {
    const deleteStory = async (id) => {
        if (!id) {
            alert("Id cannot be empty")
            return
        }
        const response = await fetch(`http://localhost:8080/stories/${id}`, { method: "DELETE" })
        if (response) {
            alert(await response.text())
        }
    }
    return deleteStory
}