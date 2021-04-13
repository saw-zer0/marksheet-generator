class SubjectStore{
    static getSubjects(class_value){
        let subjects;
        if(localStorage.getItem(`class${document.getElementById("class-selector").value}`) === null){
            subjects = [];
        }else{
            subjects = JSON.parse(localStorage.getItem(`class${document.getElementById("class-selector").value}`))
        }
        return subjects;
    }

    static addSubject(subject){
        let subjectsData = SubjectStore.getSubjects();
        subjectsData.push(subject);
        localStorage.setItem(`class${document.getElementById("class-selector").value}`,JSON.stringify(subjectsData));
    }

    static removeSubject(subjectName){
        let subjectsData = SubjectStore.getSubjects();
        subjectsData.forEach((element,index) => {
            if(element.subjectName === subjectName){
                subjectsData.splice(index,1);
            }
        });
        localStorage.setItem(`class${document.getElementById("class-selector").value}`, subjectsData);
    }
}

class SubjectUi{

    static displaySubjects(){
        const subjectsData = SubjectStore.getSubjects(`class${document.getElementById("class-selector").value}`);
        subjectsData.forEach(elem => {
            SubjectUi.addToSubjectsTable(elem);
        });
    }

    static addToSubjectsTable(subject){
        let row = document.createElement("tr");
        const tableBody = document.getElementById("subject-table");
        row.innerHTML = 
        `<td>${subject.subjectName}</td>`+
        `<td>${subject.fullMarks}`+
        `<td>${subject.passMarks}`;
        tableBody.appendChild(row);
    }

    static removeFromSubjectsTable(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static clearSubjectTable(){
        document.getElementById('subject-table').innerHTML = "";
    }

}

class Subject{
    constructor(name, fm, pm){
        this.subjectName = name;
        this.fullMarks = fm;
        this.passMarks = pm;
    }
}


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