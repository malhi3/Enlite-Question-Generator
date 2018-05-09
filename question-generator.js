var storageRef = firebase.storage().ref();
var ansDatabase = firebase.database();

var imgLoadedCounter = 0;

function randomiseQuestion(){
	var table = document.getElementById("table");
	var loader = document.getElementById('loader');
	
	imgLoadedCounter = 0;
	
	while (table.hasChildNodes()) {   
    	table.removeChild(table.firstChild);
	}
	table.style.display = "none";
	
	var numberField = document.getElementById("selectNumber");
	var number = numberField.value;
	
	var placeholder = document.getElementById("placeholder-text");
	placeholder.style.display = "none";
	
	loader.style.display = "block";
	
	var toggleButton = document.getElementById("toggle-button");
	toggleButton.style.display = "none";
	
	var optionsText = document.getElementById("generation-line");
	optionsText.style.width="950px";
	
	var subjectList = document.getElementById("selectSubject");
	var subject = subjectList.options[subjectList.selectedIndex].text;
	
	var arr = [];
	while(arr.length < number){
    	var randomNumber = Math.floor((Math.random()*30) + 1);
    	if(arr.indexOf(randomNumber) > -1) {continue;}
    	arr[arr.length] = randomNumber;
	}
	//window.alert(arr);
	
	for(var i=0; i<arr.length; i++){
	 	var randomisedNumber = arr[i];
		var parentTD = "q"+i;
		var incrementTD = "i"+i;
		var parentTR = "tr"+i;
		//window.alert("loop");
	 	addQuestion(i+1, randomisedNumber, parentTD, parentTR, incrementTD, subject);
	}
}

function addQuestion(increment, questionNo, parentTdId, parentTrId, incrementTdId, subject){
	//setting display of answers buttons to block
	var answersList = document.getElementById("answers-list");
	answersList.style.display = "block";
	
	//Creating table and child tr
		var table = document.getElementById("table");
		var tr = document.createElement("tr");
		tr.setAttribute("id", parentTrId);
		table.appendChild(tr);
		
		//Creating child td and incrememnt td
		var td = document.createElement("td");
		td.setAttribute("id", parentTdId);
		td.setAttribute("class", "question-td");
		var itd = document.createElement("td");
		itd.setAttribute("id", incrementTdId);
		itd.setAttribute("class", "number-td");
		itd.setAttribute("valign", "top");
		tr.appendChild(itd);
		tr.appendChild(td);
		
		//Creating question images
		var question = document.createElement("img");
		question.setAttribute("id", "Bio"+increment);
		
		//Creating numbering on the side
		var qnumber = document.createElement("p");
		qnumber.setAttribute("class", "qnumber left-box");
		qnumber.innerHTML = "Q"+increment;
	
	//Creating Answer Text
	var ans = document.createElement('p');
	ans.setAttribute("class", "answer left-box");
	ans.style.display = "none";
	
	storageRef.child('Paper2/'+subject+'/'+subject.slice(0, 4)+questionNo+'.png').getDownloadURL().then(function(url){
		//window.alert("function");
		//window.alert(questionNo);
		ansDatabase.ref(subject+"/"+subject.slice(0, 4)+questionNo).on('value', function(snapshot){
			//window.alert(snapshot.val()+" "+questionNo);
			ans.innerHTML = snapshot.val();
		});
		
		question.setAttribute("src", url);
		question.setAttribute("onload", "loaded()");
	});
	
	
	td.appendChild(question);
	itd.appendChild(qnumber);
	itd.appendChild(ans);
}

function toggleAnswers(){
	var answerElements = document.getElementsByClassName('answer');
	var toggleButton = document.getElementById('toggle-button');
	for (var i in answerElements) {
  		if (answerElements[i].style.display === "none") {
    		answerElements[i].style.display = 'block';
			toggleButton.innerHTML = "Hide Answers";
  		} else {
			answerElements[i].style.display = 'none';
			toggleButton.innerHTML = "Show Answers";
		}
	}
}

function loaded(){
	imgLoadedCounter+=1;
	var numberField = document.getElementById("selectNumber");
	var number = numberField.value;
	
	if (imgLoadedCounter==number){
		var table = document.getElementById("table");
		var loader = document.getElementById('loader');
		var toggleButton = document.getElementById('toggle-button');
		loader.style.display = "none";
		table.style.display = "table";
		var optionsText = document.getElementById("generation-line");
		optionsText.style.width="1200px";
		toggleButton.style.display = "block";
	} else {
		return;
	}
}


