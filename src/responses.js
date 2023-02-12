const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });

  response.write(content);

  response.end();
};

const getIndex = (request, response) => {
  console.log('getIndex called');
  respond(request, response, index, 200, 'text/html');
};

const getCSS = (request, response) => {
  console.log('getCSS called');
  respond(request, response, css, 200, 'text/css');
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  const prefAccept = request.headers.accept.split(',')[0];
  const dataString = JSON.stringify(responseJSON);
  const responseXml = `
    <response>
      <message>${responseJSON.message}</message>
    </response>
  `;
  switch (prefAccept) {
    case 'application/json':
      console.log('success JSON');
      respond(request, response, dataString, 200, 'application/json');
      break;
    case 'text/xml':
      console.log('Success get xml');
      respond(request, response, responseXml, 200, 'text/xml');
      break;
    default:
      respond(request, response, dataString, 200, 'application/json');
  }
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  let responseXML = '<response><message>This request has the required parameters</message></response>';

  const prefAccept = request.headers.accept.split(',')[0];
  switch (prefAccept) {
    case 'application/json':
      if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';
        const dataString = JSON.stringify(responseJSON);
        respond(request, response, dataString, 400, 'application/json');
      }
      break;
    case 'text/xml':
      if (!params.valid || params.valid !== 'true') {
        responseXML = `<response>
        <message>Missing valid query parameter set to true</message>
        </response>`;
        console.log('badRequest get xml');
        respond(request, response, responseXML, 400, 'text/xml');
      }
      break;
    default:
      if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';
        const dataString = JSON.stringify(responseJSON);
        respond(request, response, dataString, 400, 'application/json');
      } else {
        respond(request, response, JSON.stringify(responseJSON), 200, 'application/json');
      }
  }
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  let responseXML = `
    <response>
      <message>This request has the required parameters</message>
    </response>
  `;
  const prefAccept = request.headers.accept.split(',')[0];
  switch (prefAccept) {
    case 'application/json':
      if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        responseJSON.id = 'unauthorized';
        const dataString = JSON.stringify(responseJSON);
        respond(request, response, dataString, 401, 'application/json');
      }
      break;
    case 'text/xml':
      if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseXML = `<response>
        <message>Missing loggedIn query parameter set to yes</message>
      </response>`;
        console.log('Success get xml');
        respond(request, response, responseXML, 401, 'text/xml');
      }
      break;
    default:
      if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        responseJSON.id = 'unauthorized';
        const dataString = JSON.stringify(responseJSON);
        respond(request, response, dataString, 401, 'application/json');
      } else {
        respond(request, response, JSON.stringify(responseJSON), 200, 'application/json');
      }
  }
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  const responseXML = `<response>
  <message>Internal Server Error. Something went wrong.</message>
  <id>internalError</id>
  </response>`;

  const dataString = JSON.stringify(responseJSON);
  const prefAccept = request.headers.accept.split(',')[0];

  switch (prefAccept) {
    case 'application/json':
      respond(request, response, dataString, 500, 'application/json');
      break;
    case 'text/xml':
      respond(request, response, responseXML, 500, 'text/xml');
      break;
    default:
      respond(request, response, dataString, 500, 'application/json');
  }
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  const responseXML = `
    <response>
      <message>You do not have access to this content</message>
      <id>forbidden</id>
    </response>
  `;
  const dataString = JSON.stringify(responseJSON);
  const prefAccept = request.headers.accept.split(',')[0];
  switch (prefAccept) {
    case 'application/json':
      respond(request, response, dataString, 403, 'application/json');
      break;
    case 'text/xml':
      respond(request, response, responseXML, 403, 'text/xml');
      break;
    default:
      respond(request, response, dataString, 403, 'application/json');
  }
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for update content.',
    id: 'notImplemented',
  };
  const responseXML = `
    <response>
    <message>A get request for this page has not been implemented yet. Check again later for updated content.'</message>
    <id>notImplemented</id>
  `;
  const dataString = JSON.stringify(responseJSON);
  const prefAccept = request.headers.accept.split(',')[0];

  switch (prefAccept) {
    case 'application/json':
      respond(request, response, dataString, 501, 'application/json');
      break;
    case 'text/xml':
      respond(request, response, responseXML, 501, 'text/xml');
      break;
    default:
      respond(request, response, dataString, 501, 'application/json');
  }
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  const responseXML = `
    <response>
      <message>The page you are looking for was not found'</message>
      <id>notFound</id>
    </response>
  `;
  const dataString = JSON.stringify(responseJSON);

  const prefAccept = request.headers.accept.split(',')[0];

  switch (prefAccept) {
    case 'application/json':
      respond(request, response, dataString, 404, 'application/json');
      break;
    case 'text/xml':
      respond(request, response, responseXML, 404, 'text/xml');
      break;
    default:
      respond(request, response, dataString, 404, 'application/json');
  }
};

module.exports = {
  success,
  badRequest,
  notFound,
  getIndex,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  getCSS,
};
