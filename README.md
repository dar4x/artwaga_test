i used doc's from "https://dummyjson.com/docs/users"

в Rest API https://dummyjson.com/users на дэфолтном уровне используется limit=30 юзеров,я не стал его менять, поэтому при каждом нажатии фильтрации или взаимодействии с юзерами, лимит так же стоит на 30.
Поэтому количесвто в списке как и женщин, так и мужчин - 30, но в массиве кол-во заканчивается на 100 юзерах.

Добавлена обработка ошибок на получение всех юзеров и фильтрации.
Функционал сортировки работает, к сожалению, только на текущем контенте, к изминению в фильтрах не применяется без нажанитя.
Добавлено немного фильтров, сортировки, и мизерная адаптивка
Дизайн очень простой исходя от аваторок из API, не стал делать большие карточки.

Для удобства добавлены комментарии на каждый отдельный блок кода 