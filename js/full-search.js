import { displayResultFeedback, displayScope, HTML, trackPageControls } from "./search-interface";

//make not-global
let q;
let currentScope;
const size = 5;
const maxPages = 10;
let totalPages;
let totalHits;
let offset;
//

export default function findAll(query, scope) {
  q = query;
  /*   i = iteration; */
  currentScope = scope;
  if (currentScope == maxPages) {
    console.log("append pages from currentscope");
  }
  console.log("query:", q, " & scope:", currentScope);
  offset = calculateOffset();
  console.log("current scope: ", currentScope);
  setScopeData();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: "fullsearch",
    params: {
      include_facets: true,
      query_string: q,
      size: size,
      from: offset,
      //offset: 0
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://stromlin-es.test.headnet.dk/site-da-knowit/_search/template", requestOptions)
    .then((response) => response.json())
    .then((result) => cleanResults(result));
  /*     .catch((error) => console.log("error", error)); */
}

function calculateOffset() {
  return size * currentScope - size;
}

function calculateScope() {
  const from = offset + 1;
  let to;
  if (totalHits < offset + size) {
    to = totalHits;
  } else {
    to = offset + size;
  }
  displayScope(from, to);
}

function calculatePages() {
  return Math.ceil(totalHits / maxPages);
}

function cleanResults(result) {
  const hits = result.hits;
  console.log(hits);
  const content = hits.hits;
  totalHits = hits.total.value;
  if (content.length > 0) {
    displayResults(content);
  }
  displayResultFeedback(totalHits);
  totalPages = calculatePages(totalHits);
  appendPages();
  calculateScope(offset, size);
}

function displayResults(hits) {
  hits.forEach((hit) => {
    appendResult(hit);
  });
}

function appendResult(hit) {
  const parent = document.querySelector(".results-area");
  const template = document.querySelector("#result-template").content;
  const clone = template.cloneNode(true);
  const date = clone.querySelector(".date");
  const title = clone.querySelector(".result-title");
  const excerpt1 = clone.querySelector(".excerpt-1");
  const excerpt2 = clone.querySelector(".excerpt-2");

  date.textContent = hit._source.date_published;

  if (hit.highlight.title) {
    title.innerHTML = hit.highlight.title;
  } else {
    title.innerHTML = hit._source.title;
  }
  if (hit.highlight.body) {
    excerpt1.innerHTML = hit.highlight.body[0];

    if (hit.highlight.body[1]) {
      excerpt2.innerHTML = hit.highlight.body[1] + "...";
    }
  } else if (hit.highlight.description) {
    excerpt1.innerHTML = hit.highlight.description[0];
  }

  parent.appendChild(clone);
}

function appendPages() {
  const parent = document.querySelector(".paging");
  const template = document.querySelector("#page-template").content;
  parent.innerHTML = "";
  if (totalPages > maxPages) {
    for (let i = 1; i <= maxPages; i++) {
      appendPage(i);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      appendPage(i);
    }
  }

  function appendPage(i) {
    const clone = template.cloneNode(true);
    clone.querySelector("button").dataset.scope = i;
    clone.querySelector("button").textContent = i;
    parent.appendChild(clone);
  }

  parent.querySelector(`[data-scope="${currentScope}"]`).classList.add("current-page");
  HTML.pageControls = parent.querySelectorAll("button");
  trackPageControls();
}

//set next and previous scope to next and previous buttons
function setScopeData() {
  HTML.prevBtn.dataset.scope = currentScope - 1;
  HTML.nextBtn.dataset.scope = currentScope + 1;
}
