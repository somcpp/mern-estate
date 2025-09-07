export function createListing(formData) {
    return new Promise(async (resolve) => {
        const response = await fetch('/api/listing/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      resolve({data});
    })
}

export function getUserlistings(id) {
    return new Promise(async (resolve) => {
        const response = await fetch(`/api/user/listings/${id}`);
      const data = await response.json();

      resolve({data});
    })
}

export function deleteUserlisting(id) {
    return new Promise(async (resolve) => {
        const response = await fetch(`/api/listing/delete/${id}`,{
          method: 'DELETE',
        }
        );
      const data = await response.json();

      resolve({data});
    })
}

export function updateUserListings(listData) {
    return new Promise(async (resolve) => {
        const {_id} = listData
        const response = await fetch(`/api/listing/update/${_id}`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(listData),
        }
        );
      const data = await response.json();

      resolve({data});
    })
}

export function getListing(id) {
    return new Promise(async (resolve) => {
        const response = await fetch(`/api/listing/get/${id}`);
      const data = await response.json();

      resolve({data});
    })
}