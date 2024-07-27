const checkBoxList = document.querySelectorAll('.goal-checkbox ')
const inputField= document.querySelectorAll(".goal-input")
const messege= document.querySelector(".error-messege")
const progressbar= document.querySelector(".custom-progressbar")
const progressvalue= document.querySelector(".progress-value")
const progresslebel= document.querySelector('.progress-label')

const mydata=JSON.parse(localStorage.getItem('mydata')) || {
    first:{
        name:'',
        completed:false,

    },
    second:{
        name:'',
        completed:false,

    },
    third:{
        name:'',
        completed:false,

    },
}
let count= Object.values(mydata).filter((data)=>data.completed).length
progressvalue.style.width= `${count/3*100}%`
progressvalue.firstElementChild.innerHTML=`${count}/3 completed`

const allquotes= [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
]
progresslebel.innerHTML=allquotes[count]



checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
        const goals= [...inputField].every((input)=>{
            return input.value
        })
        if(goals){
            checkbox.parentElement.classList.toggle("completed")
            const inputid=checkbox.nextElementSibling.id
            mydata[inputid].completed=!mydata[inputid].completed
            count= Object.values(mydata).filter((data)=>data.completed).length
            progressvalue.style.width= `${count/3*100}%`
            progressvalue.firstElementChild.innerHTML=`${count}/3 completed`
            progresslebel.innerHTML=allquotes[count]
            localStorage.setItem('mydata',JSON.stringify(mydata))
        }
        else{
            messege.parentElement.classList.add("error")
        }

    })
})
inputField.forEach((input)=>{
    input.value=mydata[input.id].name
    if(mydata[input.id].completed){
        input.parentElement.classList.add("completed")
    }
    input.addEventListener('focus',(e)=>{
        messege.parentElement.classList.remove("error")
    })
input.addEventListener('input',(e)=>{
    if(mydata[input.id].completed){
      input.value=mydata[input.id].name
      return
    }
    mydata[input.id].name= e.target.value
    localStorage.setItem('mydata',JSON.stringify(mydata))
})
    
})
