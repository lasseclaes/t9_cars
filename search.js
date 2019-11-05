window.addEventListener("DOMContentLoaded", init);

const preloader={
  visible:true,
  wrapper:null,
  setup(){
    wrapper = document.createElement("div");
    for(let i=0; i<5; i++){
      const kid = document.createElement("div");
      kid.style.animationDelay=Number("0."+i-0.2)+"s"
      wrapper.appendChild(kid);
    }
    wrapper.id="preloader";
    document.body.prepend(wrapper);
  },
  _setVisible(visible){
    this.visible=visible;
    wrapper.style.display = this.visible ? "flex":"none";
  },
  toggle(){
    this._setVisible(!this.visible);
  },
  hide(){
    this._setVisible(false);
  },
  show(){
    this._setVisible(true);
  },
}

function init(){

  preloader.setup();
  getData();

}
function getData(){
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");
  //console.log("getData")

  fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed&search="+search)
    .then(res=>res.json())
    .then(handleData)
}
function handleData(myData){
  //console.log(myData);
  preloader.hide();
  //1 loop
  myData.forEach(showPost)



}
function showPost(post){
  console.log(post)
  const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;


  const template = document.querySelector(".postTemplate").content;
  const postCopy = template.cloneNode(true);
  //3. textcontent & innerHTML
  const h1 = postCopy.querySelector("h1");
  h1.textContent=post.title.rendered;

  const img = postCopy.querySelector("img.cover");

  img.setAttribute("src", imgPath)
  img.setAttribute("alt", "Cover of the book " + post.title.rendered)

  const a = postCopy.querySelector("a");
  a.href="sub.html?id="+post.id

  const content = postCopy.querySelector("section");
  content.innerHTML=post.content.rendered;

  const publisher = postCopy.querySelector(".publisher");
  publisher.innerHTML=post.publisher;

  //4 append
  document.querySelector("#posts").appendChild(postCopy)
}






