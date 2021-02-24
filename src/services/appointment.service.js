import http from '../http-common';

class AppointmentDataService {
  getAll() {
    return http.get('/appointments');
  }

  get(id) {
    return http.get(`/appointments/${id}`);
  }

  create(data) {
    return http.post("/appointments", data);
  }

  update(id, data) {
    return http.put(`/appointments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/appointments/${id}`);
  }

  deleteAll() {
    return http.delete(`/appointments`);
  }
}

export default new AppointmentDataService();
