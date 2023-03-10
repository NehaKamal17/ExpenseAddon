function sendForEmail() {
   var emailAddress = Session.getEffectiveUser().getEmail();
    var htmlMessage = HtmlService.createHtmlOutputFromFile("Expense.html").getContent();
    var subject = "Subject";
    var message = "Its time to fill today's budget!!";
    MailApp.sendEmail(emailAddress, subject, message, {
        htmlBody: htmlMessage
    });
}

function createTimeDrivenTriggers() {
    ScriptApp.newTrigger('sendForEmail')
      .timeBased() 
      .everyMinutes(1)
      .create();
}

function Limit_Responses(){
  var max_responses = 1;
  var form_id = FormApp.getActiveForm().getId();
  console.log(id);
  var responses = form.getResponses();
  var len = responses.length;
  Logger.log(len);
}




function getSumWeekly() {
  var sum = 0;
  var form = FormApp.openById(getActiveFormId());
  var formResponses = form.getResponses();
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      var a = Number(itemResponse.getResponse());
      sum = sum + a;
    }
  }
  return sum;
}

function sendWeeklyReport(){
  var emailAddress = Session.getEffectiveUser().getEmail();
  var subject = "Weekly Expense Report";
  var c = getSumWeekly();
  var sumtostring = c.toString();
  var mailcontent = "The amount that you spent this week is " + sumtostring + "\n" + "sd";  
  
  MailApp.sendEmail(emailAddress, subject, mailcontent);
}

function getSpreadSheet(){
  
  
}

function getBarChart(){

}

function createTimeDrivenTriggerWeeklyReport() {
  ScriptApp.newTrigger('sendWeeklyReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(10)
    .create();
}




