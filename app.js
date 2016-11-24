/**
 * Created by feelyou on 2016-11-23.
 */

(function() {
  const HQ_URL = "http://59.6.230.250/";

  //get yes24 code and HQ link for the title
  //let url = document.documentURI;
  let yCode = url.slice(url.indexOf("/goods/")+7);
  if(yCode.indexOf("?") > -1) yCode = yCode.substr(0, yCode.indexOf("?"));

  let pubDateStr = document.getElementsByClassName('pdDate')[0].innerText.slice(0, 13);
  let pubDate = pubDateStr.slice(0,4) + pubDateStr.slice(6,8) + pubDateStr.slice(10,12);

  let todayDate = new Date();
  let today = todayDate.getFullYear() +
    "0".repeat(2 - (todayDate.getMonth() + 1).toString().length) + (todayDate.getMonth() + 1) +
    "0".repeat(2 - (todayDate.getDate()).toString().length) + (todayDate.getDate());

  let LINK = HQ_URL + 'showTrend.php?sd=' + pubDate + '&ed=' + today + '&prodList=' + yCode;


  //add a new layer and show it :)
  //from http://stackoverflow.com/a/19065024/6153990
  let div = document.createElement('div');
  with(div.style) {
    display = 'block';
    position = 'absolute';
    top = left = '0';
    width = '935px';
    height = '45%';
    padding = '5px 0 0 0';
    border = '1px solid purple';
    backgroundColor = 'white';
    zIndex = '999999';
    overflow = 'auto';
  }
  div.id = 'fy_div';
  div.innerHTML = '<a href="' + LINK + '" target="_blank">[more]</a> ' +
    '<a href="javascript:void(0)" onclick="document.body.removeChild(document.getElementById(' + "'fy_div'" + '));">[close]</a><br/>' +
    '<iframe src="' + LINK + '" width="100%" style="height: 60vh;"></iframe>';
  document.body.appendChild(div);
}());
