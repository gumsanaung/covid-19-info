window.onload = setup;

// change current language
function setLanguage(name, abbr) {
    // check current language
    const currLang = localStorage.getItem('lang');
    if (currLang === abbr) {
        console.log("app: ignoring selected language");
        console.log("app: selected language is current langauge");
    } else {
        console.log("app: changing language to " + name);
        localStorage.setItem('lname', name)
        localStorage.setItem('lang', abbr);
    }
}

// get list of languages
async function getLanguages() {
    const url = "assets/data/languages.json";
    let response = await fetch(url);
    let data = await response.json();
    if (data === undefined) {
        return [];
    }
    return data;
}

async function setup() {
    // check current language
    const currLang = localStorage.getItem('lang');
    // set default to English if undefined
    if (currLang === null || currLang === "undefined") {
        console.log("app: no language selected");
        console.log("app: language defaulted to en");
        setLanguage("English", "en");
    } else {
        console.log("app: default language detected!");
        console.log("app: current language - " + currLang);
    }

    const langDropdowns = document.getElementById("language-menu");
    let languages = await getLanguages();

    languages.sort(function (a, b) {
        return a["name"] > b["name"] ? 1 : -1;
    });

    for (language of languages) {
        let item = document.createElement("li");
        let tag = document.createElement("a");
        tag.onclick = setLanguage.bind(null, language.name, language.abbr);
        tag.className = "dropdown-item"
        tag.innerText = language.name;
        item.append(tag)
        langDropdowns.append(item);
    }
}
