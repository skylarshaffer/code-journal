'use strict';
//  DOM queries
const $photoUrl = document.querySelector('#photoUrl');
const $formImg = document.querySelector('#formImg');
const $form = document.querySelector('form');
//  error coverage
if (!$photoUrl || !$formImg || !$form)
  throw new Error('One of the dom queries failed');
//  $photoUrl handleInput
$photoUrl.addEventListener('input', (event) => {
  const eventTarget = event.target;
  console.log(`value of ${eventTarget.name}:`, eventTarget.value);
  console.log(`validity of ${eventTarget.name}:`, eventTarget.checkValidity());
  if (eventTarget.checkValidity()) {
    console.log('$photoUrl input is valid, setting formImg src');
    $formImg.setAttribute('src', eventTarget.value);
  } else {
    console.log('$photoUrl input is not valid, resetting formImg src');
    $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});
//  $form handleSubmit
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const formSubmission = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  console.log(formSubmission);
  data.nextEntryId++;
  data.entries.unshift(formSubmission);
  $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  console.log(data);
});
