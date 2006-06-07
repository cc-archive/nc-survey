<div id="{screen['name']}" class="unselected" style="{'display: none' if screen is screens[0]}" py:for="screen in screens">
    <div showOn="select" class="question">
      <h2 class="term-optional-title">What can be terminated? Part 1 (of 7) of Section 1</h2>
      <p class="question-text">
	Did you, or the author or artist, create the <a href="glossary#work">work</a> within the 
	<a href="glossary#scope_of_employment">scope of your, or his or her, employment</a>?
      </p>
      
      <div class="question-options">
	<div class="option" py:for="option in screen['options']">
          <div class="option-input">
            <input onclick="hideDiv('{screen['name']}-error');" type="radio" name="{screen['name']}" value="${option}" />
          </div>
	  
          <div class="option-text">${option}</div>
	</div>
	
	<div class="question-error">
          <span id="${screen['name']}-error" class="invisible">Required Field</span>
	</div>
	
      </div>
      <div showOn="select" class="continue">
	<button type="button" class="button-continue" onclick="tot(this);" totID="${screen['name']}">Next</button>
	<button type="button" class="button-continue" onclick="back(this);">Back</button>
      </div>
    
      <br clear="both"/>
    </div><!-- ${screen['name']} -->
  </div>
