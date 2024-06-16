export function useDeleteDepartment() {
    const deleteDepartment = async (departmentId, setRefreshIndex) => {
        if (!departmentId) {
            alert("Name cannot be empty")
            return
        }
        const response = await fetch(`http://localhost:8080/departments/${departmentId}`, { method: "DELETE" })
        if (response) {
            setRefreshIndex(prev => prev + 1)
            alert(await response.text())
        }
    }
    return deleteDepartment
}