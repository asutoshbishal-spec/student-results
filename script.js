const students = [
    { id: 1, name: "Akshay", marks: 75 },
    { id: 2, name: "Vignesh", marks: 42 },
    { id: 3, name: "shiva", marks: 90 },
    { id: 4, name: "Vaishnavi", marks: 50 },
    { id: 5, name: "akka", marks: 35 }
];

let showPassedOnly = false;

// Function to calculate class average
function calculateClassAverage() {
    const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
    const average = totalMarks / students.length;
    return average.toFixed(1);
}

// Function to update results info display
function updateResultsInfo() {
    const infoElement = document.getElementById('resultsInfo');
    const average = calculateClassAverage();
    infoElement.textContent = `${students.length} students · Average: ${average}%`;
}

// Function to display students
function displayStudents() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    const studentsToDisplay = showPassedOnly 
        ? students.filter(student => student.marks > 50)
        : students;

    studentsToDisplay.forEach(student => {
        const card = document.createElement('li');
        card.className = 'student-card';
        
        const isPassed = student.marks > 50;
        if (isPassed) {
            card.classList.add('passed');
        } else {
            card.classList.add('failed');
        }
        
        const statusText = isPassed ? 'Passed' : 'Needs focus';
        
        card.innerHTML = `
            <div class="student-card-info">
                <div class="name">${student.name}</div>
                <div class="student-id">Student #${student.id}</div>
            </div>
            <div class="student-card-right">
                <div class="marks">${student.marks}/100</div>
                <div class="status">${statusText}</div>
            </div>
        `;
        resultsList.appendChild(card);
    });
}

// Toggle show passed / show all
document.getElementById('showPassedButton').addEventListener('click', function() {
    showPassedOnly = !showPassedOnly;
    this.textContent = showPassedOnly ? 'Show all' : 'Show passed';
    displayStudents();
});

// Add student functionality
document.getElementById('addButton').addEventListener('click', function() {
    const nameInput = document.getElementById('studentName');
    const marksInput = document.getElementById('marks');
    
    const name = nameInput.value.trim();
    const marks = parseInt(marksInput.value);

    // Validate name is not empty
    if (!name) {
        alert('Please enter a student name');
        return;
    }

    // Validate marks are a number between 0 and 100
    if (isNaN(marks) || marks < 0 || marks > 100) {
        alert('Please enter valid marks between 0 and 100');
        return;
    }

    // Add new student to array
    const newId = students.length + 1;
    students.push({
        id: newId,
        name: name,
        marks: marks
    });

    // Update results info
    updateResultsInfo();

    // Refresh display
    displayStudents();

    // Clear form
    nameInput.value = '';
    marksInput.value = '';
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateResultsInfo();
    displayStudents();
});
