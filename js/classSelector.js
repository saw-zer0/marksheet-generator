const report_editor = document.getElementById("edit-report");
const view_report = document.getElementById("view-report");
const subject_editor = document.getElementById("edit-subject");

let arr = ["report-editor", "subject-editor", "report-for-teacher"]

report_editor.addEventListener('click',(e)=>{
    e.preventDefault();

    const html_div = document.getElementById("report-editor");
    visibility_toggle(html_div);
})

subject_editor.addEventListener('click',(e)=>{
    e.preventDefault();

    const html_div = document.getElementById("subject-editor");
    visibility_toggle(html_div);
    SubjectUi.clearSubjectTable();
    SubjectUi.displaySubjects();
})

view_report.addEventListener('click',(e)=>{
    e.preventDefault();

    const html_div = document.getElementById("report-for-teacher");
    visibility_toggle(html_div);
})

//make a visibility_toggle function;
function visibility_toggle(html){
    arr.forEach(element=>{        
        if(html.id === element){
            console.log(html.id,element)
            html.style.visibility = "visible";
        }else{
            document.getElementById(element).style.visibility = "collapse";
        }
    })
}