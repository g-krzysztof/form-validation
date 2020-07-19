<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Time4 task</title>
</head>

<body style="height: 100vh; width: 100vw">
<div id="root" style="height: 100%; width: 100%"></div>
<script>
    window.errors = {
        image: `
        <?php
        session_start();
        if (isset($_SESSION['imageError'])) {
            echo $_SESSION['imageError'];
            unset($_SESSION['imageError']);
        }
        ?>`,
        currency: `
        <?php
        if (isset($_SESSION['currencyError'])) {
            echo $_SESSION['currencyError'];
            unset($_SESSION['currencyError']);
        }
        ?>
        `,
        imageType: `
        <?php
        if (isset($_SESSION['imageTypeError'])) {
            echo $_SESSION['imageTypeError'];
            unset($_SESSION['imageTypeError']);
        }
        ?>
        `,
        title: `
        <?php
        if (isset($_SESSION['titleError'])) {
            echo $_SESSION['titleError'];
            unset($_SESSION['titleError']);
        }
        ?>
        `,
        category: `
        <?php
        if (isset($_SESSION['categoryError'])) {
            echo $_SESSION['categoryError'];
            unset($_SESSION['categoryError']);
        }
        ?>
        `
    }
    console.log(window.errors.image, window.errors.currency, window.errors.title, window.errors.category)
    console.log(window.errors.imageType)
</script>
</body>

</html>
