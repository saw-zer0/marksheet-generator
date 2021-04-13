
class Ui {
    static displayInTable() {
        const data = Store.getData();
        data.forEach(elem => {
            Ui.addToTable(elem);
        });
    }

    static addToTable(student) {
        const tableBody = document.querySelector("#result-list");
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
        tableBody.appendChild(row)
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
}



class Store {
    static getData() {
        let data;
        if (localStorage.getItem('data') === null) {
            data = [];
        } else {
            data = JSON.parse(localStorage.getItem('data'));
        }
        return data;
    }

    static addData(newData) {
        const datas = Store.getData();
        datas.push(newData);
        localStorage.setItem('data', JSON.stringify(datas));
    }

    static removeData(roll) {
        const data = Store.getData();
        data.forEach((element, index) => {
            if (element.roll === roll) {
                data.splice(index, 1);
            }
        });
        localStorage.setItem('data', JSON.stringify(data));
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



//add button eventListener
document.getElementById("add-student").addEventListener("click", (event) => {
    event.preventDefault();

    const studentName = document.querySelector("#student-name").value;
    const schoolClass = document.querySelector("#school-class").value;
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


