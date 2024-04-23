import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Department from "../model/Department.js"
import "../index.css"

export default function Departments() {
    const [departmentList, setDepartmentList] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8080/departments`)
        .then(response => response.json())
        .then(setDepartmentList)
        .catch((error) => console.log("Error fetching departments: ", error))
    }, [])
    
    const handleDepartmentClick = (departmentName) => {
        navigate(`/departments/${departmentName}`)
    }

    return <>
    <h1 className="about">Departments</h1>
    <div className="departmentList">
        {departmentList != null &&
        departmentList.map((data) => {
            const department = new Department(data)
            return (
                <div className="department-container" onClick={() => handleDepartmentClick(department.name)}>
                    {department.name}
                </div>
            )
        })}
    </div>
    </>
}