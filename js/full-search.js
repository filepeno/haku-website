import { clearResults, displayResultFeedback, displayScope } from "./search-interface";
import Pagination from "tui-pagination";

//make not-global
let q;
let currentScope;
const size = 5;
const maxPages = 10;
let totalHits;
let offset;
//

export function findAll(query, scope) {
  console.log("find all");
  q = query;
  /*   i = iteration; */
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

function cleanResults(result) {
  console.log("result", result);
  const hits = result.hits;
  console.log(hits);
  const content = hits.hits;
  totalHits = hits.total.value;
  if (content.length > 0) {
    displayResults(content);
  }
  displayResultFeedback(totalHits);
  initPagination();
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

export function initPagination() {
  if (currentScope === 1) {
    const container = document.getElementById("tui-pagination-container");
    const pagination = new Pagination(container, {
      totalItems: totalHits,
      itemsPerPage: size,
      visiblePages: maxPages,
      template: {
        page: '<button class="tui-page-btn text-link scope-btn">{{page}}<button>',
        currentPage: '<button class="tui-page-btn tui-is-selected current-page text-link scope-btn">{{page}}</button>',
        moveButton: '<button class="tui-page-btn tui-{{type}} custom-class-{{type}} text-link scope-btn" >' + '<span class="tui-ico-{{type}}">{{type}}</span>' + "</button>",
        disabledMoveButton: '<button class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}} text-link scope-btn">' + '<span class="tui-ico-{{type}}">{{type}}</span>' + "</button>",
        moreButton: '<button class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' + '<span class="tui-ico-ellip">...</span>' + "</button>",
      },
    });
    /*  pagination.movePageTo(currentScope); */
    console.log("current page:", pagination.getCurrentPage());

    pagination.on("afterMove", ({ page }) => {
      console.log("new page:", page);
      clearResults();
      findAll(q, page);
    });
  }
}
