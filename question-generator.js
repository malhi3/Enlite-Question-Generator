var storageRef = firebase.storage().ref();
var ansDatabase = firebase.database();

function randomiseQuestion(){
	var table = document.getElementById("table");
	
	while (table.hasChildNodes()) {   
    	table.removeChild(table.firstChild);
	}
	
	var subjectList = document.getElementById("selectSubject");
	var subject = subjectList.options[subjectList.selectedIndex].text;
	
	var numberField = document.getElementById("selectNumber");
	var number = numberField.value;
	
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
		var itd = document.createElement("td");
		itd.setAttribute("id", incrementTdId);
		itd.setAttribute("valign", "top");
		tr.appendChild(itd);
		tr.appendChild(td);
		
		//Creating question images
		var question = document.createElement("img");
		question.setAttribute("id", "Bio"+increment);
		
		//Creating numbering on the side
		var h3 = document.createElement("h3");
		h3.innerHTML = increment+".";
	
	//Creating Answer Text
	var ans = document.createElement('h3');
	ans.setAttribute("class", "answer");
	ans.style.display = "none";
	
	storageRef.child('Paper2/'+subject+'/'+subject.slice(0, 4)+questionNo+'.png').getDownloadURL().then(function(url){
		//window.alert("function");
		//window.alert(questionNo);
		ansDatabase.ref(subject+"/"+subject.slice(0, 4)+questionNo).on('value', function(snapshot){
			//window.alert(snapshot.val()+" "+questionNo);
			ans.innerHTML = snapshot.val();
		});
		
		question.setAttribute("src", url);
	});
	
	
	td.appendChild(question);
	itd.appendChild(h3);
	itd.appendChild(ans);
}

function toggleAnswers(){
	var answerElements = document.getElementsByClassName('answer');
	for (var i in answerElements) {
  		if (answerElements[i].style.display == "none") {
    		answerElements[i].style.display = 'block';
  		} else {
			answerElements[i].style.display = 'none';
		}
	}
}