

class Service {

    _dbUrl = '/db.json';
    
    getResource = async (url = this._dbUrl) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }
}

export default Service;