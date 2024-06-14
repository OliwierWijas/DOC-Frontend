export function useAddDepartment() {
    const addDepartment = async (newDepartment) => {
        if (!newDepartment || !newDepartment.name) {
            alert("Name cannot be empty")
            return
        }
        const response = await fetch(`http://localhost:8080/departments`, { body: JSON.stringify(newDepartment), method: "POST" })
        if (response) {
            alert(await response.text())
        }
    }

    return addDepartment
}