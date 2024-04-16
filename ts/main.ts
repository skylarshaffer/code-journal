/* global data */
//  FormElements extended interface
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

//  DOM queries
const $photoUrl = document.querySelector('#photoUrl') as HTMLInputElement;
const $formImg = document.querySelector('#formImg') as HTMLImageElement;
const $form = document.querySelector('form') as HTMLFormElement;

//  error coverage
if (!$photoUrl || !$formImg || !$form)
  throw new Error('One of the dom queries failed');

//  $photoUrl handleInput
$photoUrl.addEventListener('input', (event: Event) => {
  const eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  if (eventTarget.checkValidity()) {
    $formImg.setAttribute('src', eventTarget.value);
  } else {
    $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

//  $form handleSubmit
$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements: FormElements = $form.elements as FormElements;
  const formSubmission = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(formSubmission);
  $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
