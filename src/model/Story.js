import Department from "./Department.js"

class Story {
    constructor (data) {
        this.id = data.id
        this.title = data.title
        this.description = data.description
        this.department = new Department(data.department)
    }
}

export default Story