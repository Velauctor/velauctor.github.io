console.log('Hello, World!');

var testKey = 'f69093f59c55a94121725f77ed6b299c';
var testToken = 'ad8d5986422c47af9924439db86c590d0dcc088c77dff638fec1df073d45e9fb';
var testAddress = 'https://api.trello.com/1/members/me/'

var getPromise = fetch(testAddress+'boards', {key: testKey, token: testToken});
getPromise
  .then(function(getResult) {
      console.log(getResult);
  });