export default function findAll(q) {
  //from Postman
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: "fullsearch",
    params: {
      include_facets: true,
      query_string: q,
      size: 10,
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
  displayResults(hits);
}

function displayResults(hits) {
  const contentToAppend = hits.hits;
  //clear parent content
  const parent = document.querySelector(".results-area");
  parent.innerHTML = "";
  contentToAppend.forEach((hit) => {
    appendResult(hit, parent);
  });
}

function appendResult(hit, parent) {
  const template = document.querySelector("#result-template").content;
  const clone = template.cloneNode(true);
  clone.querySelector(".date").textContent = hit.highlight.date_published;
  clone.querySelector(".result-title").textContent = hit.highlight.title;
  clone.querySelector(".excerpt").textContent = hit.highlight.body;
  parent.appendChild(clone);
}
