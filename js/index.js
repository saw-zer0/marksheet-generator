

//add button eventListener
document.getElementById("add-student").addEventListener("click", (event) => {
    event.preventDefault();

    const studentName = document.querySelector("#student-name").value;
    const schoolClass = document.querySelector("#class-selector").value;
    const roll = document.querySelector("#roll").value;
    const subjects = document.querySelectorAll("[data-subject]");
    let subjectsObj = {};
    subjects.forEach(elem => {
        let marks = elem.value;
        let subName = elem.id;
        subjectsObj[subName] = marks;
    })
    const attendance = document.getElementById("attendance").value;

    const student = new Student(studentName, schoolClass, roll, subjectsObj, attendance);

    //add to localStorage
    Store.addData((student));
    //add to ui
    Ui.addToTable(student);
    Ui.clearForm();
})



//display table
document.addEventListener('DOMContentLoaded', Ui.displayInTable);

//remove button event listener
document.getElementById("result-list").addEventListener('click', (elem) => {
    elem.preventDefault();

    //remove from table
    Ui.removeFromTable(elem.target);

    //remove from local storage
    const roll = elem.target.parentNode.parentNode.children[0].innerText;
    Store.removeData(roll);
})


