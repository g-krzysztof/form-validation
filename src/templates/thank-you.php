<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Time4 task</title>
</head>

<?php session_start();
$filepath = "images/pix.jpg";
if(isset($_FILES["logo"]["name"]))
{
    $filepath = "images/" . $_FILES["logo"]["name"];
    if(!move_uploaded_file($_FILES["logo"]["tmp_name"], $filepath))
    {
        $_SESSION['imageError'] = 'Please provide logo for you quiz [BE error]';
    }
}

$currencyNumber = str_replace("£ ","", $_POST["currency"]);
if($currencyNumber < 5){
    $_SESSION['currencyError'] = 'Your entry fee (' . $_POST["currency"] . ') is too low [BE error]';
}

if(isset($_SESSION['imageError']) || isset($_SESSION['currencyError']) ){
    header("Location: /");
    exit;
}

?>

<body style="height: 100vh; width: 100vw">

<div class="Page__wrapper">
    <div class="Page__formWrapper">
        <div class="Form__wrapper ThankYou__wrapper">
            <div class="ThankYou__mainTitle">
                Quiz created, thank you!
            </div>
            <div class="ThankYou__contentWrapper">
                <div class="ThankYou__logoSection">
                    <div class="ThankYou__imageWrapper">
                        <?php echo "<img src=".$filepath." />" ?>
                    </div>
                    <div class="ThankYou__infoWrapper">
                        <div class="ThankYou__quizTitle">
                            <?php echo $_POST["title"] ?>
                        </div>
                        <div class="ThankYou__feeWrapper">
                            <span class="ThankYou__feeName">Entry fee: </span>
                            <span class="ThankYou__feeValue"> <?php echo $_POST["currency"] ?></span>
                        </div>
                    </div>
                </div>
                <div class="ThankYou__categorySection">
                    <span class="ThankYou__categoryName">Quiz category: <span class="ThankYou__strong"> <?php echo $_POST["category"] ?> </span></span>
                </div>
            </div>
            <div class="Form__proceedBtnWrapper" style="margin: 65px 0 0 0">
                <a href="/" style="text-decoration: none">
                    <button type="button" class="Form__proceedBtn" style="width: 305px;">Create another one!</button>
                </a>
            </div>
        </div>

    </div>
</div>

</body>

</html>


