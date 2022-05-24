export function autoSuggest(q) {
  console.log("query", q);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: "autosuggest",
    params: {
      query_string: q,
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
    .then((result) => cleanResults(result))
    .catch((error) => console.log("error", error));
}

function cleanResults(result) {
  const hits = result.hits;
  const totalHits = hits.total.value;
  console.log("total hits:", totalHits);
  if (totalHits > 0) {
    displaySuggestions(hits);
  }
}

function displaySuggestions(hits) {
  console.log("hits", hits);
}
