window.onload = setup;

// change current language
function setLanguage() {
    // check current language
    const currLang = localStorage.getItem('lang');
    if (currLang === this.abbr) {
        console.log("app: ignoring selected language");
        console.log("app: selected language is current langauge");
    } else {
        console.log("app: changing language to " + this.name);
        localStorage.setItem('lname', this.name)
        localStorage.setItem('lang', this.abbr);
    }
}

// get list of languages
async function getLanguages() {
    const url = "assets/data/languages.json";
    let response = await fetch(url);
    let data = await response.json();
    if (data === undefined) {
        return {};
    }
    return data;
}

async function setup() {
    // check current language
    const currLang = localStorage.getItem('lang');
    // set default to English if undefined
    if (currLang === undefined) {
        console.log("app: no language selected");
        console.log("app: language defaulted to en");
        setLanguage("en");
    } else {
        console.log("app: default language detected!");
        console.log("app: current language - " + currLang);
    }

    const langDropdowns = document.getElementById("language-menu");
    let languages = await getLanguages();
    for (language of languages) {
        let item = document.createElement("li");
        let tag = document.createElement("a");
        tag.onclick = setLanguage.bind(language);
        tag.className = "dropdown-item"
        tag.innerText = language.name;
        item.append(tag)
        langDropdowns.append(item);
    }
}
