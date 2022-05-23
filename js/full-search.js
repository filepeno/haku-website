import { displayResultFeedback, displayScope, HTML, trackPageControls } from "./search-interface";

//make not-global
let q;
let currentScope;
const size = 5;
const maxPages = 5;
let totalPages;
let totalHits;
let offset;
//

export default function findAll(query, scope) {
  q = query;
  currentScope = scope;

  console.log("query:", q, " & scope:", currentScope);
  offset = calculateOffset();
  console.log("current scope: ", currentScope);

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
  return Math.ceil(totalHits / size);
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
  calculateScope(offset, size);
  if ((currentScope > maxPages && totalPages > maxPages) || currentScope === 1) {
    appendPages();
  }
  setScopeData();
  /* displayCurrentPage(); */
}

function displayCurrentPage() {
  HTML.pageControls.forEach((element) => {
    element.classList.remove("current-page");
  });
  HTML.pagingWrapper.querySelector(`[data-scope="${currentScope}"]`).classList.add("current-page");
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
  console.log("append pages");
  const template = document.querySelector("#page-template").content;
  HTML.pagingWrapper.innerHTML = "";
  let remainingPages = totalPages - currentScope * maxPages;
  if (currentScope < maxPages) {
    console.log("current scope is smaller than max pages");
  } else {
    console.log("current scope is BIGGEr than max pages");
  }
  console.log("total pages: ", totalPages, "& remaining pages:", remainingPages);
  let scope = currentScope;
  if (totalPages > maxPages) {
    console.log("there are more pages than max pages");

    for (let i = 1; i <= maxPages; i++, scope++) {
      appendPage(scope);
    }
  } else if (totalPages <= maxPages) {
    console.log("there are less or same pages left than max pages, and current scope is:", currentScope);
    for (let i = 1; i <= totalPages; i++, scope++) {
      appendPage(scope);
    }
  }

  function appendPage(i) {
    console.log("append page", i);
    const clone = template.cloneNode(true);
    clone.querySelector("button").dataset.scope = i;
    clone.querySelector("button").textContent = i;
    HTML.pagingWrapper.appendChild(clone);
  }

  HTML.pageControls = HTML.pagingWrapper.querySelectorAll("button");
  trackPageControls();
}

//set next and previous scope to next and previous buttons
function setScopeData() {
  HTML.prevBtn.dataset.scope = currentScope - 1;
  HTML.nextBtn.dataset.scope = currentScope + 1;
}
