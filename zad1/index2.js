function returnValue(c){
    let a = ['M','D','C','L','X','V','I'];
    let b = [1000,500,100,50,10,5,1];
    if(c >= 'A' && a <= 'Z'){
        return b[a.indexOf(c)];
    }
    else{
        return a[b.indexOf(c)];
    }
}

function digits(n)
{
    let d = 0;
    while(n > 0){
        d++;
        n = Math.floor(n/10);
    }
    return d;
}

function romanToNumber(s)
{
    let n=0;
    for(let i = 0; i < s.length; i++){
        if(i == s.length - 1){
            n += returnValue(s[i]);
        }
        else{
            if(returnValue(s[i])>=returnValue(s[i+1])){
                n += returnValue(s[i]);
            }
            else{
                n += returnValue(s[i+1]) - returnValue(s[i]);
                i++;
            }
        }
    }
    return n;
}

function convertOne(n,c){
    let dec = Math.pow(10,c);
    let s = '';
    if(n <= 3){
        for(let i = 1; i <= n; i++)
        s += returnValue(dec);
    }
    else if(n == 4){
        s += returnValue(dec);
        s += returnValue(5*dec);
    }
    else if(n >= 5 && n <= 8){
        s += returnValue(5*dec);
        for(let i = 6; i <= n; i++){
            s += returnValue(dec);
        }
    }
    else{
        s += returnValue(dec);
        s += returnValue(dec*10);
    }
    return s;
}

function numberToRoman(n)
{
    let s = '';
    let c = digits(n) - 1;
    for(let i = c; i >= 0; i --){
        let num = Math.floor(n/(Math.pow(10,i)));
        s += convertOne(num,i);
        n = n - num*Math.pow(10,i);
    }
    return s;
}

function showN(event)
{
    event.preventDefault();
    document.getElementById("number").innerHTML='';
    let i = document.createTextNode(romanToNumber(document.getElementById("roman").value));
    document.getElementById("number").style.display = "block";
    document.getElementById("number").appendChild(i);
}

function showR(event)
{
    event.preventDefault();
    document.getElementById("number").innerHTML='';
    let i = document.createTextNode(numberToRoman(document.getElementById("roman").value));
    document.getElementById("number").style.display = "block";
    document.getElementById("number").appendChild(i);
}

document.getElementById("btn1").addEventListener("click",showN);
document.getElementById("btn2").addEventListener("click",showR);