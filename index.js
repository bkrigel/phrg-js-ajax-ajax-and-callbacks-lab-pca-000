$(document).ready(function (){
});

function displayError() {
  return $('#errors').html("There's been an error. Please try again.")
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    console.log(data);
    $(`#results`).html(renderSearchResults(data))
  }).fail(error => {
    displayError()
  })
}

function renderSearchResults(data) {
  return data.items.map( result => renderSearchResult(result))
}

function renderSearchResult(result) {
  return (`
    <div>
      <br>
      <strong>Repository:</strong> <a href="${result.html_url}">${result.name}</a>
      <br>
      <small><strong>Description:</strong> ${result.description}
      <br>
      - <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a>
      <br>
      <br>
      <strong>User:</strong> <img src="${result.owner.avatar_url}" alt="${result.name}'s Avatar" width="30px" height="30px"> <a href="${result.owner.html_url}">${result.owner.login}</a></small>
      <br>
      <br>
      --------------------------------------------------------------------------
      <br>
    </div>
  `)
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
    $(`#details`).html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

function renderCommits(data) {
  return data.map(result => renderCommit(result))
}

function renderCommit(commit) {
  return (`
    <div>
      <br>
      <strong>Author:</strong> <img src="${commit.author.avatar_url}" alt="${commit.name}'s Avatar" width="30px" height="30px"> <a href="${commit.author.html_url}">${commit.author.login}</a>
      <br>
      <small><strong>Message:</strong> ${commit.commit.message}
      <br>
      <strong>SHA:</strong> ${commit.sha}</small>
      <br>
      <br>
      --------------------------------------------------------------------------
      <br>
    </div>
  `)
}
