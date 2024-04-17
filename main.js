const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btn = document.getElementById("btn");
const usersDiv = document.querySelector(".users");
const loginDiv = document.querySelector(".login");
const loginNav = document.getElementById("loginNav");
const usersNav = document.getElementById("usersNav");
const logoutNav = document.getElementById("logoutNav");

let token = localStorage.getItem("token") || "";

// let token = localStorage.getItem("token") ? localStorage.getItem("token"): ""
const hideViews = () => {
  loginDiv.classList.add("d-none");
  loginNav.classList.add("d-none");
  usersDiv.classList.add("d-none");
  usersNav.classList.add("d-none");
  logoutNav.classList.add("d-none");
};

const showNavLogged = () => {
  usersNav.classList.remove("d-none");
  logoutNav.classList.remove("d-none");
};

const printUsers = (usersArr) => {
  usersArr.forEach((user) => {
    const { first_name, email, avatar } = user;

    usersDiv.innerHTML += `
    <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
    <img src="${avatar}" alt="avatar" />
  <div class="card-header">${first_name}</div>
  <div class="card-body">
    <h4 class="card-title">${email}</h4>
    </div>
</div>
    `;
  });
};

async function getUsers() {
  hideViews();
  showNavLogged();
  usersDiv.classList.remove("d-none");
  const res = await axios.get("https://reqres.in/api/users", {
    headers: {
      authorization: token,
    },
  });
  const usersArr = res.data.data;
  printUsers(usersArr);
}

function logged() {
  if (token.length > 0) {
    hideViews();
    showNavLogged();
    getUsers();
  }
}
logged();
const login = async (e) => {
  e.preventDefault();
  try {
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    const res = await axios.post("https://reqres.in/api/login", user);
    token = res.data.token;
    localStorage.setItem("token", token);
    logged();
  } catch (error) {
    console.error(error);
  }
};

const logout = (e) => {
  e.preventDefault();
  localStorage.clear();
  hideViews();
  loginDiv.classList.remove("d-none")
  loginNav.classList.remove("d-none")
};

btn.addEventListener("click", login);
usersNav.addEventListener("click", getUsers);
logoutNav.addEventListener("click", logout);
