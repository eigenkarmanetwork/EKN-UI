<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
        $PAGE_TITLE = "Trust User";
        require("head.php");
    ?>
    <style>
        .container {
            text-align: center;
        }
        table {
            margin-left: auto;
            margin-right: auto;
            border-collapse: collapse;
        }
        table td, table th{
            border: solid 1px #000;
            word-wrap: break-word;
        }
    </style>
    <script src="js/verify_credentials.js"></script>
    <script>
        function addInfo(){
            var output = document.getElementById("output");
            var username = getCookie("username");
            var password = document.getElementById("pass").value;
            var to = document.getElementById("to").value;

            var data = {"to": to, "from": username, "password": password};

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    output.innerHTML = "You have voted for " + to + ".";
                }else if(this.readyState == 4 && this.status == 403){
                    output.innerHTML = "Password is incorrect.";
                }else if(this.readyState == 4 && this.status == 404){
                    output.innerHTML = "The username you tried to vote for does not exist.";
                }else if(this.readyState == 4 && this.status == 400){
                    output.innerHTML = "You cannot vote for yourself.";
                }else if(this.readyState == 4){
                    output.innerHTML = "An unknown error occured.";
                }
            }
            xhttp.open("POST", "http://www.eigentrust.net/api/vote.php", false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "text/plain");
            xhttp.send(JSON.stringify(data));
        }

        function addListeners(){
            var to = document.getElementById("to")
            var password = document.getElementById("pass")

            function click(event){
                if(event.key === "Enter"){
                    event.preventDefault();
                    document.getElementById("submit").click();
                }
            }

            to.addEventListener("keypress", click);
            password.addEventListener("keypress", click);
        }

    </script>
  </head>

  <body onload="javascript:addListeners();">
    <?php require("nav.php"); ?>
    <div class="container">
        <h1>Trust User</h1>
        <br>
        Please enter an ETN username:<br>
        <input type="text" id="to"><br>
        Please enter your password:<br>
        <input type="password" id="pass"><br>
        <button style="margin:5px;" class="btn btn-primary" id="submit" onclick="javascript:addInfo();">Trust User</button>
        <p id="output"></p>
    </div>
  </body>
</html>
