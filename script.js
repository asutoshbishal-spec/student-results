const students = [
    { id: "Akshay", name: "Akshay", marks: 75 },
    { id: "vignesh", name: "Vignesh", marks: 42 },
    { id: "shiva", name: "shiva", marks: 90 },
    { id: "vaishnavi", name: "Vaishnavi", marks: 50 },
    { id: "akka", name: "akka", marks: 35 }
];

let showPassedOnly = false;

// Function to calculate class average
function calculateClassAverage() {
    const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
    const average = totalMarks / students.length;
    return average.toFixed(1);
}

// Function to update class average display
function updateClassAverage() {
    const averageElement = document.getElementById('classAverage');
    averageElement.textContent = `Class Average: ${calculateClassAverage()}`;
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
        card.innerHTML = `
            <strong>${student.name}</strong> — ${student.marks}
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
    const newId = name;
    students.push({
        id: newId,
        name: name,
        marks: marks
    });

    // Update class average
    updateClassAverage();

    // Refresh display
    displayStudents();

    // Clear form
    nameInput.value = '';
    marksInput.value = '';
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateClassAverage();
    displayStudents();
});
