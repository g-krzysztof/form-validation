<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Validation form</title>
</head>
<body>
<div>
    <?php

    echo $_POST["title"];
    echo $_POST["category"];
    echo $_POST["currency"];

    session_start();

    if(isset($_FILES["logo"]["name"]))
    {
        $filepath = "images/" . $_FILES["logo"]["name"];

        if(move_uploaded_file($_FILES["logo"]["tmp_name"], $filepath))
        {
            echo "<img src=".$filepath." height=150 width=150 />";
        }
        else
        {
            $_SESSION['imageError'] = 'Please provide logo for you quiz [BE error]';
            header("Location: /");
            exit;
        }
    }

    ?>
</div>

<div><a href="/">link</a></div>
</body>
</html>


