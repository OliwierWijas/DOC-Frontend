import { useParams } from "react-router-dom";
import Story from "../model/Story.js"
import { MdDeleteOutline } from "react-icons/md";
import { useStories } from "../hooks/story/useStories.js"
import { useAddStory } from "../hooks/story/useAddStory.js"
import { useEditStory } from "../hooks/story/useEditStory.js"
import { useDeleteStory } from "../hooks/story/useDeleteStory.js"
import { useState } from "react";

export default function DepartmentDetail() {
  const { departmentId } = useParams()
  const [refreshIndex, setRefreshIndex] = useState(0)
  const storiesList = useStories(departmentId, refreshIndex)

  const addStory = useAddStory()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const editStory = useEditStory()
  const [selectedStory, setSelectedStory] = useState(0)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const deleteStory = useDeleteStory()

  const handleStoryAdd = async () => {
    const department = {
      id: departmentId
    }
    addStory({ title, description, department }, setRefreshIndex)
  }

  const handleStoryEdit = async () => {
    const department = {
      id: departmentId
    }
    const editedStory = {
      id: selectedStory,
      title: newTitle,
      description: newDescription,
      department
    }
    editStory(selectedStory, editedStory, setRefreshIndex)
  }

  const handleStoryDelete = async (storyId) => {
    deleteStory(storyId, setRefreshIndex)
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

          <div className="form-edit">
            <div>Edit a story: </div>
            <select
              className=""
              onChange={(e) => setSelectedStory(e.target.value)}
            >
              {storiesList.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.title}
                </option>
              ))}
            </select>
            <input type="text" id="title" name="title" placeholder="Enter title..." required onChange={(e) => setNewTitle(e.target.value)}></input>
            <textarea id="description" name="description" placeholder="Enter description..." rows="4" required onChange={(e) => setNewDescription(e.target.value)}></textarea>
            <button type="submit" onClick={handleStoryEdit}>EDIT</button>
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
                    <div className="cursor-pointer" onClick={() => handleStoryDelete(story.id)}><MdDeleteOutline /></div>
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