export interface Mock {
  id: string;
  request: any;
  response: any;
  uuid: string;
  priority: number;
}

export var mockCompareUri = (a, b) => {
  if (a.request.uri < b.request.uri)
    return -1;
  if (a.request.uri > b.request.uri)
    return 1;
  return 0;
};

export var mockCompareMethod = (a, b) => {
  if (a.request.method < b.request.method)
    return -1;
  if (a.request.method > b.request.method)
    return 1;
  return 0;
};

export var mockCompareStatus = (a, b) => {
  if (a.response.status < b.response.status)
    return -1;
  if (a.response.status > b.response.status)
    return 1;
  return 0;
};
