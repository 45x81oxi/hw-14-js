//1 вариант решения использовала одну функцию на все select, он  короче и универсальней,
// но пришлось переделать Ваш код

// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "04b16f6e801b4af7bcd41a973b7f4776";
const categories = [
    {
        title: 'Business',
        value: 'business'
    },
    {
        title: 'Entertainment',
        value: 'entertainment'
    },
    {
        title: 'Health',
        value: 'health'
    },
    {
        title: 'Science',
        value: 'science'
    },
    {
        title: 'Sports',
        value: 'sports'
    },
    {
        title: 'Technology',
        value: 'technology'
    }
];
const resources = [
    {
        title: 'ABC News',
        value: 'abc-news'
    },
    {
        title: 'CNN',
        value: 'cnn'
    },
    {
        title: 'BBC News',
        value: 'bbc-news'
    },
    {
        title: 'News24',
        value: 'news24'
    },
    {
        title: 'NBC News',
        value: 'nbc-news'
    }
];


// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const container = document.querySelector('.container');

// All events
searchBtn.addEventListener("click", onSearch);
container.addEventListener('change', onChoice);

function onChoice(e) {
    if (e.target.id === "country") {
        resetOptions(document.querySelector('#sources'), document.querySelector('#category'));
        onChange("country");
        document.querySelector('.category').style.display = 'block';
    }
    else if (e.target.id === "sources") {
        document.querySelector('.category').style.display = 'none';
        resetOptions(select, document.querySelector('#category'));
        onChange("sources");
    }
    else if (e.target.id === "category") {
        resetOptions(document.querySelector('#sources'));
        onChange("category");
    }

}

document.addEventListener("DOMContentLoaded", function () {
    //генерируем select
    ui.createSelect(resources, 'sources', 'afterbegin');

    //генерируем select категорий
    ui.createSelect(categories, 'category', 'beforeend');
    document.querySelector('.category').style.display = 'none';

});


// Event handlers
function onChange(val) {
    let selectChoice = document.getElementById(val);
    let url;
    // Показываю прелодер
    ui.showLoader();
    if (val === "category") {
        url = `https://newsapi.org/v2/top-headlines?${select.id}=${select.value}&${val}=${selectChoice.value}&apiKey=${apiKey}`
    } else {
        url = `https://newsapi.org/v2/top-headlines?${val}=${selectChoice.value}&apiKey=${apiKey}`;
    }
    // Делаем запрос на получение новостей
    http.get(url, function (err, res) {
        if (err) return ui.showError(err);
        if (!err) {
            // Приобразовываем из JSON в обычный объект
            const response = JSON.parse(res);
            if (response.totalResults) {
                // Удаляем разметку из контейнера
                ui.clearContainer();
                // перебираем новости из поля articles в объекте response
                response.articles.forEach(news => ui.addNews(news));
            } else {
                // Если новостей нет, выводим сообщение
                val === 'category' ? ui.showInfo(`Новости по ${selectChoice.value} по стране ${select.value} не найдены`) :
                    ui.showInfo(`Новостей по ${selectChoice.value} не найдено!`);
            }
        }
    });
}


function onSearch(e) {
    // Делаем запрос на получение новостей по тому что введено в инпут
    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
        if (err) return ui.showError(err);

        const response = JSON.parse(res);

        if (response.totalResults) {
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            response.articles.forEach(news => ui.addNews(news));
        } else {
            ui.showInfo("По вашему запросу новостей не найдено!");
        }
    });
}

function resetOptions() {
    Array.prototype.slice.apply(arguments).forEach(item => item[0].selected = true);
    $('select').formSelect();
}

//2 вариант======================
// знаю, что закомментированный код нельзя.
// Под каждый селект использовала отдельные функции и не изменила Вашу


