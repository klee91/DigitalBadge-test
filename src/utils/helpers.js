// Include the axios package for performing HTTP requests (promise based alternative to request)
const axios = require("axios");
// const params = new URLSearchParams();

// Helper functions for making API Calls
const helpers = {
    addUser: user => {
        return axios.post('/api/signup', {
            user,
            headers:{'Content-Type' : 'application/json'},
            validateStatus: (status) => {
                return true;
            }
        }).then(res => {

        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error: ', error.message);
              }
              console.log(error.config);  
        });
    },
    getStudents: () => {
        return axios.get('/api/students')
        .then(response => {
            return response.data;
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error: ', error.message);
              }
              console.log(error.config); 
        });
    },
    getStudent: () => {
        return axios.get('/api/student/me', (error, student) => {
            return student;
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error: ', error.message);
              }
              console.log(error.config); 
        });
    },
    getTeachers: () => {
        return axios.get('/api/teachers')
        .then(response => {
            return response.data;
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error: ', error.message);
              }
              console.log(error.config); 
        });
    },
    getTeacher: () => {
        return axios.get('/api/teacher/me', (error, teacher) => {
            return teacher;
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error: ', error.message);
              }
              console.log(error.config); 
        });
    },
    logoutUser: () => {
        return axios.post('/api/logout');
    }
    // loginUser: user => {
    //     return axios.post('/api/login', {
    //         user,
    //         headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
    //         validateStatus: status => {
    //             return true;
    //         }
    //     }).then(res =>{
    //         console.log("RES: " + res)
    //     }).catch(error =>{
    //         console.log("loginUser error: " + error);
    //     });
    // }
//   addContact: function(userID,contactID) {
//     return axios.post('/api/newContact/' + userID + "/" + contactID);
//   },
//   getContacts: function(userID) {
//     return axios.get('/api/contacts/' + userID);
//   },
//   submitNewUser: function(data) {
//       console.log(data);
//       let queryURL = "/users/register";
//       return axios.post(queryURL, data).then(function(result) {
//         console.log("in helper function");
//         console.log(result);
//         return result;

//       });
//   },
//   logInUser: function(data) {

//     console.log(data);
//     let queryURL = "/users/login";
//     return axios.post(queryURL, data).then(function(result) {
//         console.log("in helper login function");
//         console.log(result);
//         return result;
//       });
//   },

//   updateUser: function(query,data) {

//     console.log(data);
//     let queryURL = "/users/update/" + query;
//     return axios.post(queryURL, data).then(function(result) {
//         console.log("updating user");
//         console.log(result);
//         return result;
//     });
//   },

//   getUsers: function(inst, gender) {
//     return axios.get("/api/musicians/" + inst + "/" + gender );
//   },
//   getUserByUsername: function(query) {
//     return axios.get("/api/user/" + query);
//   },
//   getUserById: function(id) {
//     return axios.get("/api/userContacts/" + id);
//   },
//   // This function hits our own server to retrieve the record of query results
//   getHistory: function() {
//     return axios.get("/api");
//   },
//   // This function posts new searches to our database.
//   postHistory: function(location) {
//     return axios.post("/api", { location: location });
//   }
};

module.exports = helpers;