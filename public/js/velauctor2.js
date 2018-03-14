
var signInOuts = document.querySelectorAll('.dom-sign-in'),
statuses = document.querySelectorAll('.dom-sign-in-status');
var clockBox = document.querySelector('.clock'); 
var loginPage = document.getElementById('login-page'),
onboardingPage = document.getElementById('onboarding-page'),
homePage = document.getElementById('home-page');
var githubDisplay = document.querySelector('.githubDisplay'),
trelloDisplay = document.querySelector('.trelloDisplay');
var googleDisplayName = 'User';

var getImage = function getImage() {
    var imageUrl;
    var getPromise = fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A//api.flickr.com/services/feeds/photos_public.gne%3Fid%3D160069044@N05%26lang%3Den-us%26format%3Drss_200');
    getPromise
      .then(function(gotStuff) {
        return gotStuff.json();
      })
      .then(function(parsedStuff) {
        return parsedStuff.items;
      })
      .then(function(itemList) {
        var randomNum = Math.floor(Math.random() * itemList.length);
        imageUrl = itemList[randomNum].enclosure.link;
        var $bg = $('.background');
        var gradientString = 'linear-gradient(rgba(125,100,150,0.5) 0%,rgba(10,5,15,0.5) 100%), '
        $bg.css('background-image', gradientString+'url('+imageUrl+')');
      });
    };
  
  getImage();


// github info 
var accessGitHub = function(responseText) {
   var responseObj = JSON.parse(this.responseText);
  // console.log(responseObj.name + " has " + responseObj.public_repos + " public Github repositories!");
    console.log('Github LOGIN: '+ responseText);
    var githubDisplayText = '';
    var repoList = document.createElement('ul');
    githubDisplay.appendChild(repoList);
    for(var i=0;i<responseObj.length;i++) {
        console.log(i+": "+responseObj[i].name);
        githubDisplayText += '\n * '+responseObj[i].name;
        var repoLine = document.createElement('li'); //create repo list on page
        var repoAnchor = document.createElement('a');
        repoLine.textContent = responseObj[i].name;
        repoList.appendChild(repoLine);
    }
    activateHomePage();       
}
var gitHubUserID = '';


// Function called when clicking the Login/Logout button.
// [START buttoncallback]
function toggleSignIn() {
   if (!firebase.auth().currentUser) {
       // [START createprovider]
       var provider = new firebase.auth.GoogleAuthProvider();
       // [END createprovider]
       // [START addscopes]
       provider.addScope('https://www.googleapis.com/auth/plus.login');
       // [END addscopes]
       // [START signin]
       firebase.auth().signInWithRedirect(provider);

       [].forEach.call(signInOuts, function(signInOut) {
           signInOut.disabled = false;
       });
       // [END signin]
   } else {
       // [START signout]
       
       firebase.auth().signOut().then(function(){location.reload();});
       // [END signout]
   [].forEach.call(signInOuts, function(signInOut) {
           signInOut.disabled = true;
       });
   }
}

var activateHomePage = function(){
  homePage.style.display = 'block';
  loginPage.style.display = 'none';
  onboardingPage.style.display = 'none';
},
  activateOnboardingPage = function() {
    onboardingPage.style.display = 'block';
    loginPage.style.display = 'none';
    homePage.style.display = 'none';
}
// [END buttoncallback]
/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
*    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
*/
function initApp() {
   // Result from Redirect auth flow.
   // [START getidptoken]
   firebase.auth().getRedirectResult().then(function(result) {
       if (result.credential) {
           // This gives you a Google Access Token. You can use it to access the Google API.
           var token = result.credential.accessToken;

           console.log('OAuth token: ' + token);
       } else {
           console.log('No OAuth token');;
           // [END_EXCLUDE]
       }
       // The signed-in user info.
       var user = result.user;
   }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // The email of the user's account used.
       var email = error.email;
       // The firebase.auth.AuthCredential type that was used.
       var credential = error.credential;
       if (errorCode === 'auth/account-exists-with-different-credential') {
           alert('You have already signed up with a different auth provider for that email.');
           // If you are using multiple auth providers on your app you should handle linking
           // the user's accounts here.
       } else {
           console.error(error);
       }
   });
   // [END getidptoken]
   // Listening for auth state changes.
   // [START authstatelistener]
   firebase.auth().onAuthStateChanged(function(user) {
       if (user) {         // *******************   User is signed in.
           googleDisplayName = user.displayName,
           googleLogin = user.login, 
           googleEmail = user.email;
           var emailVerified = user.emailVerified;
           var photoURL = user.photoURL;
           var isAnonymous = user.isAnonymous;
           var uid = user.uid;
           var providerData = user.providerData;

           [].forEach.call(statuses, function(status) {
               status.textContent = 'Signed in';
           });


           [].forEach.call(signInOuts, function(signInOut) {
               signInOut.textContent = 'Sign out';
           });
           
            // Turn on the proper page
            if(googleEmail === 'kbooth1000@gmail.com') {  // TEST WITH MY OWN GMAIL ACCOUNT (kbooth1000)
              activateHomePage();
            } else //if(googleEmail === 'kjbooth1000@gmail.com') {
            { 
                activateOnboardingPage();
            }
       } else {        // *******************  User is signed out.
           [].forEach.call(statuses, function(status) {
               status.textContent = 'Signed out';
           });

           [].forEach.call(signInOuts, function(signInOut) {
               signInOut.textContent = 'Sign in with Google';
           });

           [].forEach.call(signInOuts, function(signInOut) {
               signInOut.disabled = false;
           });
       };
       // [END authstatelistener]
       [].forEach.call(signInOuts, function(signInOut) { // watches the signin/out button one each page
           signInOut.addEventListener('click', toggleSignIn, false);
       });
       document.getElementById('skip-setup').addEventListener('click', function(){ activateHomePage() ;console.log('Activate Home Page---------------'); });//

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
          
          var request = new XMLHttpRequest();
          request.onload = accessGitHub;
          console.log('Github: https://api.github.com/users/'+gitHubUserID+'/repos');
          
          request.open('get', 'https://api.github.com/users/'+gitHubUserID+'/repos', true);
          request.onerror = function(){
             console.log('The given gitHubUserID ('+gitHubUserID+') is not valid.');
          }
          request.send();      });
   });
}
   window.onload = function() {
       initApp();
   };