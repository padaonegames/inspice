import axios from 'axios';


const USER_API_BASE_URL = 'http://localhost:8080/api/v2/users2';
//
//const PROPERTY_API_BASE_URL = 'http://localhost:8080/api/v2/property';
class UserService {


  public getUsers() {
    return axios.get(USER_API_BASE_URL);
  }

  public createUser(user: any) {
    return axios.post(USER_API_BASE_URL + 'Create', user);
  }
  /*
      getUserById(userId){
          return axios.get(USER_API_BASE_URL + '/' + userId);
      }
  
      updateUser(user, userId){
          return axios.put(USER_API_BASE_URL + '/' + userId, user);
      }
  
      deleteUser(userId){
          return axios.delete(USER_API_BASE_URL + '/' + userId);
      }
  */
  public getUserById2(userId: any) {
    return axios.get(USER_API_BASE_URL + 'Get/' + userId);
  }

  public updateUser2(user: any, userId: any) {
    return axios.put(USER_API_BASE_URL + 'Update/' + userId, user);
  }

  public deleteUser2(userId: any) {
    return axios.delete(USER_API_BASE_URL + 'Delete/' + userId);
  }

  public getPropertyByUseridPropertyName(propertyName: any, userId: any) {
    return axios.get(USER_API_BASE_URL + '/' + userId + '/' + propertyName);
  }
}

export default new UserService();