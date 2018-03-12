  var signInOuts = document.querySelectorAll('.dom-sign-in'),
  statuses = document.querySelectorAll('.dom-sign-in-status');
 var clockBox = document.querySelector('.clock'); 
 var loginPage = document.getElementById('login-page'),
 onboardingPage = document.getElementById('onboarding-page'),
 homePage = document.getElementById('home-page');
 var githubDisplay = document.querySelector('.githubDisplay'),
 trelloDisplay = document.querySelector('.trelloDisplay');
 function clock() {// We create a new Date object and assign it to a variable called "theTime".
     var time = new Date(),
         
         // Access the "getHours" method on the Date object with the dot accessor.
         hours = time.getHours(),
         minutes = time.getMinutes(),
         seconds = time.getSeconds();

         clockBox.textContent = theTime(hours) + ":" + theTime(minutes) + ":" + theTime(seconds);
     
     function theTime(standIn) {
         if (standIn < 10) {
         standIn = '0' + standIn
         }
         return standIn;
     }
 }
 setInterval(clock, 1000);


// github info 
var accessGitHub = function() {
     var responseObj = JSON.parse(this.responseText);
    // console.log(responseObj.name + " has " + responseObj.public_repos + " public Github repositories!");
     
         //console.log('Github LOGIN: '+ responseObj.login);
         // for(var obj in responseObj) {
         //     console.log(obj+": "+responseObj[obj]);
         // }
         console.log('Repo Names:');
         var githubDisplayText = '';
         var repoList = document.createElement('ul');
         githubDisplay.appendChild(repoList);
         for(var i=0;i<responseObj.length;i++) {
             console.log(i+": "+responseObj[i].name);
             githubDisplayText += '\n * '+responseObj[i].name;
             var repoLine = document.createElement('li');
             repoLine.textContent = responseObj[i].name;
             repoList.appendChild(repoLine);
         }
         console.log('githubDisplay: '+ githubDisplayText);
         
        // githubDisplay.textContent = githubDisplayText;
 }
 var gitHubUserID = 'kbooth1000';
 var request = new XMLHttpRequest();
 request.onload = accessGitHub;
 request.open('get', 'https://api.github.com/users/'+gitHubUserID+'/repos', true);
 request.onerror = function(){
     console.log('The given gitHubUserID ('+gitHubUserID+') is not valid.');
 }
 request.send();


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
         firebase.auth().signOut();
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
             var googleDisplayName = user.displayName,
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

             console.log('User account details: ' + JSON.stringify(user, null, '  '));

             document.getElementById('home-page-greeting').textContent = 'Hi, ' + googleDisplayName;
    
             // Turn on the proper page
             if(googleEmail === 'kbooth1000@gmail.com') {  // TEST WITH MY OWN TWO GMAIL ACCOUNTS (kbooth1000 and kjbooth1000)
                activateHomePage();
             } else //if(googleEmail === 'kjbooth1000@gmail.com') {
                 { onboardingPage.classList.add('active-page');
                 loginPage.style.display = 'none';
                 homePage.style.display = 'none';
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
           

     });
 }
     window.onload = function() {
         initApp();
     };