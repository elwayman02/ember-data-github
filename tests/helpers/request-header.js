import { registerHelper } from '@ember/test';

export function requestHeader(server, name, forRequestIndex = 0) {
    const request = server.pretender.handledRequests[forRequestIndex];
    const headers = request.requestHeaders;

    const headerNames = Object.keys(headers);
    const matchingHeader = headerNames.find(headerName => {
        return headerName.toLowerCase() === name.toLowerCase();
    });

    return headers[matchingHeader];
}

export default registerHelper(
  'requestHeader',
  function (app, server, name, forRequestIndex = 0) {
    return requestHeader(server, name, forRequestIndex);
  }
);
