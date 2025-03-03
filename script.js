window.onload = () => {
    TimeZone();
    Weather();
    startPage();
    News();

}

const startPage = () => {
    const top = document.createElement("a");
    top.click();
}



const backgroundAudio = new Audio("./Audio/CloudsBack.mp3");
backgroundAudio.loop = true;
backgroundAudio.volume = 0.1;


const PlayText = document.getElementById("PlayText");




const stopAudio = () => {
    if (backgroundAudio.paused) {
        backgroundAudio.play();
        PlayText.innerHTML = "Pause"
    } else {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        PlayText.innerHTML = "Play"
    }
}


backgroundAudio.play();









// Contace Me PopUp
let popUp = 0;
const contactMe = document.getElementById("contactMe");
contactMe.addEventListener('click', () => {
    if (popUp === 0) {
        popUp++;

        const contactMePopUp = document.createElement("div");
        contactMePopUp.id = "contactMePopUp";

        const contactMeTitle = document.createElement("h2");
        contactMeTitle.innerHTML = "Contact Me";

        const contactMeForm = document.createElement("form");
        contactMeForm.id = "contactMeForm";

        const contactMeName = document.createElement("input");
        contactMeName.type = "text";
        contactMeName.placeholder = "Name";

        const contactMeEmail = document.createElement("input");
        contactMeEmail.type = "email";
        contactMeEmail.placeholder = "Email";

        const contactMeMessage = document.createElement("textarea");
        contactMeMessage.placeholder = "Message";



        const buttonsDiv = document.createElement("div");
        buttonsDiv.id = "buttonsDiv";

        const whatsAppButton = document.createElement("a");
        whatsAppButton.innerHTML = ` <i id="whatsAppIcon" class="fa-brands fa-whatsapp" style="color:rgb(32, 211, 19);"></i>`;
        whatsAppButton.addEventListener('click', () => {
            const message = encodeURIComponent(`Hi Im ${contactMeName.value}\nAnd My Email Is ${contactMeEmail.value}\nI Just Wanted To Say ${contactMeMessage.value}`);
            const url = `https://wa.me/972546215464?text=${message}`;
            window.open(url, '_blank');
        });


        const gmailButton = document.createElement("a");
        gmailButton.innerHTML = ` <i id="gmailIcon" class="fa-brands fa-google" style="color:rgb(219, 52, 52);"></i>`;

        gmailButton.addEventListener('click', () => {
            const message = encodeURIComponent(`Hi Im ${contactMeName.value}\nAnd My Email Is ${contactMeEmail.value}\nI Just Wanted To Say ${contactMeMessage.value}`);
            const url = `https://mail.google.com/mail/?view=cm&fs=1&to=tyossi91@gmail.com&su=${contactMeName.value}&body=${message}`;
            window.open(url, '_blank');
        });



        const exitPopUp = document.createElement("a");
        exitPopUp.innerHTML = "X";
        exitPopUp.id = "exitPopUp";
        exitPopUp.addEventListener('click', () => {
            popUp = 0;
            contactMePopUp.remove();
        });



        document.body.appendChild(contactMePopUp);

        contactMePopUp.appendChild(contactMeTitle);
        contactMePopUp.appendChild(contactMeForm);
        contactMePopUp.appendChild(exitPopUp);

        contactMeForm.appendChild(contactMeName);
        contactMeForm.appendChild(contactMeEmail);
        contactMeForm.appendChild(contactMeMessage);
        contactMeForm.appendChild(buttonsDiv);


        buttonsDiv.appendChild(whatsAppButton);
        buttonsDiv.appendChild(gmailButton);
    }
});




















const weatherWidget = document.getElementById("weather-widget");
const weatherWidgetTime = document.getElementById("time");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind");


let currentTimeZone = '';




//Weather API
const Weather = async () => {
    const request = fetch('https://api.open-meteo.com/v1/forecast?latitude=31.5&longitude=34.75&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m&hourly=relative_humidity_2m');
    const response = await request;
    const data = await response.json();
    let temperature = data.current.temperature_2m;
    let humiditySpecs = data.hourly.relative_humidity_2m[0];
    let wind = data.current.wind_speed_10m;



    currentTimeZone = "Tel Aviv";

    temp.innerHTML = `<span style='color:black; font-size: 15px'>${currentTimeZone}</span> <br> ${temperature}°C`;
    humidity.innerHTML = `humidity: ${humiditySpecs}%`;
    windSpeed.innerHTML = `wind: ${wind} km/h`;




}


