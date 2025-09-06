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