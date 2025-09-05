export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      resolve({data});
    })
}

export function checkUser(userData){
    return new Promise(async (resolve,reject) => {
        const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if(response.ok) {
        const data = await response.json();
        resolve({data});
      } else {
        const err = await response.json();
        console.log(err);
        reject(err);
      }
    })
}

export function google(userData){
    return new Promise(async (resolve,reject) => {
        const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if(response.ok) {
        const data = await response.json();
        resolve({data});
      } else {
        const err = await response.json();
        console.log(err);
        reject(err);
      }
    })
}

export function updateUser(userData,id){
    return new Promise(async (resolve,reject) => {
        const response = await fetch(`/api/user/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if(response.ok) {
        const data = await response.json();
        resolve({data});
      } else {
        const err = await response.json();
        console.log(err);
        reject(err);
      }
    })
}

export function deleteUser(id){
    return new Promise(async (resolve,reject) => {
        const response = await fetch(`/api/user/delete/${id}`, {
        method: 'DELETE',
      });
      if(response.ok) {
        const data = await response.json();
        resolve({data});
      } else {
        const err = await response.json();
        console.log(err);
        reject(err);
      }
    })
}