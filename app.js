const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 56) {
    nav.classList.add("nav-on-scroll");
  } else {
    nav.classList.remove("nav-on-scroll");
  }
});

const APIURL = "https://api.github.com/users/";

const githubProfil = document.getElementById("github-profil");

async function getUser(username) {
  const { data } = await axios(APIURL + username);
  createUserCard(data);
  getRepos(username);
}

async function getRepos(username) {
  const { data } = await axios(APIURL + username + "/repos?sort=created");
  addReposToCard(data);
}

function createUserCard(user) {
  const userID = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${userID}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong> Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `;
  githubProfil.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

getUser("galuhsatria");
