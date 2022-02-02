const pageContainer = document.querySelector(".pages");
const fileList = ['flex','grid01','grid02','foodstore','grid03', 'grid04','grid05', 'gallery', 'grid06'];
fileList.forEach(fileName => {
  const pageLink = document.createElement("a");
  pageLink.href = `/SCSSpractice/pages/${fileName}/index.html`;
  pageLink.innerText = fileName;
  const linkWrapper = document.createElement("li");
  linkWrapper.appendChild(pageLink);
  pageContainer.appendChild(linkWrapper);
  console.log(pageLink);
});
