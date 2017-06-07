/**
 * Created by feelyou on 2016-11-23.
 */

(function() {
  const HQ_URL_WITHOUT_SLASH = "http://59.6.230.250/";
  const HQ_START_DATE = new Date(2012, 0, 3);

  //get yes24 code and HQ link for the title
  //let url = document.documentURI;
  let yCode = url.slice(url.toLowerCase().indexOf("/goods/") + 7);
  if(yCode.indexOf("?") > -1) yCode = yCode.slice(0, yCode.indexOf("?"));

  const todayDate = new Date();

  const pubDateWebStr = document.getElementsByClassName('gd_date')[0].innerText.slice(0, 13);
  let pubDate = new Date(pubDateWebStr.slice(0,4), pubDateWebStr.slice(6,8) - 1, pubDateWebStr.slice(10,12) - 14);
  if(pubDate >= todayDate)
    pubDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 14);
  else if(pubDate < HQ_START_DATE)
    pubDate = HQ_START_DATE;

  const startDateStr = dateToYYYYMMDD(pubDate);
  const endDateStr = dateToYYYYMMDD(todayDate);
  const LINK = `${HQ_URL_WITHOUT_SLASH}/showTrend.php?sd=${startDateStr}&ed=${endDateStr}&prodList=${yCode}`;

  function dateToYYYYMMDD(date) {
    return date.getFullYear() +
      "0".repeat(2 - (date.getMonth() + 1).toString().length) + (date.getMonth() + 1) +
      "0".repeat(2 - (date.getDate()).toString().length) + (date.getDate());
  }

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
  div.innerHTML = `<a href="${LINK}" target="_blank">[more]</a> 
<a href="javascript:void(0)" onclick="document.body.removeChild(document.getElementById('${div.id}'));">[close]</a><br/>
<iframe src="${LINK}" width="100%" style="height: 60vh;"></iframe>`;

  document.body.appendChild(div);
}());