//News API
const News = async () => {
    const url = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.ynet.co.il/Integration/StoryRss1854.xml';

    try {
        const response = await fetch(url);
        const data = await response.json();
        const newsIframe = document.getElementById('news-iframe');
        const newsFeed = data.items;

        // console.log('News:', data);


        let iframeContent = `
            <html>
            <head>
                <style>
   body {
    font-family: 'Georgia', serif;
    margin: 0;
    background-color: #f7f7f7;
    color: #333;
    text-align: center;
    overflow: hidden;
}
    body::-webkit-scrollbar {
    display: none;
}
.title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #2c3e50;
    border-bottom: 2px solid rgb(219, 52, 52);
    padding-bottom: 10px;
    width: 90%;
    margin: 0 auto;
}
.news-container {
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    padding-bottom: 20px;
}
.news-item {
direction: rtl;
    padding: 20px;
    border-bottom: 1px solid #ddd;
    transition: background-color 0.3s ease;
    background: linear-gradient(to bottom, #fff,rgb(169, 155, 155), #fff);
}
.news-item h3 {
    margin: 0 0 10px;
    font-size: 18px;
    color:rgb(3, 21, 40);
font-family: "Assistant", serif;
}
.news-item p {
    font-size: 14px;
    color: #7f8c8d;
    margin: 0 0 10px;
}
.news-item a {
    font-size: 14px;
    color:rgb(9, 36, 54);
    text-decoration: none;
    font-weight: bold;
}
.news-item a:hover {
    text-decoration: underline;
}

                </style>
                <script>
                    let scrollPosition = 0;
                    function autoScroll() {
                        scrollPosition += 1;
                        document.documentElement.scrollTop = scrollPosition;
                        document.body.scrollTop = scrollPosition;

                        if (scrollPosition >= document.body.scrollHeight) {
                            scrollPosition = 0; // Reset scroll to top
                        }

                        setTimeout(autoScroll, 50);
                    }
                    window.onload = autoScroll;
                </script>
            </head>
            <body>
                <div class="title">
                <img src="./Images/YNET-LOGO-2.png" alt="ynet logo" style="width: 180px; height: 100px;">
                </div>
                <div class="news-container">
        `;





        newsFeed.forEach(item => {
            iframeContent += `
            <div class="news-item">
            <h3><img src="./Images/ynetS.png" alt="ynet logo" style="width: 20px; height: 20px; style= "border-radius: 50%;">
            ${item.title}</h3>
            <p style="color:rgb(3, 21, 40); font-family: 'Arial', sans-serif;">${item.pubDate.slice(11, 16)}</p>
            <br>
            <a href="${item.link}" target="_blank">לפרטים נוספים</a>
            <hr>
                </div>
            `;
        });

        iframeContent += `
                </div>
            </body>
            </html>
        `;

        const iframeDocument = newsIframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(iframeContent);
        iframeDocument.close();
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

News();













//TimeZone API
const TimeZone = async () => {

    const request = fetch('https://worldtimeapi.org/api/timezone/Asia/Tel_Aviv');

    const response = await request;
    const data = await response.json();
    currentTimeZone = data.timezone;
    console.log('TimeZone:', data);

    let day = data.day_of_week;
    let date = `${data.datetime.slice(8, 10)}.${data.datetime.slice(5, 7)}.${data.datetime.slice(0, 4)}`;

    let currentTime = '';

    const updateClock = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0'); // שעות
        const minutes = now.getMinutes().toString().padStart(2, '0'); // דקות
        const seconds = now.getSeconds().toString().padStart(2, '0'); // שניות

        currentTime =
            `<span style='font-size: 20px; color: rgb(231, 231, 155); text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);'>
        ${hours}:${minutes}:${seconds}
         </span>`;


        weatherWidgetTime.innerHTML = `${day}, ${date} <br> ${currentTime}`;

    };

    updateClock();

    setInterval(updateClock, 1000);







    if (day === 2) {
        day = "Tuesday";
    } else if (day === 3) {
        day = "Wednesday";
    } else if (day === 4) {
        day = "Thursday";
    } else if (day === 5) {
        day = "Friday";
    } else if (day === 6) {
        day = "Saturday";
    } else if (day === 0) {
        day = "Sunday";
    } else if (day === 1) {
        day = "Monday";
    }

    weatherWidgetTime.innerHTML = `${day}, ${date} <br> ${currentTime}`;


    return currentTimeZone;

}






//Gallery Area

const galleryDiv = document.getElementById("gallery");
let count = 0;


const galleryIconPage = (project) => {

    if (project !== '') {
        count++;
        const linkToProject = document.createElement("a");
        linkToProject.style.textDecoration = 'none';
        linkToProject.href = `./projects/${project}/direct-${project}.html`;
        const projectDiv = document.createElement("div");
        projectDiv.className = 'project';
        const h3 = document.createElement("h3");
        h3.innerHTML = `Project No. ${count} `;
        projectDiv.innerHTML = `<img src = "./projects/${project}/images/${project}.png" alt = "${project}"> `;
        galleryDiv.appendChild(linkToProject);
        linkToProject.appendChild(projectDiv);
        projectDiv.appendChild(h3);

    }

}


galleryIconPage('advice');
galleryIconPage('coffee');
galleryIconPage('discover');
galleryIconPage('forward');
galleryIconPage('here-now');
galleryIconPage('let-us');


const link = () => {
    const linkToProject = document.createElement("a");
    linkToProject.href = './projects/myprojects.html';
    linkToProject.click();
}


if (count >= 6) {
    const moreGallery = document.createElement("div");
    moreGallery.id = "moreGallery";
    moreGallery.addEventListener('click', link);
    moreGallery.innerHTML = "Click Here For More Projects";
    galleryDiv.appendChild(moreGallery);
}





//Games Area

const gamesDiv = document.getElementById("games");

const gamesTitle = document.createElement("h2");
gamesTitle.innerHTML = "Javascript Projects";
gamesTitle.addEventListener('click', () => {
    window.location.href = './games/MyGames.html';
});
gamesTitle.style.cursor = "pointer";
gamesTitle.addEventListener('mouseover', () => {
    gamesTitle.style.transform = "scale(1.1)";
    gamesTitle.style.transition = "transform 0.3s ease-in-out";
});
gamesTitle.addEventListener('mouseout', () => {
    gamesTitle.style.transform = "scale(1)";
});
gamesTitle.style.marginTop = "5%";
gamesDiv.appendChild(gamesTitle);


const gameContainer = document.createElement("div");
gameContainer.className = 'game-container';
gamesDiv.appendChild(gameContainer);

const createGameCard = (source, title) => {
    const gameCard = document.createElement("div");
    gameCard.className = 'game';
    gameContainer.appendChild(gameCard);

    const gameImage = document.createElement("img");
    gameImage.src = `./games/${source}/images/${source}.png`;
    gameImage.alt = `${source}`;
    gameCard.appendChild(gameImage);

    const gamesTitle = document.createElement("h3");
    gamesTitle.innerHTML = title;
    gameCard.appendChild(gamesTitle);

    const gameButton = document.createElement("button");
    gameButton.innerHTML = "Play Now";
    gameButton.className = 'play-button';
    gameButton.addEventListener('click', () => {
        window.location.href = `./games/${source}/direct-${source}.html`;
    })
    gameCard.appendChild(gameButton);
}

createGameCard('memoryGame', 'Memory Game');
createGameCard('screenBuilder', 'Screen Builder');
createGameCard('MathTrivia', 'Math Trivia');
createGameCard('MixDrix', 'MixDrix');
createGameCard('countriesFlags', 'Countries Flags');
createGameCard('UsersMamagement', 'Users Mamagement');


const moreJavaProjects = document.createElement("a");
moreJavaProjects.id = "moreJavaProjects";
moreJavaProjects.href = './games/MyGames.html';
moreJavaProjects.innerHTML = "More Projects";
moreJavaProjects.style.cursor = "pointer";
moreJavaProjects.addEventListener('mouseover', () => {
    moreJavaProjects.style.transform = "scale(1.1)";
    moreJavaProjects.style.transition = "transform 0.3s ease-in-out";
});
moreJavaProjects.addEventListener('mouseout', () => {
    moreJavaProjects.style.transform = "scale(1)";
});
gamesDiv.appendChild(moreJavaProjects);





