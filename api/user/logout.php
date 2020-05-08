<?php
    
    setcookie("freelancing"," ", time() - 3600, "/");
    setcookie("PHPSESSID"," ", time() - 3600, "/");
    session_destroy();
    http_response_code(200);
?>