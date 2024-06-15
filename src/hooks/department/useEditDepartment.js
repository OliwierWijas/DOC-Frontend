export function useEditDepartment() {
    const editDepartment = async (departmentName, editedDepartment) => {
        if (!departmentName || !editedDepartment.name) {
            alert("All fields have to be filled")
            return
        }

        const response = await fetch(`http://localhost:8080/departments/${departmentName}`, {
            body: JSON.stringify(editedDepartment),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT"
        })
        if (response) {
            alert(await response.text())
        }
    }
    return editDepartment
}