
// Uncomment when wanting to use app in production
// var userID = localStorage.getItem('ID')
// if(userID ===  null){
// 	userID = Math.random().toString(36).substring(7);
// 	localStorage.setItem('ID', userID);
// 	userID = localStorage.getItem('ID');
// }


//Test user comment out in production
var userID = localStorage.setItem("ID", "9h3aqpzj59dsbr3eg66r");
userID = localStorage.getItem('ID')
console.log(userID)

var myFireBase = new Firebase('https://fb-calorie-tracker.firebaseio.com/');
var mealRef = myFireBase.child("meals");
var mealQuery = new Firebase('https://fb-calorie-tracker.firebaseio.com/meals');
var goalRef = myFireBase.child("goals");
var goalQuery = new Firebase('https://fb-calorie-tracker.firebaseio.com/goals');

// get data from form
$("#myForm").submit(function(){
	var start = document.getElementById('start').value;
	var calories = document.getElementById('calories').value;
	var calories = parseInt(calories)
	var description = document.getElementById('description').value;
	var foodGroup = document.getElementById('foodGroup').value;

	// meal model  considering using update here ex: var mealRef = myfirebase.child("meals");
	//create a meal node

	mealRef.push({
      user: userID,
      startDate: start,
      calories: calories,
      description: description,
			foodGroup: foodGroup
  })
})

$("#goals").submit(function(){
	var goalWeeklyCal = document.getElementById('maxWeeklyCalories').value;
	var goalDailyCal = document.getElementById('maxDailyCalories').value;
	var goalMeat = document.getElementById('maxDailyMeat').value;
	var goalGrain = document.getElementById('maxDailyGrains').value;
	var goalDairy = document.getElementById('maxDailyDairy').value;
	var goalSweets = document.getElementById('maxDailySweets').value;

	goalRef.push({
			userID: userID,
			goalWeeklyCal: goalWeeklyCal,
			goalDailyCal: goalDailyCal,
			goalMeat: goalMeat,
			goalGrain: goalGrain,
			goalDairy: goalDairy,
			goalSweets: goalSweets

	})
	return false;
})




mealQuery.orderByChild('user').equalTo(userID).on('child_added', function(snapshot){
	var displayCalories = snapshot.val().calories;
	var displayStart = snapshot.val().startDate;
	var displayDescription = snapshot.val().description;
	var displayFoodGroup = snapshot.val().foodGroup;
	$("#results").append('<li>' + displayStart + ' ' + displayCalories + ' ' + displayDescription + ' ' + displayFoodGroup + '</li>')
	console.log(snapshot.val());
		},function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
});

goalQuery.orderByChild('userID').equalTo(userID).on('child_added', function(snapshot){
	console.log(snapshot.val());
})
