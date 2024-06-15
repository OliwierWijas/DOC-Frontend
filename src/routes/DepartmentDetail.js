import { useParams } from "react-router-dom";
import Story from "../model/Story.js"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useStories } from "../hooks/story/useStories.js"

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
          <div>
          <label for="title">Create a new story: </label>
          <input type="text" id="title" name="title" placeholder="Enter title..." required></input>
          <textarea id="description" name="description" placeholder="Enter description..." rows="4" required></textarea>
          <button type="submit">Create</button>
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
                    <div><FaRegEdit /></div>
                    <div><MdDeleteOutline /></div>
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