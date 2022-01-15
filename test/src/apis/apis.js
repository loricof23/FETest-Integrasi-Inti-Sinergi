import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-nginx-lms.accelego.id/api/v1/',
})