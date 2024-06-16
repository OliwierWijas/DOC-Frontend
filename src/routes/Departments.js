import { useNavigate } from "react-router-dom";
import Department from "../model/Department.js"
import "../index.css"
import { useDepartments } from "../hooks/department/useDepartments.js";
import { useAddDepartment } from "../hooks/department/useAddDepartment.js";
import { useDeleteDepartment } from "../hooks/department/useDeleteDepartment.js"
import { useEditDepartment } from "../hooks/department/useEditDepartment.js"
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function Departments() {
    const navigate = useNavigate()
    const [refreshIndex, setRefreshIndex] = useState(0)
    const departmentsList = useDepartments(refreshIndex)

    const [newDepartmentName, setNewDepartmentName] = useState('')
    const addDepartment = useAddDepartment()

    const [selectedDepartment, setSelectedDepartment] = useState(0)
    console.log(selectedDepartment)
    const [editDepartmentName, setEditDepartmentName] = useState('')
    const editDepartment = useEditDepartment()

    const deleteDepartment = useDeleteDepartment()

    const handleDepartmentClick = (departmentId) => {
        navigate(`/departments/${departmentId}`)
    }

    const handleDepartmentAdd = async () => {
        addDepartment({ name: newDepartmentName }, setRefreshIndex)
    }

    const handleDepartmentEdit = async () => {
        editDepartment(selectedDepartment, { name: editDepartmentName }, setRefreshIndex)
    }

    const handleDepartmentDelete = async (departmentId) => {
        deleteDepartment(departmentId, setRefreshIndex)
    }

    return <>
        <div className="text-4xl my-2">Departments</div>

        <div className="line pt-1 w-4/5 md:w-2/3 bg-black bg-opacity-70"></div>
        <div className="add-form my-2 w-4/5 md:w-2/3 flex justify-evenly">
            <input
                type="text"
                placeholder="Enter department name"
                className="px-4 py-2 border rounded-md mr-2 w-3/4"
                onChange={(e) => setNewDepartmentName(e.target.value)}
            />
            <button className="px-4 py-2 bg-black bg-opacity-70 text-white text-lg rounded-md w-1/4" onClick={handleDepartmentAdd}>
                ADD
            </button>
        </div>
        <div className="line pt-1 w-4/5 md:w-2/3 bg-black bg-opacity-70"></div>

        <div className="edit-form my-2 w-4/5 md:w-2/3 flex justify-evenly">
            <select
                className="px-4 py-2 border rounded-md mr-2 w-1/4"
                onChange={(e) => setSelectedDepartment(e.target.value)}
            >
                {departmentsList.map((data) => (
                    <option key={data.id} value={data.id}>
                        {data.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Enter new department name"
                className="px-4 py-2 border rounded-md mr-2 w-1/2"
                onChange={(e) => setEditDepartmentName(e.target.value)}
            />
            <button className="px-4 py-2 bg-black bg-opacity-70 text-white text-lg rounded-md w-1/4" onClick={handleDepartmentEdit}>
                EDIT
            </button>
        </div>
        <div className="line pt-1 w-4/5 md:w-2/3 bg-black bg-opacity-70"></div>

        <div className="departments-box flex flex-row flex-wrap w-4/5 md:w-2/3 justify-evenly mt-5">
            {departmentsList && departmentsList[0] &&
                departmentsList.map((data) => {
                    const department = new Department(data)
                    return (
                        <div className="flex items-center justify-center m-2 w-full xl:w-2/5 h-48 bg-black bg-opacity-10 hover:bg-opacity-20 transition duration-300 rounded-md shadow-sm text-2xl" key={department.id}>
                            <div className="cursor-pointer" onClick={() => handleDepartmentClick(department.id)}>{department.name}</div>
                            <div className="mx-1 cursor-pointer" onClick={() => handleDepartmentDelete(department.id)}><MdDeleteOutline /></div>
                        </div>
                    )
                })}
        </div>
    </>
}