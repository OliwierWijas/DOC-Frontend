import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Department from "../model/Department.js"
import Story from "../model/Story.js"

export default function DepartmentDetail() {
  const { departmentName } = useParams()
  const [department, setDepartment] = useState(null)
  const [storiesList, setStoriesList] = useState(null)

  useEffect(() => {
    fetchData(departmentName)
      .then(([departmentData, storiesData]) => {
        const newDepartment = new Department(departmentData)
        setDepartment(newDepartment)
        setStoriesList(storiesData)
      })
      .catch((error) => {
        console.log("Error fetching the department's data: ", error)
      })
  }, [departmentName])

  return (
    <div>
      {department ? (
        <div>
          <div className="department-name">
            {department.name}
          </div>
          <div className="storiesList">
            {storiesList != null &&
              storiesList.map((data) => {
                const story = new Story(data)
                return (
                  <div className="story-container">
                    <div>{story.id}</div>
                    <div>{story.title}</div>
                    <div>{story.description}</div>
                  </div>
                )
              })}
          </div>
        </div>
      ) : (
        <div>Loading the department's information...</div>
      )}
    </div>
  );
}

async function fetchData(departmentName) {
  const promises = []

  promises.push(fetch(`http://localhost:8080/departments/${departmentName}`))
  promises.push(fetch(`http://localhost:8080/stories?departmentName=${departmentName}`))

  const responses = await Promise.all(promises);
  const data = await Promise.all(responses.map((response) => response.json()))

  return data;
}