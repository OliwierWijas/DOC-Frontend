export function useEditDepartment() {
    const editDepartment = async (departmentId, editedDepartment, setRefreshIndex) => {
        console.log(departmentId)
        console.log(editedDepartment)
        console.log(editedDepartment.name)
        if (!departmentId || !editedDepartment.name) {
            alert("All fields have to be filled")
            return
        }

        const response = await fetch(`http://localhost:8080/departments/${departmentId}`, {
            body: JSON.stringify(editedDepartment),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT"
        })
        if (response) {
            setRefreshIndex(prev => prev + 1)
            alert(await response.text())
        }
    }
    return editDepartment
}