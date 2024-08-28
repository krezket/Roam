// const URL_PREFIX = "http://localhost:3001"
// const URL_PREFIX = "https://a-13rain-backend-f1bf2467fb35.herokuapp.com"
const URL_PREFIX = "https://marketdb-ca2c93422e93.herokuapp.com"

const API = {
    // Login User 
    login: (userObj) => {
        return fetch(`${URL_PREFIX}/users/login`, {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"

            }
        }).then(res => res.json())
    },

    // Sign Up User
    signup: (userObj) => {
        return fetch(`${URL_PREFIX}/users`, {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"

            }
        }).then(res => res.json())
    },

    // GET BY ID FOR PROFILE / USER
    getProfile: async (x) => {
        try {
            const dbProfileData = await fetch(`${URL_PREFIX}/users/${x}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return dbProfileData.json();
        } catch (error) {
            console.log(error);
        }
    },

    // GET BY USERNAME FOR PROFILE / USER
    getProfileByName: async (x) => {
        try {
            const dbProfileData = await fetch(`${URL_PREFIX}/users/profile/${x}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return dbProfileData.json();
        } catch (error) {
            console.log(error);
        }
    },

    //get all profiles
    getProfiles: async () => {
        try {
            const dbProfileData = await fetch(`${URL_PREFIX}/users/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return dbProfileData.json();
        } catch (error) {
            console.log(error);
        }
    },

    // Verify User Token
    verifyToken: async (token) => {
        const res = await fetch(`${URL_PREFIX}/users/auth/verifytoken`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        if (res.ok) {
            // console.log(res)
            return res.json()
        } else {
            throw new Error("falied signup")
        }
    },

    // Update User Profile by ID
    updateProfile: async (x) => {
        try {
            const response = await fetch(`${URL_PREFIX}/users/${x.id}`, {
                method: 'PUT',
                body: JSON.stringify(x),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                return response.json();
            } else {
                alert('Unable to fetch');
            }
        } catch (error) {
            console.log(error);
        }
    },
////////////////////////////////////////////////////////////////////////////
    // Log In Vendor 
    loginVendor: (userObj) => {
        return fetch(`${URL_PREFIX}/vendors/login`, {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"

            }
        }).then(res => res.json())
    },

    // Sign Up Vendor 
    signupVendor: (userObj) => {
        return fetch(`${URL_PREFIX}/vendors`, {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"

            }
        }).then(res => res.json())
    },

    // GET BY ID FOR VENDOR 
    getVendorProfile: async (x) => {
        try {
            const dbProfileData = await fetch(`${URL_PREFIX}/vendors/${x}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return dbProfileData.json();
        } catch (error) {
            console.log(error);
        }
    },

    addFollow: async (x) => {
        try {
            const response = await fetch(`${URL_PREFIX}/users/addfriend/${x.id}`, {
                method: 'PUT',
                body: JSON.stringify(x),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                return response.json();
            } else {
                alert('Unable to fetch');
            }
        } catch (error) {
            console.log(error);
        }
    },
    
    // Remove Follow
    removeFollow: async (x) => {
        try {
            const response = await fetch(`${URL_PREFIX}/users/removefriend/${x.id}`, {
                method: 'PUT',
                body: JSON.stringify(x),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                return response.json();
            } else {
                alert('Unable to fetch');
            }
        } catch (error) {
            console.log(error);
        }
    },

    // Create A Page
    createPage: async (userObj) => {
        try {
            const response = await fetch(`${URL_PREFIX}/pages`, {
                method: 'POST',
                body: JSON.stringify(userObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // return console.log(response.json());
                return await response.json();
            } else {
                alert('Cannot create project');
            }

        } catch (error) {
            console.log(error);
        }
    },
}
export default API

