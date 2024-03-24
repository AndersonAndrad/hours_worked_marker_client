export function buildParamsFromObject(object: any) {
  const params = new URLSearchParams();

  if (object) {
    Object.keys(object).forEach((p) => {
      if (object[p] != null && object[p] !== undefined) {
        if (Array.isArray(object[p])) {
          for (let k = 0; k < object[p].length; k++) {
            params.append(p, object[p][k]);
          }
        } else {
          params.append(p, object[p]);
        }
      }
    });
  }

  return params.toString();
}
