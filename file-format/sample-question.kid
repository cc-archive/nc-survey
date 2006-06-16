<?xml version='1.0' encoding='utf-8' ?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:py="http://purl.org/kid/ns#"
>
<div id="${name}" class="unselected">
  <div class="question">
    <h2 class="term-optional-title" py:replace="screen_title">What can be terminated? Part 1 (of 7) of Section 1</h2>
    <p class="question-text" py:replace="question_title">
      Did you, or the author or artist, create the <a href="glossary#work">work</a> within the 
      <a href="glossary#scope_of_employment">scope of your, or his or her, employment</a>?
    </p>
    
    <div class="question-options">
      <div class="option" py:for="option in options">
        <div class="option-input">
          <input onclick="hideDiv('${screen['name']}-error');" type="radio" name="${screen['name']}" value="Yes" />
        </div>
	
        <div class="option-text">Yes</div>
      </div>
      
      <div class="option">
        <div class="option-input">
          <input onclick="hideDiv('${screen['name']}-error');" type="radio" name="${screen['name']}" value="No" />
        </div>
	
        <div class="option-text">No</div>
      </div>
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
</html>
