export const indexTemplate = (content) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Pomodoro</title>
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1.0">
      <link rel="stylesheet" href="/static/main.css">
      <link rel="shortcut icon" href="/static/favicon.ico"> 
      <script src="/static/client.js" type="application/javascript"></script>
    </head>
    <body>
      <div id="react-root">${content}</div>
      <div id="dropdown-root">${content}</div>
      <div id="question-root">${content}</div>
    </body>
  </html>
`;
