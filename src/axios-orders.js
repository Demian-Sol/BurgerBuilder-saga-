import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-study-project.firebaseio.com/',
  
})

export default instance;