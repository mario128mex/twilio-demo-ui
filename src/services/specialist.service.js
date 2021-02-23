import http from '../http-common';

class SpecialistDataService {
  getAll() {
    return http.get('/specialists');
  }

  get(id) {
    return http.get(`/specialists/${id}`);
  }

  create(data) {
    return http.post("/specialists", data);
  }

  update(id, data) {
    return http.put(`/specialists/${id}`, data);
  }

  delete(id) {
    return http.delete(`/specialists/${id}`);
  }

  deleteAll() {
    return http.delete(`/specialists`);
  }

  findByName(name) {
    return http.get(`/specialists?name=${name}`);
  }
}

export default new SpecialistDataService();
