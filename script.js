document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('courses.html')) {
        loadCourses();
    }

    document.getElementById('courseList').addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const courseCode = event.target.dataset.courseCode;
            loadCourseDetails(courseCode);
        }
    });
});

function loadCourses() {
    fetch('json/foxbooks.json')
        .then(response => response.json())
        .then(data => {
            const courseList = document.getElementById('courseList');
            data.courses.forEach(course => {
                const listItem = document.createElement('div');
                listItem.innerHTML = `<a href="#" data-course-code="${course.courseCode}">${course.courseCode} - ${course.courseName}</a>`;
                courseList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function loadCourseDetails(courseCode) {
    fetch('json/foxbooks.json')
        .then(response => response.json())
        .then(data => {
            const selectedCourse = data.courses.find(course => course.courseCode === courseCode);

            const courseDetails = document.getElementById('courseDetails');
            courseDetails.innerHTML = `
                <h2>${selectedCourse.courseCode} - ${selectedCourse.courseName}</h2>
                <ul>
                    ${selectedCourse.books.map(book => `
                        <li>
                            <strong>${book.bookTitle}</strong> by ${book.author}<br>
                            ISBN: ${book.isbn}<br>
                            Year: ${book.publicationYear}<br>
                            Publisher: ${book.publisher}<br>
                            Edition: ${book.edition}
                        </li>
                    `).join('')}
                </ul>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
}