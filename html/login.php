<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
        $PAGE_TITLE = "Login";
        require("head.php")
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
        function login(){
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var data = {"username": username, "password": password};

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    document.getElementById("notice").innerHTML = "Success";
                    document.getElementById("notice").style = "color: green;";
                    var data = JSON.parse(this.responseText);
                    document.cookie = "username=" + username +";path=/";
                    document.cookie = "key=" + data["password"] +";path=/";
                    document.cookie = "type=" + data["password_type"] +";path=/";
                    document.cookie = "expires=" + data["expires"] +";path=/";
                    window.location.href = "http://www.eigentrust.net/account.php";
                }else if(this.readyState == 4 && this.status == 403){
                    document.getElementById("notice").innerHTML = "Username or Password is incorrect.";
                    document.getElementById("notice").style = "color: red;";
                }else if(this.readyState == 4){
                    document.getElementById("notice").innerHTML = "An unknown error occurred.";
                    document.getElementById("notice").style = "color: red;";
                }
            }
            xhttp.open("POST", "http://www.eigentrust.net:31415/verify_credentials", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "text/plain");
            xhttp.send(JSON.stringify(data));
        }

        function addListeners(){
            var username = document.getElementById("username")
            var password = document.getElementById("password")

            function click(event){
                if(event.key === "Enter"){
                    event.preventDefault();
                    document.getElementById("login").click();
                }
            }

            username.addEventListener("keypress", click);
            password.addEventListener("keypress", click);
        }
    </script>
  </head>
  <body onload="javascript:addListeners();">
    <?php require("nav.php"); ?>
    <div class="container">
        <h1>Login</h1>
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
        </table>
        <button class="btn btn-primary" id="login" onclick="javascript:login()">Login</button>
        <br>
        <a href="register.html">Register</a>
    </div>
  </body>
</html>
