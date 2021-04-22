class SubjectStore{
    static getSubjects(){
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


class Ui {
    static displayInTable() {
        const data = Store.getData();
        data.forEach(elem => {
            Ui.addToTable(elem);
        });
    }

    static addToTable(student) {
        const tableBody = document.getElementById("result-list");
        const row = document.createElement("tr");
        let innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            `
        let key;
        for (key in student.subjects) {
            innerHTML += `<td>${student.subjects[key]}</td>`



        }
        innerHTML += `<td>${student.total}</td>` +
            `<td>${student.percentage}</td>` +
            `<td>${student.division}</td>` +
            `<td>${student.rank}</td>` +
            `<td>${student.attendance}</td>` +
            `<td><a href="#" class="btn btn-danger delete">X</a>`;


        row.innerHTML = innerHTML;
        
        tableBody.appendChild(row);
    }

    static removeFromTable(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static clearForm() {
        const elements = document.querySelectorAll('input');
        elements.forEach(elem => {
            elem.value = "";
        })
    }

    static displayTableHead(subs) {
        const tableHead = document.getElementById("table-head");
        const row = document.createElement("tr");
        let innerHTML = "<th>R/n</th><th>Name</th>"
        subs.forEach(elem => {
            innerHTML += `<th>${elem}</th>`
        });
        innerHTML += `<th>Total</th><th>%</th><th>%Div.</th><th>Rank</th><th>Attendance</th><th></th><th></th>`;
        row.innerHTML = innerHTML;
        tableHead.innerHTML = "";
        tableHead.appendChild(row);
    }

    static clearTable(){
        document.getElementById("result-list").innerHTML = "";
    }
}



class Store {
    static getData() {
        let data;
        if (localStorage.getItem(`data${document.getElementById("class-selector").value}`) === null) {
            data = [];
        } else {
            data = JSON.parse(localStorage.getItem(`data${document.getElementById("class-selector").value}`));
        }
        return data;
    }

    static addData(newData) {
        const datas = Store.getData();
        datas.push(newData);
        localStorage.setItem(`data${document.getElementById("class-selector").value}`, JSON.stringify(datas));
    }

    static removeData(roll) {
        const data = Store.getData();
        data.forEach((element, index) => {
            if (element.roll === roll) {
                data.splice(index, 1);
            }
        });
        localStorage.setItem(`data${document.getElementById("class-selector").value}`, JSON.stringify(data));
    }

}


class Student {
    constructor(name, schoolClass, roll, subjects, attendance) {
        this.name = name;
        this.schoolClass = schoolClass;
        this.roll = roll;
        this.subjects = subjects;
        this.attendance = attendance;
        this.total = Object.values(this.subjects).reduce((result, current) => {
            return parseFloat(result) + parseFloat(current);
        })
        this.percentage = this.total / 750 * 100;
        this.division = (this.percentage >= 80) ? "Distinction" : (this.percentage >= 60) ? "First" : (this.percentage >= 40) ? "Pass" : "Fail";
    }
}

class Form {
    static displayForm(){
        const subjects =SubjectStore.getSubjects();
        subjects.forEach(elem => {
            Form.addToForm(elem.subjectName);
        })
    }

    static addToForm(subjectName) {
        const subjectParentElement = document.getElementById("form-subjects")
        const div = document.createElement("div")
        div.className = "form-group"
        div.innerHTML = `
            <label for="${subjectName}">${subjectName}</label>
            <input type="text" id="${subjectName}" data-subject>
        `;
        subjectParentElement.appendChild(div);
    }

    static removeFromForm(subjectName){
        document.getElementById(subjectName).parentElement.remove();
    }
    
    static emptyForm(){
        document.getElementById("form-subjects").innerHTML = "";
    }
}


class ViewTable{
    static displayInViewTable() {
        const data = Store.getData();
        data.forEach(elem => {
            ViewTable.addToViewTable(elem);
        });
    }

    static addToViewTable(student) {
        const tableBody = document.getElementById("report-for-teacher");
        const row = document.createElement("tr");
        let innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            `
        let key;
        for (key in student.subjects) {
            innerHTML += `<td>${student.subjects[key]}</td>`

        }
        innerHTML += `<td>${student.total}</td>` +
            `<td>${student.percentage}</td>` +
            `<td>${student.division}</td>` +
            `<td>${student.rank}</td>` +
            `<td>${student.attendance}</td>` +
            `<td><a href="#" class="btn btn-secondary delete">report card</a>`;


        row.innerHTML = innerHTML;
        
        tableBody.appendChild(row);
    }

    static displayViewTableHead(subs) {
        const tableHead = document.getElementById("view-table-head");
        const row = document.createElement("tr");
        let innerHTML = "<th>R/n</th><th>Name</th>"
        subs.forEach(elem => {
            innerHTML += `<th>${elem}</th>`
        });
        innerHTML += `<th>Total</th><th>%</th><th>%Div.</th><th>Rank</th><th>Attendance</th><th></th><th></th>`;
        row.innerHTML = innerHTML;
        tableHead.innerHTML = "";
        tableHead.appendChild(row);
    }

    static clearViewTable(){
        document.getElementById("report-for-teacher").innerHTML = "";
    }

}