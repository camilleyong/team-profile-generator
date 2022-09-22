const employee = require('./lib/employee.js');
const manager = require('./lib/manager.js');
const intern = require('./lib/intern.js');
const engineer = require('./lib/engineer.js');
const inquirer = require('inquirer');
const fs = require('fs');
const cards = require('./dist/createhtml.js');

let cardBody = ``;


const generalQuestions = [
    {
        type: "input",
        message: "Whats is the person's name?",
        name: "name",
    },
    {
        type: "input",
        message: "Whats is the person's ID number?",
        name: "id",
    },
    {
        type: "input",
        message: "Whats is the person's email?",
        name: "email",
    },
]

const managerPrompt = ([
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your office number?',
    }    
    ])

const engineerPrompt = [
    {
        type: "input",
        message: "What is the person's GitHub username?",
        name: "githubUsername",
}]

const internPrompt = [
    {
        type: "input",
        message: "What school did this person go to?",
        name: "school",
}]

// start with the manager prompt
function start () {
    console.log("Please enter the manager's information.")
    const managerQuestions = generalQuestions.concat(managerPrompt);

    inquirer.prompt (managerQuestions)
        .then((reponse) => {
        
            const oldManager = new manager (
                reponse.name,
                reponse.id,
                reponse.email,
                reponse.officeNumber)
            
            const generateCard = cards.generateManagerCard(oldManager);
            cardBody += generateCard;

            additionalEmployee();
            
        })}
// if they want to add another employee
function additionalEmployee () {
    inquirer.prompt ({
        type: "list",
        message: "Would you like to add another employyee to the team?",
        name: "newEmployee",
        choices: ["Yes" , "No"],
    })
        .then((response) => {
            if (response.newEmployee === "Yes") {
                engineerOrIntern();
            } else {
                newCard();
            }
        });
}

// either engineer or intern prompt
function engineerOrIntern(){
    inquirer
    .prompt({
        type: "list",
        message: "Are they an engineer or an intern?",
        name: "engineeorintern",
        choices: ["Engineer", "Intern"],
    })
    .then((response) => {
        if (response.engineeorintern === "Engineer"){
            engineerCard();
        } else{
            internCard();
        }
    });
}

// make engineer card
function engineerCard () {
    const engineerQuestions = generalQuestions.concat(engineerPrompt);

    inquirer.prompt (engineerQuestions)
        .then ((response) => {
            const oldEngineer = new engineer (
                response.name,
                response.id,
                response.email,
                response.githubUsername,
                );
            const generateCard = cards.generateEngineerCard(oldEngineer);
            cardBody += generateCard;

            additionalEmployee();
        })
}

// make intern card
function internCard () {
    const internQuestions = generalQuestions.concat(internPrompt);

    inquirer.prompt (internQuestions)
        .then ((response) => {
            const oldIntern = new intern (
                response.name,
                response.id,
                response.email,
                response.school
                );
            const generateCard = cards.generateInternCard(oldIntern);
            cardBody += generateCard;

            additionalEmployee();
        })
}

// Display the skeleton of the HTML
function newCard () {
    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/4cfe228376.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./style.css"/>
    <title>Team Profile Generator</title>
</head>

<body>
    <header id="myTeam" class="team-title">
        <h1>My Team</h1>
    </header>

    <div class="team-container">
         ${cardBody}
        </div>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
</body>
</html>
    `
    fs.writeFile('./dist/index.html' , html, (err) =>
        err ? console.log(err) : console.log("You have made a new employee card!")
    );

    addCss();
}

// add css to the cards when deployed
function addCss () {
    const css = `
    * {
    margin: 0%;
    padding: 0%;
}

body {
    background-color:slategrey;
}

.team-title {
        background-color: cornflowerblue;
        font-size: 40px;
        text-align: center;
        height: 60px;
        color: white;
        padding: 2px;
        box-shadow: 5px 10px black;
    }

.card {
        box-shadow: 5px 10px black;
        margin: 20px;
        display: flex;
        align-content: center;
    }

    `
    fs.writeFile('./dist/style.css' , css, (err) =>
        err ? console.log(err) : console.log("You added CSS to the employee card!")
    );
}

start();