let img = document.getElementsByTagName("li");
let count = 0;
img[count].style.display = "block";

document.onkeydown = checkKey;

function previous(){
    img[count].style.display = "none";
    if(count==0){
        count = img.length-1;
    }
    else{
        count--;
    }
    img[count].style.display = "block";
}

function next(){
    img[count].style.display = "none";
    if(count==img.length-1){
        count = 0;
    }
    else{
        count++;
    }
    img[count].style.display = "block";
}

function checkKey(e){
    e = e || window.event;
  if (e.keyCode == '37') {
    previous();
  }
  else if (e.keyCode == '39') {
    next();
  }
}

function returnSize(event){
    Array.from(img).forEach(function(element){
        element.parentElement.parentElement.style.left = "15%";
        element.parentElement.parentElement.style.top = "20%";
        element.parentElement.parentElement.style.width = "70%";
        element.parentElement.parentElement.style.height = "60%";
    })
    event.target.style.display = "none";
}

function close(){
    let closeBtn = document.getElementById("close");
    closeBtn.style.display = "block";
    closeBtn.addEventListener("click",returnSize);
}

function resize(){
    close();
    Array.from(img).forEach(function(element){
        element.parentElement.parentElement.style.left = "5%";
        element.parentElement.parentElement.style.top = "5%";
        element.parentElement.parentElement.style.width = "90%";
        element.parentElement.parentElement.style.height = "90%";
    })
}

document.getElementById("prev").addEventListener("click",previous);
document.getElementById("next").addEventListener("click",next);
document.getElementById("container").addEventListener("mouseover",function(event){
    document.onkeydown = checkKey;
});
Array.from(img).forEach(function(element){
    element.addEventListener("click",resize);
})