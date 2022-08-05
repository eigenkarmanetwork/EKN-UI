// Verify logged in or redirect and die.

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var username = getCookie("username");
var password = getCookie("key");
var password_type = getCookie("type");
var data = {"username": username, "password": password, "password_type": password_type};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        return;
    }else if(this.readyState == 4){
        logout();
        document.getElementsByTagName("html")[0].innerHTML = "Please Login.";
    }
}
xhttp.open("POST", "http://www.eigentrust.net/api/verify_credentials.php", false);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.setRequestHeader("Accept", "text/plain");
xhttp.send(JSON.stringify(data));
