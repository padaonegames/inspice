import axios from 'axios';


const USER_API_BASE_URL = "http://localhost:8080/api/v2/config";
//
//const PROPERTY_API_BASE_URL = "http://localhost:8080/api/v2/property";
class ConfigService {

  public getConfigurations() {
    return axios.get(USER_API_BASE_URL);
  }

  public createPropertyConfiguration(config: any) {
    return axios.post(USER_API_BASE_URL + "Create", config);
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
  public getConfigByName(propertyName: any) {
    return axios.get(USER_API_BASE_URL + 'Get/' + propertyName);
  }

  public updateConfig(config: any, propertyName: any) {
    return axios.put(USER_API_BASE_URL + 'Update/' + propertyName, config);
  }

  public deleteConfig(propertyName: any) {
    return axios.delete(USER_API_BASE_URL + 'Delete/' + propertyName);
  }

}

export default new ConfigService();