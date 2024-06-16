import { useParams } from "react-router-dom";
import Story from "../model/Story.js"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useStories } from "../hooks/story/useStories.js"
import { useAddStory } from "../hooks/story/useAddStory.js"
import { useState } from "react";

export default function DepartmentDetail() {
  const { departmentId } = useParams()
  const [refreshIndex, setRefreshIndex] = useState(0)
  console.log(departmentId)
  const storiesList = useStories(departmentId, refreshIndex)

  const addStory = useAddStory()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleStoryAdd = async () => {
    const department = {
      id: departmentId
    }
    addStory({title, description, department}, setRefreshIndex)
  }

  return (
    <div>
      {departmentId ? (
        <div>
          <div className="form-add">
            <div>Add a new story: </div>
            <input type="text" id="title" name="title" placeholder="Enter title..." required onChange={(e) => setTitle(e.target.value)}></input>
            <textarea id="description" name="description" placeholder="Enter description..." rows="4" required onChange={(e) => setDescription(e.target.value)}></textarea>
            <button type="submit" onClick={handleStoryAdd}>ADD</button>
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