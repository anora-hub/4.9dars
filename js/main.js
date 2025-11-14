let students = JSON.parse(localStorage.getItem("students") || "[]");
let search = document.getElementById("search-input")
let lavozimTuri = document.getElementById("lavozim-turi")
let manzilar = document.getElementById("manzillar")

localStorage.setItem("students", JSON.stringify(students))


lavozimTuri.addEventListener("click" , function(e){
let selected = e.target.value;
    if (selected === "lavozimni turini tanlang"){
    showstudents(tbody, students)
}else{
    let selectedGroupStudents = students.filter((el) => el.junior === selected)
    showstudents(tbody, selectedGroupStudents)
}
})


manzilar.addEventListener("click", function (e) {
    let manzilValue = e.target.value;
    if (manzilValue === "manzilni tanlang") {
        showstudents(tbody, students)
    } else {
        let manzilSearched = students.filter((el) => el.manzil === manzilValue)
        showstudents(tbody, manzilSearched)
    }

})







search.addEventListener("input" , function(e){
    let searchValue = e.target.value; 
    if(searchValue === ""){
        showstudents(tbody, studentsSearched)

    }else{
     let studentsSearched =  students.filter((el) => el.ism.toLowerCase().includes(searchValue.toLowerCase()))
        showstudents(tbody, studentsSearched )

    }

})





console.log(students);


let outerModal = document.getElementById("outer-modal")
let innerModal = document.getElementById("inner-modal");
let addBtn = document.getElementById("add-btn")
let tbody = document.getElementById("tbody");
let selected = null;
let btn = document.getElementById("btn")




addBtn.addEventListener("click", function () {
    outerModal.classList.remove("hidden")
    selected ? btn.textContent = "Tahrirlash" : btn.textContent ="Qo'shish"

})

outerModal.addEventListener("click", function () {
    outerModal.classList.add("hidden")
    selected = null
    innerModal[0].value =   ""        
    innerModal[1].value = ""
    innerModal[2].value = ""
    innerModal[3].value = ""
    innerModal[4].value = ""
    innerModal[5].value = ""
    innerModal[6].value = ""
    innerModal[7].checked= ""
})
innerModal.addEventListener("click", function (e) {
    e.stopPropagation()

})

innerModal.addEventListener("submit", function (e) {
    e.preventDefault();
    let studentObj = {};

    if (selected) {
       students = students.map((el)=>{
           if(el.id === selected){
               el.ism = e.target[0].value;
               el.familya = e.target[1].value;
               el.manzil = e.target[2].value;
               el.tugulgankun = e.target[3].value;
               el.go = e.target[4].value;
               el.junior = e.target[5].value;
               el.maosh = e.target[6].value;
               el.turmush = e.target[7].checked;
           }
           return el
           })
    }else{
        studentObj.ism = e.target[0].value;
        studentObj.familya = e.target[1].value;
        studentObj.manzil = e.target[2].value;
        studentObj.tugulgankun = e.target[3].value;
        studentObj.go = e.target[4].value;
        studentObj.junior = e.target[5].value;
        studentObj.maosh = e.target[6].value;
        studentObj.turmush = e.target[7].checked;
        studentObj.id = students.length + 1;
        students.push(studentObj)
    }
    localStorage.setItem("students", JSON.stringify(students))
    showstudents(tbody, students)
    selected = null ;
    outerModal.classList.add("hidden")
    innerModal[0].value = ""
    innerModal[1].value = ""
    innerModal[2].value = ""
    innerModal[3].value = ""
    innerModal[4].value = ""
    innerModal[5].value = ""
    innerModal[6].value = ""
    innerModal[7].checked = ""
})




function showstudents(contact, data) {
    contact.innerHTML = ""
   data.map((el, index) => {
        contact.innerHTML += `
     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${index + 1}
                    </th>
                    <td class="px-6 py-4">
                        ${el.ism}
                    </td>
                    <td class="px-6 py-4">
                        ${el.familya}
                    </td>
                    <td class="px-6 py-4">
                        ${el.manzil}
                    </td>
                    <td class="px-6 py-4">
                        ${el.tugulgankun}
                    </td>
                    <td class="px-6 py-4">
                        ${el.go}
                    </td>
                    <td class="px-6 py-4">
                        ${el.junior}
                    </td>
                    <td class="px-6 py-4">
                       ${el.maosh}
                    </td>
                    <td class="px-6 py-4">
                        ${el.turmush ? "ha" : "yoq"}
                    </td>
                    <td class="px-6 py-4">
                        <button 
                        onClick="edit(${el.id})"
                            class="px-6 py-[2px] bg-[blue] border-[2px] border-[blue]  rounded-[5px] text-white">Edit</button>
                        <button
                        onClick="deleteStudent(${el.id})"
                            class="px-6 py-[2px] bg-[red] border-[2px] border-[red] rounded-[5px]  text-white">Delate</button>
                    </td>
                </tr>
    `
    })  
}
showstudents(tbody, students)

function edit(id) {
    selected = id
    let student = students.find((el) => el.id === id)
     btn.textContent = "Tahrirlash" 
    outerModal.classList.remove("hidden")
    innerModal[0].value = student.ism
    innerModal[1].value = student.familya
    innerModal[2].value = student.manzil
    innerModal[3].value = student.tugulgankun
    innerModal[4].value = student.go
    innerModal[5].value = student.junior
    innerModal[6].value = student.maosh
    innerModal[7].checked = student.turmush
}

function deleteStudent(id){
students = students.filter((el)=> el.id !== id)
    localStorage.setItem("students", JSON.stringify(students))
    showstudents(tbody, students)

}