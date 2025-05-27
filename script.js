
firebase.auth().onAuthStateChanged(user => {
  if (window.location.pathname.includes("dashboard.html") && !user) {
    window.location = "login.html";
  }
});

function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      userCredential.user.sendEmailVerification();
      alert("Verification email sent. Please check your inbox.");
    })
    .catch(error => alert(error.message));
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      if (userCredential.user.emailVerified) {
        window.location = "dashboard.html";
      } else {
        alert("Please verify your email first.");
        firebase.auth().signOut();
      }
    })
    .catch(error => alert(error.message));
}

function logout() {
  firebase.auth().signOut().then(() => window.location = "login.html");
}

function addPortfolio() {
  const coin = document.getElementById("coin").value;
  const amount = document.getElementById("amount").value;
  const value = document.getElementById("value").value;
  const table = document.getElementById("portfolioTable");
  const row = table.insertRow();
  row.innerHTML = `<td>${coin}</td><td>${amount}</td><td>£${value}</td>`;
}
