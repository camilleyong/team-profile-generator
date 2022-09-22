function createCard (data, lastLine) {
    console.log(data);
    return ` 
    <div id="employeeCard" class ="employee">
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${data.getName()}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${data.getRole()}</h6>
          <ul>
          <li>ID: ${data.getId()}</li>
          <li><a href="mailto:${data.getEmail()}" class="card-link">${data.getEmail()}</a></li>
          ${lastLine}
          </ul>
        </div>
      </div>
    </div>
    `
}

function generateManagerCard(data){
    const lastLine = `<li>Office Number: ${data.getOfficeNumber()}</li>`
    return createCard(data, lastLine);
} 

// add section about the engineer's Github username
function generateEngineerCard(data){
    const lastLine = `<li>GitHub Username: <a href="https://github.com/${data.getGitHub()}">${data.getGitHub()}</a></li>`
    return createCard(data, lastLine);
} 

// add section about the intern's school
function generateInternCard(data){
    const lastLine = `<li>School: ${data.getSchool()}</li>`
    return createCard(data, lastLine);
} 

// export all three functions
module.exports = {generateManagerCard, generateEngineerCard, generateInternCard};