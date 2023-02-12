class Course {
  constructor(title, instructor, image) {
    this.courseId = Math.floor(Math.random()*10000);
    this.title = title;
    this.instructor = instructor;
    this.image = image;
  }

  addCourseToList(course) {
    const list = document.getElementById("course-list");

    var html = `
            <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" dataId="${course.courseId}" class = "btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        
        `;
    list.innerHTML += html;
  }

  clearControls() {
    document.getElementById("title").value = "";
    document.getElementById("instructor").value = "";
    document.getElementById("image").value = "";
  }

  deleteCourse(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }

  showAlert(message, className) {
    var alert = `
    <div class="alert alert-${className}">
        ${message}
    </div>
    
    `;
    const row = document.querySelector(".row");
    row.insertAdjacentHTML("beforeBegin", alert);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}
const course1 = new Course();
class Storage {
  
  static getCourses() {
    let courses;

    if (localStorage.getItem("courses") === null) {
      courses = [];
    } else {
      courses = JSON.parse(localStorage.getItem("courses"));
    }
    return courses;
  }
  static displayCourses() {
    const courses = Storage.getCourses();
    courses.forEach((course) => {
        course1.addCourseToList(course);
    });
  }
  static addCourse(course) {
    const courses = Storage.getCourses();
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses));
  }
  static deleteCourse(element) {
    if(element.classList.contains('delete')){
        const id = element.getAttribute("dataId");
        const courses = Storage.getCourses();
        courses.forEach((course,index) =>{
            if(course.courseId == id){
                courses.splice(index,1);
            }
        })
        localStorage.setItem("courses",JSON.stringify(courses));
    }
  }
}

document.addEventListener("DOMContentLoaded", Storage.displayCourses);

const course = new Course();

document.getElementById("new-course").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const instructor = document.getElementById("instructor").value;
  const image = document.getElementById("image").value;

  course.title = title;
  course.instructor = instructor;
  course.image = image;

  if (title === "" || instructor === "" || image === "") {
    course.showAlert("Please complete the form", "warning");
  } else {
    course.addCourseToList(course);
    Storage.addCourse(course);
    course.clearControls();
    course.showAlert("The course has been added", "success");
  }

  e.preventDefault();
});

document.getElementById("course-list").addEventListener("click", function (e) {
  course.deleteCourse(e.target);
  Storage.deleteCourse(e.target);
  if (e.target.classList.contains("delete")) {
    course.showAlert("The course has been deleted", "danger");
  }
});
