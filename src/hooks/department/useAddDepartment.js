export function useAddDepartment() {
    const addDepartment = async (newDepartment, setRefreshIndex) => {
        if (!newDepartment || !newDepartment.name) {
            alert("Name cannot be empty")
            return
        }
        const response = await fetch(`http://localhost:8080/departments`, {
            body: JSON.stringify(newDepartment),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        if (response) {
            setRefreshIndex(prev => prev + 1)
            if (response.ok) {
                alert("Department added successfully")
            } else {
                alert("Error adding a department")
            }
        }
    }

    return addDepartment
}