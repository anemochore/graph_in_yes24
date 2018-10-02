(() => {
  const UNIQUE_ID = 'fy_div';
  let DOC = document;
  let DIV = document.getElementById(UNIQUE_ID);

  if(!DIV) 
    DIV = document.body;
  else 
    DOC = DIV.getElementsByTagName('iframe')[0].contentDocument;
  
  const UNIQUE_ID_EXT = 'fy_div_ext';
  const GRAPH_NUMBER = 3;

  let ids = [];
  for(let i=0; i<GRAPH_NUMBER; i++) {
    let div = document.createElement('div');
    ids[i] = UNIQUE_ID_EXT+'_'+i;
    div.id = ids[i];
    DIV.appendChild(div);
  }
  
  //이미 로드되어 있음(구 버전)
  /*
  let g = document.createElement('script');
  document.head.appendChild(g);
  g.onload = function() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(start);
  };
  g.src = 'https://www.gstatic.com/charts/loader.js';
  */
  start(DOC, ids);
  
  
  function start(DOC, ids) {
    const tbl = DOC.getElementById('tbl');
    let dates = [...tbl.rows[1].cells].map(td => td.textContent);
    let idxes = [...tbl.rows[2].cells].slice(2).map(td => parseInt(td.textContent.replace(/,/g, '')));
    
    let lastNaNIndex;
    for(let i=0; i<idxes.length; i++) 
      if(isNaN(idxes[i])) lastNaNIndex = i;
    
    if(lastNaNIndex) {
      dates = dates.slice(lastNaNIndex+1);
      idxes = idxes.slice(lastNaNIndex+1);
    }
    
    let MA30 = [], MA10 = [], MACD = [], MACD_S = [], OSC = [];
    for(let i=29; i<dates.length; i++) 
      MA30[i] = average(idxes.slice(i-29, i+1));
    
    for(let i=9; i<dates.length; i++) 
      MA10[i] = average(idxes.slice(i-9, i+1));
    
    for(let i=29; i<dates.length; i++) 
      MACD[i] = MA10[i] - MA30[i];
    
    for(let i=38; i<dates.length; i++) 
      MACD_S[i] = average(MACD.slice(i-9, i+1));
       
    let MA30_MA10 = [], MACD_MACD_S = [];
    for(let i=0; i<8; i++) 
      MA30_MA10[i] = [dates[i], null, null];
    for(let i=9; i<dates.length; i++) 
      MA30_MA10[i] = [dates[i], MA30[i], MA10[i]];
    
    for(let i=0; i<28; i++) 
      MACD_MACD_S[i] = [dates[i], null, null];
    for(let i=29; i<dates.length; i++) 
      MACD_MACD_S[i] = [dates[i], MACD[i], MACD_S[i]];
    
    for(let i=0; i<37; i++) 
      OSC[i] = [dates[i], 0];
    for(let i=38; i<dates.length; i++) 
      OSC[i] = [dates[i], MACD[i] - MACD_S[i]];
    
    console.log(MA30_MA10)
    console.log(MACD_MACD_S)
    console.log(OSC)
    MA30_MA10 = MA30_MA10.filter(t => t);
    MACD_MACD_S = MACD_MACD_S.filter(t => t);
    OSC = OSC.filter(t => t);
    
    drawChart([['string', '날짜'], ['number', 'MA30'], ['number', 'MA10']], MA30_MA10, ids[0]);
    drawChart([['string', '날짜'], ['number', 'MACD'], ['number', 'MACD-S']], MACD_MACD_S, ids[1]);
    drawChart([['string', '날짜'], ['number', '오실레이터']], OSC, ids[2], 'column');
    
    
    function drawChart(columns, rows, id, type = 'line') {
      //by 배용석
      const OPT = { 
        width: 1800, height: 300, fontSize: 10,
        //title: '어흥' ,
        titleTextStyle: {color: 'black', fontName: '굴림', fontSize: 13}
      }; 
    
      let data = new google.visualization.DataTable();
      for(let i=0; i<columns.length; i++) 
        data.addColumn(columns[i][0], columns[i][1]);
      data.addRows(rows);

      let chart;
      if(type==='column') chart = new google.visualization.ColumnChart(DOC.getElementById(id));
      else                chart = new google.visualization.LineChart(DOC.getElementById(id));
      
      chart.draw(data, OPT);
    }
    
    function average(arr) {
      return arr.reduce((p, c) => p+c, 0)/arr.length;
    }
    
  }
})();
