<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
        $PAGE_TITLE = "Account";
        require("head.php");
    ?>
    <style>
        .container {
            text-align: center;
        }
    </style>
    <script src="js/verify_credentials.js"></script>
    <script>
        function addInfo(){
            var username = getCookie("username");
            document.getElementById("welcome").innerHTML = "Welcome " + username;
        }
    </script>
  </head>

  <body onload="javascript:addInfo();">
    <?php require("nav.php"); ?>
    <div class="container">
        <h1 id="welcome">Welcome</h1>
        <h4>Trust</h4>
        <button class="btn btn-secondary" onclick="javascript:document.location.href='view_user.html';">View User</button><br>
        <br>
        <button class="btn btn-secondary" onclick="javascript:document.location.href='trust_user.html';">Trust User</button>
        <h4>Settings</h4>
        <button class="btn btn-danger" onclick="javascript:document.location.href='security.html';">Security Level</button>
        <h4>GDPR</h4>
        <button class="btn btn-secondary" onclick="javascript:document.location.href='gdpr_view.html';">Get All Data About Me</button>
    </div>
  </body>
</html>
