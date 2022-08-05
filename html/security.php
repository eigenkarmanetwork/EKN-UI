<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
        $PAGE_TITLE = "Change Security Level";
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
            var security = document.getElementById("security").value;

            var data = {"security": security, "username": username, "password": password};

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    output.innerHTML = "Success.";
                }else if(this.readyState == 4 && this.status == 403){
                    output.innerHTML = "Password is incorrect.";
                }else if(this.readyState == 4){
                    output.innerHTML = "An unknown error occured.";
                }
            }
            xhttp.open("POST", "http://www.eigentrust.net:31415/change_security", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "text/plain");
            xhttp.send(JSON.stringify(data));
        }

        function addListeners(){
            var password = document.getElementById("pass")

            function click(event){
                if(event.key === "Enter"){
                    event.preventDefault();
                    document.getElementById("submit").click();
                }
            }

            password.addEventListener("keypress", click);
        }

    </script>
  </head>

  <body onload="javascript:addListeners();">
    <?php require("nav.php"); ?>
    <div class="container">
        <h1>Change Security Level</h1>
        <p>
            There are three security settings with ETN.  The lowest security setting rquires you to sign in to make a new connection.  The medium security setting requires you to sign in once a day to be able to vote.  The higest security setting requires you to sign in every time you want to vote.
        </p>
        <br>
        Please select your prefered security setting:<br>
        <select id="security">
            <option value="0">Lowest</option>
            <option value="1">Medium</option>
            <option value="2">Highest</option>
        </select>
        <br>
        Please enter your password:<br>
        <input type="password" id="pass"><br>
        <button style="margin:5px;" class="btn btn-danger" id="submit" onclick="javascript:addInfo();">Confirm</button>
        <p id="output"></p>
    </div>
  </body>
</html>
