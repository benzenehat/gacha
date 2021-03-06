// データ保管用スプレッドシート
// https://docs.google.com/spreadsheets/d/1sMwgSR-E-3FLZLSoMeFIntGrNNU02qpu8P0eU2QcZTE/edit?usp=sharing

//テストのURLを格納したスプレッドシート
// https://docs.google.com/spreadsheets/d/19fMjH5xZ19iYnyhJS8lQKeiLY37HUbgMTkmSXfienYY/edit?usp=sharing


function doGet() {
  
  var t = HtmlService.createTemplateFromFile('index.html');
  t.benzene="ベンゼンだよ〜";
  return t.evaluate();

}

function doPost(e){
  var sheetname = e.parameter.sheetname;
  var db_sheet = SpreadsheetApp.openById('1sMwgSR-E-3FLZLSoMeFIntGrNNU02qpu8P0eU2QcZTE').getActiveSheet();
  // 値を取得
  var registered_sheet_data = db_sheet.getDataRange().getValues();

  var url = "";
  for(var i = 1; i < registered_sheet_data.length; i++){
    if (registered_sheet_data[i][1] == sheetname){
      url = registered_sheet_data[i][2];
    }
  }
  
  if(url == ""){
    return HtmlService.createTemplateFromFile('404.html').evaluate();
  }

  // フォームの内容からidを取得
  // id = '19fMjH5xZ19iYnyhJS8lQKeiLY37HUbgMTkmSXfienYY'

  // スプレッドシートを取得
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var sheet = spreadsheet.getActiveSheet();

  // 値を取得
  var range = sheet.getDataRange();
  var values = range.getValues();

  // ランダムに取得
  var random = Math.random()
  console.log(random)
  var index;
  for(var i = 1; i < values.length; i++){
    index = i;
    random -= values[i][2];
    if (random <= 0){
      break;
    }
  }
  var name = values[index][0];
  var url = values[index][1];
  var rare = values[index][3];
  var message = values[index][4];

  console.log(name)
  console.log(url)
  console.log(rare)
  console.log(message)

  var t = HtmlService.createTemplateFromFile('gacha.html');
  t.name = name;
  t.url = url;
  t.rare = rare;
  t.message = message;
  t.sheetname = sheetname;
  return t.evaluate();
}