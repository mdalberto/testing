//angular.module('starter.services', [])
angular.module('PsychicSource.Favs', [])
.factory('FavsService', function(){
  var favs= [
    {
    "FavoriteAdvisorId":4704,
    "isFavoriteActive":true,
    "AdvisorId":289,
    "AdvisorName":"Stella",
    "AdvisorExtension":7343,
    "AdvisorPhoto":"7343.jpg",
    "IsLogIn":false,
    "Status":"Not Logged In",
    "IsOnIM":false,
    "IMStatusID":0,
    "IsOnPhone":true,
    "LogInStatusID":7,
    "IsPhoneLogIn":false,
    "OnPhoneConference":false,
    "CallBackStatusID":1,
    "ServiceAvailable":1
    },
    {
    "FavoriteAdvisorId":4704,
    "isFavoriteActive":true,
    "AdvisorId":289,
    "AdvisorName":"Bonnie",
    "AdvisorExtension":7982,
    "AdvisorPhoto":"7982.jpg",
    "IsLogIn":false,
    "Status":"Not Logged In",
    "IsOnIM":false,
    "IMStatusID":0,
    "IsOnPhone":true,
    "LogInStatusID":7,
    "IsPhoneLogIn":false,
    "OnPhoneConference":false,
    "CallBackStatusID":1,
    "ServiceAvailable":1
    },
    {
    "FavoriteAdvisorId":4704,
    "isFavoriteActive":true,
    "AdvisorId":289,
    "AdvisorName":"Penelope",
    "AdvisorExtension":7710,
    "AdvisorPhoto":"7710.jpg",
    "IsLogIn":false,
    "Status":"Not Logged In",
    "IsOnIM":false,
    "IMStatusID":0,
    "IsOnPhone":true,
    "LogInStatusID":7,
    "IsPhoneLogIn":false,
    "OnPhoneConference":false,
    "CallBackStatusID":1,
    "ServiceAvailable":1
    },
  ];
  return {
    all: function(){
      return favs;
    },
    remove: function(fav) {
      favs.splice(favs.indexOf(fav), 1);
      //Make call to delete from server
      //Fetch from server and redraw
    }
  }
})
