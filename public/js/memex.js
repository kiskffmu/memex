'use strict';

function Memex() {
	this.state = 1;
	
	this.START = 1;
	this.QUESTION = 2;
	this.ANSWER = 3;
	this.END = 4;
	
	this.card = null;
	this.question = null;
	this.answer = null;
	
	this.questions = null;
	this.currentQuestion = null;
	
	this.playButton = null;
	this.closeButton = null;
}

Memex.prototype.init = function() {
	if (document.querySelectorAll('dl.question').length > 0) {
		this.preparePlayButton();
		this.prepareCard();
		this.prepareQuestions();	
		
		document.querySelector('body').addEventListener('keydown', function(e) {
			if ((this.state == this.QUESTION || this.state == this.ANSWER) && [39, 13, 32].indexOf(e.keyCode) > -1) {
				this.proceed();
			}
		}.bind(this));
	}
}

Memex.prototype.prepareQuestions = function() {
	var dls = document.querySelectorAll('dl.question');
	var questions = Array.prototype.map.call(dls, function(el) {
		return {
			cat: el.dataset.topic,
			q: el.querySelector('dt').innerHTML,
			a: el.querySelector('dd').innerHTML
		}
	});
	this.questions = shuffle(questions);
}

Memex.prototype.preparePlayButton = function() {
	this.playButton = document.createElement('A');
	this.playButton.classList.add('playButton');
	this.playButton.setAttribute('href', '#');
	this.playButton.innerHTML = '▶&#xFE0E;';
	document.querySelector('body').appendChild(this.playButton);
	
	this.playButton.addEventListener('click', function(e) {
		this.showCard();
	}.bind(this));
}

Memex.prototype.prepareCard = function() {
	var body = document.querySelector('body');
	
	this.card = document.createElement('DIV');
	this.card.classList.add('card');
	this.card.classList.add('animated');
	this.card.classList.add('hidden');
	body.appendChild(this.card);
	
	this.question = document.createElement('DIV');
	this.question.classList.add('question');
	this.card.appendChild(this.question);
	
	this.answer = document.createElement('DIV');
	this.answer.classList.add('answer');
	this.card.appendChild(this.answer);
	
	this.closeButton = document.createElement('A');
	this.closeButton.classList.add('closeButton');
	this.closeButton.setAttribute('href', '#');
	this.closeButton.innerHTML = '✕&#xFE0E;';
	this.closeButton.addEventListener('click', function(e) { this.hideCard(); }.bind(this));
	this.card.appendChild(this.closeButton);
	
	this.card.addEventListener('click', function(e) {
		this.proceed();
	}.bind(this));
}

Memex.prototype.showCard = function() {
	this.card.classList.remove('hidden');
	this.card.classList.remove('bounceOutDown');
	this.card.classList.add('bounceInUp');
	
	this.resetCard();
}

Memex.prototype.hideCard = function() {
	this.card.classList.remove('bounceInUp');	
	this.card.classList.add('bounceOutDown');	
}

Memex.prototype.resetCard = function() {
	this.question.innerHTML = '';
	this.answer.innerHTML = '';	
}

Memex.prototype.resetCard = function() {
	this.currentQuestion = this.questions.pop();
	removeCategoryClasses(this.card);
	this.card.classList.add('category' + leftPadZero(this.currentQuestion.cat));
	this.question.innerHTML = '<p>' + this.currentQuestion.q + '</p>';
	this.answer.innerHTML = '';
	
	this.state = this.QUESTION;
}

Memex.prototype.showAnswer = function() {
	this.answer.innerHTML = '<p>' + this.currentQuestion.a + '</p>';
	
	this.state = this.ANSWER;
}

Memex.prototype.proceed = function() {
	switch (this.state) {
		case this.START:
			break;
		case this.QUESTION:
			this.showAnswer();
			break;
		case this.ANSWER:
			if (this.questions.length) {
				this.resetCard();
			} else {
				this.prepareQuestions();
				this.hideCard();
				this.resetCard();
			}
			break;
		case this.END:
			break;
	}
}





function leftPadZero(num) {
	num = Math.floor(num);

	if (num < 10) return '0' + num;
	else return num;
}

function removeCategoryClasses(el) {
	for (var i = 1; i <= 20; i++) {
		el.classList.remove('category' + leftPadZero(i));
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
