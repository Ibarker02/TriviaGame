$(document).ready(function(){
  
   
    $("#timeLeft").hide();
    $("#begin").on('click', trivia.beginGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 25,
    timerOn: false,
    timerId : '',

    //My Questions
    questions: {
      q1: 'After retiring as a player, with which team did baseball great Babe Ruth spend one year as a coach?',
      q2: 'Why did the year 1994 see no baseball World Series?',
      q3: 'Which team is as well-known for their comic antics as for their on-court skills?',
      q4: 'What was banned from 1967 to 1976 in the NBA?',
      q5: 'Which NFL team is known as the "aints" when on a losing streak?',
      q6: 'Which country won the first World Cup held in 1930?',
      q7: 'Which sport did George Washington play with his troops?'
    },

    //My list of choices
    options: {
      q1: ['Yankees', 'Red Sox', 'Dodgers', 'Cubs'],
      q2: ['No good teams', 'Player Strike', 'Rain', 'Taylor Swift'],
      q3: ['Sonic', 'Bulls', 'Crows', 'Globetrotters'],
      q4: ['Crying', 'streaking', 'Slam Dunk', 'Cussing'],
      q5: ['Seahawks','Sailers','Patriots','Saints'],
      q6: ['Nigeria','Uruguay','US','Egypt'],
      q7: ['Basketball', 'Football', 'Baseball','Cricket']
    },

    //Correct Answers
    answers: {
      q1: 'Dodgers',
      q2: 'Player Strike',
      q3: 'Globetrotters',
      q4: 'Slam Dunk',
      q5: 'Saints',
      q6: 'Uruguay',
      q7: 'Cricket'
    },
    
    beginGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      
      $('#game').show();
      $('#answers').html('');
      $('#timer').text(trivia.timer);
      $('#begin').hide();
      $('#timeLeft').show();
      
      trivia.nextQuestion();
      
    },
     
    nextQuestion : function(){
      
      
      trivia.timer = 15;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
     
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
     
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#answers').html('<h3>Ran out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        
        $('#answers')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        
        $('#game').hide();
        
       
        $('#begin').show();
      }
      
    },
    
    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
      if($(this).text() === currentAnswer){
       
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#answers').html('<h3>That Is CORRRRECT!</h3>');
      }
      
      else{
       
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#answers').html('<h3>Better Study Your Sports! '+ currentAnswer +'</h3>');
      }
      
    },
   
    guessResult : function(){
      
   
      trivia.currentSet++;
      
    
      $('.option').remove();
      $('#answers h3').remove();
      
     
      trivia.nextQuestion();
       
    }
  
  }