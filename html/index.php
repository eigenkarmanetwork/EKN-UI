<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
        $PAGE_TITLE = "Home";
        require("head.php")
    ?>
  </head>
  <body>
    <?php require("nav.php"); ?>
    <div class="container">
        <h1>Welcome to the EigenTrust Network</h1>
        <p>Trust is powerful. Knowing who is capable, value aligned, or has done good work in the past is extremely valuable for all sorts of decisions, but currently it takes lots of effort to collect this information. Imagine if you could leverage your trust network's collective knowledge to get a read of hundreds or thousands of times as many people, with minimal effort!</p>
        <p>That is what EigenTrust Network is creating. We use an algorithm similar to Google's PageRank to model trust propagation, setting the subjective source of all trust to each individual. So that from your personal view of the network you can see how much of your trust has flowed to anyone else.</p>

        <p>We think this tool can empower humanity in many ways, and are particularly excited about its applications in grantmaking in the field our team is focused on; AI alignment.</p>
        <?php
            $ch = curl_init("https://www.eigentrust.net:31415/get_total_users");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $total_users = curl_exec($ch);
            curl_close($ch);

            $ch = curl_init("https://www.eigentrust.net:31415/get_total_real_users");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $total_real_users = curl_exec($ch);
            curl_close($ch);

            $ch = curl_init("https://www.eigentrust.net:31415/get_total_temp_users");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $total_temp_users = curl_exec($ch);
            curl_close($ch);

            $ch = curl_init("https://www.eigentrust.net:31415/get_total_votes");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $total_votes = curl_exec($ch);
            curl_close($ch);
        ?>
        <div class="alert alert-success" style="text-align: center;">
            <strong>Current Users in the ETN: </strong> <?php echo $total_users; ?>
            (<?php echo $total_real_users; ?> real, <?php echo $total_temp_users; ?> temporary)
            <strong>Current Votes in the ETN: </strong> <?php echo $total_votes; ?>
        </div>
    </div>
  </body>
</html>
