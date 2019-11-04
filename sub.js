const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)


fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book/"+id)
  .then(res=>res.json())
.then(showBook)


function showBook(book){
  console.log(book)
  document.querySelector("article h1").textContent=book.title.rendered
}