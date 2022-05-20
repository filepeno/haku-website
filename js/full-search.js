import { displayResultFeedback } from "./search-interface";

export default function findAll(q) {
  //from Postman
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: "fullsearch",
    params: {
      include_facets: true,
      query_string: q,
      size: 5,
      offset: 0,
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

function cleanResults(result) {
  const hits = result.hits;
  console.log(hits);
  const content = hits.hits;
  if (content.length > 0) {
    displayResults(content);
  }
  displayResultFeedback(hits.total.value);
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

  excerpt1.innerHTML = hit.highlight.body[0];

  if (hit.highlight.body[1]) {
    excerpt2.innerHTML = hit.highlight.body[1] + "...";
  }

  parent.appendChild(clone);
}
