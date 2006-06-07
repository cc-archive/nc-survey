<div id="employee" class="unselected">
  <div showOn="select" class="question">
    <h2 class="term-optional-title">What can be terminated? Part 1 (of 7) of Section 1</h2>
    <p class="question-text">
      Did you, or the author or artist, create the <a href="glossary#work">work</a> within the 
      <a href="glossary#scope_of_employment">scope of your, or his or her, employment</a>?
    </p>
    
    <div class="question-options">
      <div class="option">
        <div class="option-input">
          <input onclick="hideDiv('employee-error');" type="radio" name="employee" value="Yes" />
        </div>
	
        <div class="option-text">Yes</div>
      </div>
      
      <div class="option">
        <div class="option-input">
          <input onclick="hideDiv('employee-error');" type="radio" name="employee" value="No" />
        </div>
	
        <div class="option-text">No</div>
      </div>
    </div>
    
    <div class="question-error">
      <span id="employee-error" class="invisible">Required Field</span>
    </div>
    
  </div>
  <div showOn="select" class="continue">
    <button type="button" class="button-continue" onclick="tot(this);" totID="employee">Next</button>
    <button type="button" class="button-continue" onclick="back(this);">Back</button>
  </div>
  
  <br clear="both"/>
</div><!-- employee -->
