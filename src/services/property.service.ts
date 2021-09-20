import axios from 'axios';

const PROPERTY_API_BASE_URL = "http://localhost:8080/api/v2/property";

class PropertyService {

  public getPropertysByUserid(userid: any) {
    return axios.get(PROPERTY_API_BASE_URL + 'GetAllByUserid/' + userid);
  }

  public getPropertysByName(pname: any) {
    return axios.get(PROPERTY_API_BASE_URL + 'GetAllByPname/' + pname);
  }

  public createProperty(property: any, userid: any) {
    return axios.post(PROPERTY_API_BASE_URL + 'Create/' + userid, property);
  }

  public getPropertyById(propertyName: any, userid: any) {
    return axios.get(PROPERTY_API_BASE_URL + 'Get/' + userid + '/' + propertyName);
  }

  public updateProperty(property: any, userid: any) {
    return axios.put(PROPERTY_API_BASE_URL + 'Update/' + userid, property);
  }

  public deleteProperty(userid: any, propertyName: any) {
    return axios.delete(PROPERTY_API_BASE_URL + 'Delete/' + userid + '/' + propertyName);
  }


}

export default new PropertyService();