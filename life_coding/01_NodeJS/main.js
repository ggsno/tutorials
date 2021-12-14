const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const template = require("./lib/template.js");

const app = http.createServer((request, response) => {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathName = url.parse(_url, true).pathname;
  if (pathName === "/") {
    if (!queryData.id) {
      fs.readdir("data", "utf8", (err, filelist) => {
        if (err) throw err;
        const title = "Welcome!";
        const description = "Hello, Node.js";
        const list = template.list(filelist);
        const html = template.HTML(title, list,
          `<a href="/create">create</a>`,
          `<h2>${title}</h2><p>${description}</p>`
        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir("data", "utf8", (err, filelist) => {
        const filterdId = path.parse(queryData.id).base;
        fs.readFile(`data/${filterdId}`, "utf8", (err, description) => {
          const title = queryData.id;
          const sanitizedTitle = sanitizeHtml(title);
          const sanitizedDescription = sanitizeHtml(description);
          const list = template.list(filelist);
          const html = template.HTML(sanitizedTitle, list,
            `<a href="/create">create</a> <a href="/update?id=${sanitizedTitle}">update</a> 
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>` ,
            `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathName === '/create') {
    fs.readdir("data", "utf8", (err, filelist) => {
      const title = "WEB - create";
      const list = template.list(filelist);
      const html = template.HTML(title, list, '',
        `<form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description" id="" cols="30" rows="10"></textarea>
          </p>
          <p><input type="submit"></p>
        </form>
        `
      );
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathName === '/create_process') {
    let body = '';
    request.on('data', data => {
      body += data;
    });
    request.on('end', () => {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', err => {
        response.writeHead(302, {Location: encodeURI(`/?id=${title}`)});
        response.end("success");
      })
    });
  } else if (pathName === '/update') {
    fs.readdir("data", "utf8", (err, filelist) => {
      const filterdId = path.parse(queryData.id).base;
      fs.readFile(`data/${filterdId}`, "utf8", (err, description) => {
        const title = queryData.id;
        const list = template.list(filelist);
        const html = template.HTML(title, list,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`,
          `<form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description" id="" cols="30" rows="10">${description}</textarea>
            </p>
            <p><input type="submit"></p>
          </form>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathName === '/update_process') {
    let body = '';
    request.on('data', data => {
      body += data;
    });
    request.on('end', () => {
      const post = qs.parse(body);
      const id = post.id;
      const title = post.title;
      const description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, err => {
        fs.writeFile(`data/${title}`, description, 'utf8', err => {
          response.writeHead(302, {Location: encodeURI(`/?id=${title}`)});
          response.end("success");
        });
      });
    });
  } else if (pathName === '/delete_process') {
    let body = '';
    request.on('data', data => {
      body += data;
    });
    request.on('end', () => {
      const post = qs.parse(body);
      const id = post.id;
      const filterdId = path.parse(id).base;
      fs.unlink(`data/${filterdId}`, err => {
        response.writeHead(302, {Location: `/`});
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
