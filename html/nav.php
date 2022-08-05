<nav class="navbar navbar-expand-sm bg-light navbar-light">
    <div class="container-fluid">
        <a class="navbar-brand">
            <img src="images/logo.png" alt="ETN Logo" style="width:40px;" class="rounded-pill">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <?php
                    if(isset($_COOKIE["username"])){
                        echo '
                <li class="nav-item">
                    <a class="nav-link" href="/account.php">Account</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout.html">Logout</a>
                </li>';
                    }else{
                        echo '
                <li class="nav-item">
                    <a class="nav-link" href="/login.php">Login</a>
                </li>';
                    }
                ?>
            </ul>
        </div>
    </div>
</nav>
