
//display subject
document.addEventListener('DOMContentLoaded', SubjectUi.displaySubjects());

//add subject button event listener
document.getElementById("add-subject").addEventListener('click', (e)=>{
    e.preventDefault();

    const subjectName = document.getElementById("subject-name").value;
    const fm = document.getElementById("full-marks").value;
    const pm = document.getElementById("pass-marks").value;

    const new_subject = new Subject(subjectName,fm,pm);

    //add to ui
    SubjectUi.addToSubjectsTable(new_subject);
    //Ui.clearForm();

    //add to local Storage
    SubjectStore.addSubject(new_subject);
})