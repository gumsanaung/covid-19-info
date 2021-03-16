window.onload = getLanguages;

function setLanguage(name) {
    localStorage.setItem('lang', name);
}

async function getLanguages() {
    const url = "assets/data/languages.json";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}