import Axios from 'axios';

export default resourceType => {
    return Axios.get(
        `https://jsonplaceholder.typicode.com/${resourceType}`
    ).then(({ data }) => {
        return data.filter((_, idx) => idx < 10);
    })
}