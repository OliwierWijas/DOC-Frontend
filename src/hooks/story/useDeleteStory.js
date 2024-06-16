export function useDeleteStory() {
    const deleteStory = async (id, setRefreshIndex) => {
        if (!id) {
            alert("Id cannot be empty")
            return
        }
        const response = await fetch(`http://localhost:8080/stories/${id}`, { method: "DELETE" })
        if (response) {
            setRefreshIndex(prev => prev + 1)
            if (response.ok) {
                alert("Story deleted successfully")
            } else {
                alert("Error deleting a story")
            }
        }
    }
    return deleteStory
}