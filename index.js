var uid = 0;
var usertData = [];



function initApp() {
    console.log();
    initFirebase();
}

//initializing the firebase 
function initFirebase() {
    // Shortcuts to Firebase SDK features.
    auth = firebase.auth();
    database = firebase.database();
    storage = firebase.storage();

    // Initiates Firebase auth and listen to auth state changes.

};

var doLogin = function() {
            var url = server + "login.php?usr=" + $('#userNamein').val() + "&psw=" + $('#Passwordin').val()
            console.log(url)
            $.get(url, function(data) {
                 usertData =JSON.parse(data);
                if(usertData.length==0){
                    alert("Invalid Login...Please check the user name and or password entered")
                }else{
                    $('file:homepage').html();
                    location.href = "file:homepage.html"
                    console.log('success'+JSON.stringify(data))
                }
            });
        }

function getData(emailOfUserLoggedIn) {
    location.href = "file:homepage.html"
}

function signingUp() {

    var email = $('#userNameup').val();
    var password = $('#Passwordup').val();
    initFirebase()
    auth.createUserWithEmailAndPassword(email, password).then(
        function(user) {
            console.log(user)
            console.log(user.email)
            loginUsrEmail = user.email
            getData(user.email)
        },
        function(error) {
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("" + errorMessage)
        });
 };

 function signingIn() {
    var email = $('#userNamein').val();
    var password = $('#Passwordin').val();

    initFirebase()
    auth.signInWithEmailAndPassword(email, password).then(
        function(user) {
            console.log(user)
            console.log(user.email)
            loginUsrEmail = user.email
            getData(loginUsrEmail)
        },
        function(error) {
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("" + errorMessage)     
        });

};