import { useNavigate } from "react-router-dom";
import Department from "../model/Department.js"
import "../index.css"
import { useDepartments } from "../hooks/department/useDepartments.js";
import { useAddDepartment } from "../hooks/department/useAddDepartment.js";
import { useState } from "react";

export default function Departments() {
    const navigate = useNavigate()
    const [refreshIndex, setRefreshIndex] = useState(0)
    const departmentsList = useDepartments(refreshIndex)

    const [newDepartment, setNewDepartment] = useState('')
    const addDepartment = useAddDepartment()

    const handleDepartmentClick = (departmentName) => {
        navigate(`/departments/${departmentName}`)
    }

    const handleDepartmentAdd = async () => {
        addDepartment({name: newDepartment}, setRefreshIndex)
        setNewDepartment('')
    }

    return <>
        <div className="about text-4xl">Departments</div>
        <div className="pt-1 w-4/5 md:w-2/3 bg-black bg-opacity-70"></div>
        <div className="form my-2 w-4/5 md:w-2/3 flex justify-evenly">
            <input
                type="text"
                placeholder="Enter department name"
                className="px-4 py-2 border rounded-md mr-2 w-2/3"
                onChange={(e) => setNewDepartment(e.target.value)}
            />
            <button className="px-4 py-2 bg-black bg-opacity-70 text-white text-lg rounded-md w-1/4" onClick={handleDepartmentAdd}>
                ADD
            </button>
        </div>
        <div className="pt-1 w-4/5 md:w-2/3 bg-black bg-opacity-70"></div>
        <div className="flex flex-row flex-wrap w-4/5 md:w-2/3 justify-evenly mt-5">
            {departmentsList && departmentsList[0] &&
                departmentsList.map((data) => {
                    const department = new Department(data)
                    return (
                        <div className="flex items-center justify-center my-2 w-2/5 xl:w-1/4 h-48 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-md shadow-sm text-2xl" onClick={() => handleDepartmentClick(department.name)} key={department.name}>
                            {department.name}
                        </div>
                    )
                })}
        </div>
    </>
}