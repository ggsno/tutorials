const quotes = [
  {
    quote: "1Life is like an chocolate box",
    author: "1forest gump",
  },
  {
    quote: "2Life is like an chocolate box",
    author: "2forest gump",
  },
  {
    quote: "3Life is like an chocolate box",
    author: "3forest gump",
  },
  {
    quote: "4Life is like an chocolate box",
    author: "4forest gump",
  },
]


const quote = document.querySelector("#quotes span:first-child");
const author = document.querySelector("#quotes span:last-child");
const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];
quote.innerText = todayQuote.quote;
author.innerText = todayQuote.author;