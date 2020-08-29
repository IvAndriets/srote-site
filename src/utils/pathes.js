export const baseUrl = 'http://localhost:3000/api/v1/';

export function removeFalsyValues (obj) {

  return Object.keys(obj).reduce((acc, current) => {
    if (obj[current]) {
      acc[current] = obj[current];
    }

    return acc;
  }, {});

}