// // Init http
// const http = new Http();
// // Init UI
// const ui = new UI();
// // Api key
// const apiKey = "04b16f6e801b4af7bcd41a973b7f4776";
// const categories = [
//     {
//         title: 'Business',
//         value: 'business'
//     },
//     {
//         title: 'Entertainment',
//         value: 'entertainment'
//     },
//     {
//         title: 'Health',
//         value: 'health'
//     },
//     {
//         title: 'Science',
//         value: 'science'
//     },
//     {
//         title: 'Sports',
//         value: 'sports'
//     },
//     {
//         title: 'Technology',
//         value: 'technology'
//     }
// ];
// const resources = [
//     {
//         title: 'ABC News',
//         value: 'abc-news'
//     },
//     {
//         title: 'CNN',
//         value: 'cnn'
//     },
//     {
//         title: 'BBC News',
//         value: 'bbc-news'
//     },
//     {
//         title: 'News24',
//         value: 'news24'
//     },
//     {
//         title: 'NBC News',
//         value: 'nbc-news'
//     }
// ];
//
//
// // Init elements
// const select = document.getElementById("country");
// const searchInput = document.getElementById("search");
// const searchBtn = document.getElementById("searchBtn");
//
//
// // All events
// select.addEventListener("change", onChangeCountry);
// searchBtn.addEventListener("click", onSearch);
//
// document.addEventListener("DOMContentLoaded", function () {
//
//     //генерируем select ресурсов
//     ui.createSelect(resources, 'resource', 'afterbegin');
//     // запрос на получение ресурсов
//     document.querySelector('#resource').addEventListener("change", function (e) {
//         onChangeResource();
//     });
//
//     //генерируем select категорий
//     ui.createSelect(categories, 'category', 'beforeend');
//     document.querySelector('.category').style.display = 'none';
//     // запрос на получение по категории
//     document.querySelector('#category').addEventListener("change", function (e) {
//         onChangeCountryAndCategory();
//     });
//
// });
//
//
// // Event handlers
// function onChangeCountry() {
//     resetOptions(document.querySelector('#resource'), document.querySelector('#category'))
//     // Показываю прелодер
//     ui.showLoader();
//     // Делаем запрос на получение новостей по выбранной стране
//     http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&apiKey=${apiKey}`, function (err, res) {
//         if (!err) {
//             // Приобразовываем из JSON в обычный объект
//             const response = JSON.parse(res);
//             // Удаляем разметку из контейнера
//             ui.clearContainer();
//             // перебираем новости из поля articles в объекте response
//             response.articles.forEach(news => ui.addNews(news));
//         } else {
//             // Выводим ошибку
//             ui.showError(err);
//         }
//     });
//     document.querySelector('.category').style.display = 'block';
// }
//
// // при выборе ресурса подгружаем новости с этим ресурсом
// function onChangeResource() {
//     document.querySelector('.category').style.display = 'none';
//     resetOptions(select, document.querySelector('#category'));
//
//     // Показываю прелодер
//     ui.showLoader();
//     let selectResource = document.getElementById("resource");
//     // Делаем запрос на получение новостей по выбранным ресурсам
//     http.get(`https://newsapi.org/v2/top-headlines?sources=${selectResource.value}&apiKey=${apiKey}`, function (err, res) {
//         if (!err) {
//             // Приобразовываем из JSON в обычный объект
//             const response = JSON.parse(res);
//             // Удаляем разметку из контейнера
//             ui.clearContainer();
//             // перебираем новости из поля articles в объекте response
//             response.articles.forEach(news => ui.addNews(news));
//         } else {
//             // Выводим ошибку
//             ui.showError(err);
//         }
//     });
// }
//
//
// function onSearch(e) {
//     // Делаем запрос на получение новостей по тому что введено в инпут
//     http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
//         if (err) return ui.showError(err);
//
//         const response = JSON.parse(res);
//
//         if (response.totalResults) {
//             // Удаляем разметку из контейнера
//             ui.clearContainer();
//             // перебираем новости из поля articles в объекте response
//             response.articles.forEach(news => ui.addNews(news));
//         } else {
//             ui.showInfo("По вашему запросу новостей не найдено!");
//         }
//     });
// }
//
//
// // возможность выбора новостей по категории и стране
// function onChangeCountryAndCategory() {
//     resetOptions(document.querySelector('#resource'));
//     // Показываю прелодер
//     ui.showLoader();
//     let selectCategory = document.getElementById("category");
//     // Показываю прелодер
//     ui.showLoader();
//     // Делаем запрос на получение новостей по выбранной стране и категории
//     http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`, function (err, res) {
//         if (err) return ui.showError(err);
//         const response = JSON.parse(res);
//         if (response.totalResults) {
//             // Удаляем разметку из контейнера
//             ui.clearContainer();
//             // перебираем новости из поля articles в объекте response
//             response.articles.forEach(news => ui.addNews(news));
//         } else {
//             // Если новостей нет по выбранной категоррии, выводим сообщение
//             ui.showInfo(`Новости по ${selectCategory.value} по стране ${select.value} не найдены`);
//         }
//     });
//
// }
//
//
// function resetOptions() {
//     Array.prototype.slice.apply(arguments).forEach(item => item[0].selected = true);
//     $('select').formSelect();
// }
