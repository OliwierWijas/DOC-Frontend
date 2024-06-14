export function useDeleteDepartment() {
    const deleteDepartment = async (name) => {
        if (!name) {
            alert("Name cannot be empty")
            return
        }
        const response = await fetch(`http://localhost:8080/departments/${name}`, { method: "DELETE" })
        if (response) {
            alert(await response.text())
        }
    }
    return deleteDepartment
}