let count = 0;

const main = document.getElementById('main');

const projectsContainer = document.createElement("div");
projectsContainer.id = "projects-container";
projectsContainer.className = "projects-container";

main.appendChild(projectsContainer);

const createProjectCard = (source, title) => {
    count++;
    const imagePath = `./${source}/images/${source}.png`;

    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    const projectImage = document.createElement("img");
    projectImage.className = "project-image";
    projectImage.src = imagePath;

    const projectTitle = document.createElement("h2");
    projectTitle.className = "project-title";
    projectTitle.innerText = `${title}`;

    const link = document.createElement("a");
    link.href = `./${source}/direct-${source}.html`;
    link.style.textDecoration = "none";
    link.appendChild(projectCard);

    projectCard.appendChild(projectImage);
    projectCard.appendChild(projectTitle);

    projectsContainer.appendChild(link);
};

createProjectCard('memoryGame', 'Memory Game');
createProjectCard('screenBuilder', 'Screen Builder');
createProjectCard('MathTrivia', 'Math Trivia');
createProjectCard('MixDrix', 'Tic Tac Toe');
createProjectCard('countriesFlags', 'Countries Flags');
createProjectCard('UsersMamagement', 'Users Mamagement');
createProjectCard('PasswordGenerator', 'Password Generator');
createProjectCard('WeatherApp', 'Weather App');
createProjectCard('Pong', 'Classic Pong');



