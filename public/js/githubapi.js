var userInfoDisplay = document.querySelector('.userInfoDisplay'),
 signInForm = document.querySelector('.signin-form');
var gitHubUserID = '';

var accessGitHub = function(responseText) {
//    var responseObj = JSON.parse(this.responseText);
    console.log('Github LOGIN: ', responseText);
    var githubDisplayText = '';
    var repoList = document.createElement('ul');
    userInfoDisplay.appendChild(repoList);
    for(var i=0;i<responseText.length;i++) {
        console.log(i+": "+responseText[i].name);
        githubDisplayText += '\n * '+responseText[i].name;
        var repoLine = document.createElement('li'); //create gh repo list on page
        var repoAnchor = document.createElement('a');

       // repoAnchor.
        repoLine.textContent = responseText[i].name;
        repoList.appendChild(repoLine);
    }
};

var showUserInfo = function() {
    userInfoDisplay.classList.remove('hidden');
    signInForm.classList.add('hidden');
};



       document.getElementById("github-namefield").addEventListener("keyup", function(event) {
          event.preventDefault();
          if (event.keyCode === 13) {
              document.getElementById("github-namefield-submit").click();
          }
      });
      document.getElementById('github-namefield-form').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('SUBMITTED');
        
          gitHubUserID = document.getElementById('github-namefield').value;
          console.log('gitHubUserID: ' + gitHubUserID);
          
          var request = fetch('https://api.github.com/users/'+gitHubUserID+'/repos') ;
          // new XMLHttpRequest();
          request.then(function(ghdata){ return ghdata.json(); })
          .then(function(parseddata){ accessGitHub(parseddata)})
          .then(showUserInfo());
        //   request.onload = accessGitHub;
          console.log('Github: https://api.github.com/users/'+gitHubUserID+'/repos');
           
        //   request.open('get', 'https://api.github.com/users/'+gitHubUserID+'/repos', true);
        //   request.onerror = function(){
            //  console.log('The given gitHubUserID ('+gitHubUserID+') is not valid.');
          });
        //   request.send();      });  