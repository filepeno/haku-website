import { displayResultFeedback, displayScope } from "./search-interface";

//make not-global
let q;
let i;
const size = 5;
let totalHits;
let offset;
//

export default function findAll(query, iteration) {
  console.log("query:", query, " & iteration:", iteration);
  q = query;
  i = iteration;
  offset = calculateOffset(size, i);
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

function calculateOffset(size, i) {
  return size * i;
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
  const hits = result.hits;
  console.log(hits);
  const content = hits.hits;
  totalHits = hits.total.value;
  if (content.length > 0) {
    displayResults(content);
  }
  displayResultFeedback(totalHits);

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
