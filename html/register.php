<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
        $PAGE_TITLE = "Register";
        require("head.php");
    ?>
    <style>
        .container {
            text-align: center;
        }
        table {
            margin-left: auto;
            margin-right: auto;
        }
    </style>
    <script>
        function register(){
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var confirm = document.getElementById("confirm").value;

            if(password !== confirm){
                document.getElementById("notice").innerHTML = "Password's did not match.";
                document.getElementById("notice").style = "color: red;";
                return;
            }

            if(password == ""){
                document.getElementById("notice").innerHTML = "Password can not be blank.";
                document.getElementById("notice").style = "color: red;";
                return;
            }

            var data = {"username": username, "password": password};

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    document.getElementById("notice").innerHTML = "Success";
                    document.getElementById("notice").style = "color: green;";
                    window.location.href = "https://www.eigentrust.net/index.html";
                }else if(this.readyState == 4 && this.status == 409){
                    document.getElementById("notice").innerHTML = "Username is not available.";
                    document.getElementById("notice").style = "color: red;";
                }else if(this.readyState == 4){
                    document.getElementById("notice").innerHTML = "An unknown error occurred.";
                    document.getElementById("notice").style = "color: red;";
                }
            }
            xhttp.open("POST", "https://www.eigentrust.net:31415/register_user", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "text/plain");
            xhttp.send(JSON.stringify(data));
        }

        function addListeners(){
            var username = document.getElementById("username")
            var password = document.getElementById("password")
            var confirm = document.getElementById("confirm")

            function click(event){
                if(event.key === "Enter"){
                    event.preventDefault();
                    document.getElementById("register").click();
                }
            }

            username.addEventListener("keypress", click);
            password.addEventListener("keypress", click);
            confirm.addEventListener("keypress", click);
        }
    </script>
  </head>

  <body onload="javascript:addListeners();">
    <?php require("nav.php"); ?>
    <div class="container">
        <h1>Register</h1>
        <span id="notice"></span>
        <table>
        <tr>
            <td>Username:</td>
            <td><input id="username" type="text"></td>
        </tr>
        <tr>
            <td>Password:</td>
            <td><input id="password" type="password"></td>
        </tr>
        <tr>
            <td>Confirm:</td>
            <td><input id="confirm" type="password"></td>
        </tr>
        </table>
        <button style="margin:4px;" class="btn btn-primary" id="register" onclick="javascript:register()">Register</button>
    </div>
  </body>
</html>
