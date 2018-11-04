let position = 0,local = 0;
display(position);

function createRow(x){
    let t = "<td><p>" + x.broj + '</p></td> <td><img src="' + 
    x.slika + '" title="'+x.naziv+'" onclick=window.open("'+x.ign+'")></td> <td><p>' + x.datumizlaska + 
    "</p></td> <td><p>" + x.izvodjac + "</p></td> <td><p>" + 
    x.zanr + "</p></td> <td><p>" + x.ocjena + '</p></td> <td><button onclick="remove(event)">X</button></td>';
    if(inLocalStorage('<tr>'+t+'</tr>')===false){
        let tr = document.createElement("tr");
        document.getElementById("table").appendChild(tr);
        tr.innerHTML = t;
    }
}

function display(pos){
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(this.responseText);
            let array = myObj.games;
            document.getElementById("table").innerHTML = "<tr><th><p>Broj</p></th><th><p>Slika</p></th><th><p>Datum izlaska</p></th><th><p>Izvodjac</p></th><th><p>Zanr</p></th><th><p>Ocjena</p></th><th></th></tr>"
            for(let i=pos;i<Math.min(pos+5,array.length);i++){
                    createRow(array[i]);
            }
        }
    };
    xmlhttp.open("GET", "games.txt", true);
    xmlhttp.send();
}

document.getElementById("next").addEventListener("click",function(){
    position = position + 5;
    display(position);
})

document.getElementById("prev").addEventListener("click",function(){
    position = position - 5;
    display(position);
})

function filterText(s1, s2){
    if(s1.toLowerCase().startsWith(s2.toLowerCase())){
        return true;
    }
    return false;
}

function filterRate(a,b){
    if(a>=b){
        return true;
    }
    return false;
}

function filterGenre(s1,s2){
    if(s1.toLowerCase().indexOf(s2.toLowerCase()) !== -1){
        return true;
    }
    return false;
}

function search(event){
    event.preventDefault();
    document.getElementById("table").innerHTML = "<tr><th><p>Broj</p></th><th><p>Slika</p></th><th><p>Datum izlaska</p></th><th><p>Izvodjac</p></th><th><p>Zanr</p></th><th><p>Ocjena</p></th></tr>"
    let select = document.getElementById("rate");
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(this.responseText);
            let array = myObj.games;
            for(let i=0;i<array.length;i++){
                if(document.getElementById("ime").checked){
                    if((filterText(array[i].naziv,document.getElementById("enter").value)) && filterRate(array[i].ocjena,Number(select.value))){
                        createRow(array[i]);
                    }
                }
                else if(document.getElementById("zanr").checked){
                    if((filterGenre(array[i].zanr,document.getElementById("enter").value)) && filterRate(array[i].ocjena,Number(select.value))){
                        createRow(array[i]);
                    }
                }  
            }
        }
    };
    xmlhttp.open("GET", "games.txt", true);
    xmlhttp.send();
}

function remove(event){
    let inh = event.target.parentElement.parentElement.outerHTML;
    localStorage.setItem('it'+local,inh);
    local++;
    event.target.parentElement.parentElement.style.display = "none";
}

document.getElementById("form").addEventListener("submit",search);

function inLocalStorage(s){
    for(let i=0;i<localStorage.length;i++){
        if(localStorage.getItem('it'+i)==s){
            return true;
        }
    }
    return false;
}
