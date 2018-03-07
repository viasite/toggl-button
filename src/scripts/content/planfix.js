/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/
'use strict';

togglbutton.render('.taskCard-header-data-blocks .b-green-block-taskAfterLabel', {observe: true}, function (elem) {
  var div, link, description, tags, projectId,
    numElem = $('.b-task-general-id a'),
    projectElem = $('.task-project-text a'),
    existingTag = $('.b-toggl-btn.toggl.planfix'),
    titleElem;

  titleElem = $('.b-task-param-editable a');
  if(titleElem == null){
    // for users
    titleElem = $('.taskCard-header-data-blocks > .b-green-block > div > div')
  }

  if (existingTag) {
    if (existingTag.parentNode.firstChild.classList.contains('toggl')) {
      return;
    }
    existingTag.parentNode.removeChild(existingTag);
  }

  description = titleElem.textContent;
  if (numElem !== null) {
    description = description.trim();
    tags = [ numElem.textContent.replace('#', '') ];
  }

  div = document.createElement("div");
  div.classList.add("b-toggl-btn", "toggl", "planfix");
  div.style.display = "flex";

  link = togglbutton.createTimerLink({
    className: 'planfix',
    description: description,
    buttonType: 'minimal',
    projectName: projectElem && projectElem.textContent,
    tags: tags
  });

  div.appendChild(link);
  elem.prepend(div);
});
