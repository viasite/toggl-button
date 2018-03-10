/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/
'use strict';

togglbutton.render('.taskCard-header-data-blocks .b-green-block-taskAfterLabel', {observe: true}, function (elem) {
  var div, link, description, tags, projectId,
    numElem = $('.b-task-general-id a'),
    projectElem = $('.task-project-text a'),
    existingTag = $('.b-toggl-btn.toggl.planfix'),
    taskId,
    titleElem,
    projectName = "",
    buttonOpts = {};

  titleElem = $('.b-task-param-editable a');
  if (titleElem == null) {
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
    taskId = numElem.textContent.replace('#', '');
    tags = [taskId];
  }

  div = document.createElement("div");
  div.classList.add("b-toggl-btn", "toggl", "planfix");
  div.style.display = "flex";
  elem.prepend(div);

  buttonOpts = {
    className: 'planfix',
    description: description,
    buttonType: 'minimal',
    projectName: projectElem && projectElem.textContent,
    tags: tags
  };

  fetch('https://localhost:8097/api/v1/toggl/entries/planfix/' + taskId + '/last')
    .then(response => {
      if (response.status != 200) {
        throw new Error('Failed to fetch ' + response.url + ', status ' + response.status);
      }
      return response.json();
    })
    .then(json => {
      if (json && json.project) {
        buttonOpts.projectName = json.project;
        buttonOpts.description = json.description;
      }
      link = togglbutton.createTimerLink(buttonOpts);
      div.appendChild(link);
    }, reject => {
      link = togglbutton.createTimerLink(buttonOpts);
      div.appendChild(link);
    });
});
