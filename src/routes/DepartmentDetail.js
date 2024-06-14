import { useParams } from "react-router-dom";
import Story from "../model/Story.js"
import { useStories } from "../hooks/useStories.js";

export default function DepartmentDetail() {
  const { departmentName } = useParams()
  const storiesList = useStories(departmentName)

  return (
    <div>
      {departmentName ? (
        <div>
          <div className="department-name">
            {departmentName}
          </div>
          <div className="storiesList">
            {storiesList && storiesList[0] &&
              storiesList.map((data) => {
                const story = new Story(data)
                return (
                  <div className="story-container" key={story.id}>
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