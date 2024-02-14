const axios = require('axios');
const NEWSAPI_KEY = "384e155a49954f6caf57ed2e0c760bd7";
async function fetchMarvelCharacter(query) {
    const url = `https://marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com/name?q=${query}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7b813e3024msh753420c1d2b6a9fp133f87jsn48410fd9d981',
            'X-RapidAPI-Host': 'marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

async function getNewsByCity() {
    let response, responseData = null;

    try {
        response = await axios.get(`https://newsapi.org/v2/everything?q=weather&apiKey=${NEWSAPI_KEY}&pageSize=10&page=1`);
        responseData = response?.data?.articles;
    } catch {
        return null;
    }

    let answer = [];

    responseData.forEach(article => {
        answer.push({
            "source": article.source.name,
            "title": article.title,
            "description": article.description,
            "url": article.url,
            "image": article.urlToImage,
            "published_at": new Date(article.publishedAt).toLocaleString('en-GB', {
                hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric', hour12: false
            })
        });
    });

    return answer;
}

module.exports = {
    getNewsByCity, fetchMarvelCharacter,
};