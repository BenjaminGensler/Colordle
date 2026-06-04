<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weather App</title>
        <link rel="stylesheet" href="css/indexStylesheet.css">
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class = "bodywrap">
            <main>
                <div class = "container">
                    <div class = "content">
                        <!-- Insert header -->
                        <?php require __DIR__ . '/header_footer/header.php'; ?>

                        <div class = "secondaryBox">
                            <div class = "secondaryBoxHeader">
                                <h1 id = "spotlight">Spotlight</h2>
                            </div>
                            <div class = "secondaryBoxContent">
                                <a href="Colordle/index.php">
                                    <div class = "mediaBox">
                                        <!-- <img class = "mediaImage" src = "media/pixelateImage.png"> -->
                                        <h3 class = "mediaName">Colordle</h3>
                                        <p class = "mediaDesc">A color guessing game where you try to guess the correct color combination.</p>
                                    </div>
                                </a>
                                <a href="wordMaster/index.php">
                                    <div class = "mediaBox">
                                        <!-- <img class = "mediaImage" src = "media/weatherApp.png"> -->
                                        <h3 class = "mediaName">WordMaster</h3>
                                        <p class = "mediaDesc">A word guessing game where you try to guess the correct word combination.</p>
                                    </div>
                                </a>
                                <!-- <a href="DailyArt/dailyArt.html">
                                    <div class = "mediaBox">
                                        <img class = "mediaImage" src = "media/dailyArt.png">
                                        <h3 class = "mediaName">Daily Art</h3>
                                        <p class = "mediaDesc">Find new art work every day with the click of a button</p>
                                    </div>
                                </a> -->
                            </div>
                        </div>

                        <!-- Insert footer -->
                        <?php require __DIR__ . '/../header_footer/footer.php'; ?>
                    </div>
                </div>
            </main>
        </div>
    </body>
</html>