module.exports = {
  HTML: function (title, list, control, body) {
    return `<!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ul>${list}</ul>
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list : function (filelist) {
    return filelist.reduce(
      (str, cur) => (str += `<li><a href="?id=${cur}">${cur}</a></li>`),
      ""
    );
  }
}

