/**
 * Created by feelyou on 2016-11-23.
 */

(() => {
  const HQ_URL_WITHOUT_SLASH = "http://192.168.50.7";

  //get yes24 code and HQ link for the title
  const url2 = document.documentURI;
  let yCode = url2.slice(url.toLowerCase().indexOf("/goods/") + 7);
  if(yCode.indexOf("?") > -1) yCode = yCode.slice(0, yCode.indexOf("?"));

  const LINK = `${HQ_URL_WITHOUT_SLASH}/searchTrendViewG.php?prodNo=${yCode}`;


  //add a new layer and show it :) from http://stackoverflow.com/a/19065024/6153990
  let div = document.createElement('div');
  with(div.style) {
    display = 'block';
    position = 'absolute';
    top = left = '0';
    width = '935px';
    padding = '5px 0 0 0';
    border = '1px solid purple';
    backgroundColor = 'white';
    zIndex = '999999';
    overflow = 'auto';
  }
  div.id = 'fy_div';
  div.innerHTML = `
    <a href="${LINK}" target="_blank">[new window]</a> 
    <a href="javascript:void(0)" onclick="document.body.removeChild(document.getElementById('${div.id}'));">[close]</a><br/>
    <iframe src="${LINK}" width="100%" style="height: 60vh;"></iframe>`;

  document.body.appendChild(div);
})();
