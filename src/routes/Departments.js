import { useNavigate } from "react-router-dom";
import Department from "../model/Department.js"
import "../index.css"
import { useDepartments } from "../hooks/useDepartments.js";

export default function Departments() {
    const navigate = useNavigate()
    const departmentsList = useDepartments();
    
    const handleDepartmentClick = (departmentName) => {
        navigate(`/departments/${departmentName}`)
    }

    return <>
    <h1 className="about">Departments</h1>
    <div className="departmentsList">
        {departmentsList && departmentsList[0] &&
        departmentsList.map((data) => {
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