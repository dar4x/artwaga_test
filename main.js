const API = "https://dummyjson.com/users";
const list = document.querySelector("#user_list");

const allBtn = document.querySelector("#all");
const maleBtn = document.querySelector("#male");
const femaleBtn = document.querySelector("#female");
const sortNameBtn = document.querySelector("#sortby_name");
const sortBtn = document.querySelector("#sortby_flName");

getUsers();

// функция для получения всех пользователей
async function getUsers() {
  try {
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error("Ошибка с сервера");
    }
    const data = await res.json();
    render(data.users);
  } catch (err) {
    console.error("Произошла ошибка:", err);
    errModal("Ошибка при получении данных с сервера.");
  }
}

//функция для вывода сообщения одного из конкретных ошибок
function errModal(message) {
  alert(message);
}

// фильтрация пользователей
maleBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await filter("male");
});

femaleBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await filter("female");
});

allBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  clearList();
  await getUsers();
});

async function filter(gender) {
  try {
    const res = await fetch(`${API}/filter?key=gender&value=${gender}`);
    const data = await res.json();
    clearList();
    render(data.users);
  } catch (error) {
    console.error("Ошибка при фильтрации :", error);
    errModal("Ошибка при загрузке отфильтрованных юзеров. Попробуйте позже.");
  }
}

// Очистка содержимого контейнера перед новым рендерингом
function clearList() {
  list.innerHTML = "";
}

// рендер карточек с пользователями
function render(array) {
  array.forEach((item) => {
    list.innerHTML += `
    <div class="user_card">
        <div class="user_inner">
            <div class="user_front">
                <img class="image" src="${item.image}" alt="Avatar"}/>
                    <div class="user_info">
                        <h3 class="name">${item.username}</h3>
                        <h2 class='fullName'>${item.firstName} ${item.lastName}</h2>
                        <p class='email' id='${item.id}'>Email: ${item.email}</p>
                        <p class='phone'>Phone: ${item.phone}</p>
                    </div>
            </div>
            <div class="user_back" }>
                    <p class='city'>Birthday: ${item.birthDate}</p>
                    <p class='gender'>Gender: ${item.gender}</p>
                    <p class='city'>City: ${item.address.city}</p>
                    <p class='city'>Graduate: ${item.university}</p>
            </div>
        </div>
    </div>`;
  });
}

// сортировка
sortBtn.addEventListener("click", () => {
  sortUsers(".fullName");
});

sortNameBtn.addEventListener("click", () => {
  sortUsers(".name");
});

// Функция сортировки пользователей по имени или никнейму
function sortUsers(sort) {
  const sortedUsers = Array.from(list.children).sort((a, b) =>
    a
      .querySelector(`${sort}`)
      .textContent.localeCompare(b.querySelector(`${sort}`).textContent)
  );

  clearList();
  sortedUsers.forEach((user) => list.appendChild(user));
}
