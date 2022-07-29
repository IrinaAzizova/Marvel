
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '&apikey=bce4864d4864972f92a041912036d003';
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=bce4864d4864972f92a041912036d003`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        let descr;
        if (!char.descr) {
            descr = 'Character description missing';
        } else if (char.descr.length > 150) {
            descr = char.descr.slice(0, 149) + '...';
        } else {
            descr = char.descr;
        }
        
        return {
            name: char.name,
            description: descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;