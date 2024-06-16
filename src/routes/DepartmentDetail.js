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
    <div className="w-4/5 md:w-2/3">
      {departmentId ? (
        <div className="flex flex-col justify-center">
          <div className="form-add w-full">
            <div className="text-2xl font-semibold">Add a new story: </div>
            <input className="px-4 py-2 my-1 border rounded-md mr-2 w-full" type="text" id="title" name="title" placeholder="Enter title..." required onChange={(e) => setTitle(e.target.value)}></input>
            <textarea className="px-4 py-2 my-1 border rounded-md mr-2 w-full" id="description" name="description" placeholder="Enter description..." rows="4" required onChange={(e) => setDescription(e.target.value)}></textarea>
            <button className="px-4 py-2 bg-black bg-opacity-70 text-white text-lg rounded-md w-1/4 float-right" type="submit" onClick={handleStoryAdd}>ADD</button>
          </div>

          <div className="line pt-1 my-2 w-full bg-black bg-opacity-70"></div>

          <div className="form-edit w-full">
            <div className="text-2xl font-semibold">Edit a story: </div>
            {storiesList && storiesList[0] &&
              <select
                className="px-4 py-2 my-1 border rounded-md mr-2 w-1/4"
                onChange={(e) => setSelectedStory(e.target.value)}
              >
                {storiesList.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.title}
                  </option>
                ))}
              </select>
            }
            <input className="px-4 py-2 my-1 border rounded-md mr-2 w-full" type="text" id="title" name="title" placeholder="Enter title..." required onChange={(e) => setNewTitle(e.target.value)}></input>
            <textarea className="px-4 py-2 my-1 border rounded-md mr-2 w-full" id="description" name="description" placeholder="Enter description..." rows="4" required onChange={(e) => setNewDescription(e.target.value)}></textarea>
            <button className="px-4 py-2 bg-black bg-opacity-70 text-white text-lg rounded-md w-1/4 float-right" type="submit" onClick={handleStoryEdit}>EDIT</button>
          </div>

          <div className="line pt-1 my-2 w-full bg-black bg-opacity-70"></div>

          <div className="storiesList flex flex-row flex-wrap justify-evenly">
            {storiesList && storiesList[0] &&
              storiesList.map((data) => {
                const story = new Story(data)
                return (
                  <div className="story-container flex flex-col w-64 my-2 justify-center items-center border rounded-md shadow-sm" key={story.id}>
                    <div className="flex flex-row justify-center items-center my-2">
                      <div className="text-2xl">{story.title}</div>
                      <div className="ml-2 cursor-pointer" onClick={() => handleStoryDelete(story.id)}><MdDeleteOutline /></div>
                    </div>
                    <div className="text-base font-thin mb-2">{story.description}</div>
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