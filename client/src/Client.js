/* eslint-disable no-undef */
function search(query, cb) {
  return fetch(`api/search?address=${query}`,  {
    accept: "application/json"
  }).then((response)=>{
      return response.json();
    }).then((json)=>{
      cb(json);
  });
}

const Client = { search };
export default Client;
