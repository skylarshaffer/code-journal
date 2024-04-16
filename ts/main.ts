/* global data */
//  FormElements extended interface
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $photoUrl = document.querySelector('#photoUrl') as HTMLInputElement;
const $formImg = document.querySelector('#formImg') as HTMLImageElement;
const $hiddenImg = document.querySelector('#hiddenImg') as HTMLImageElement;
const $form = document.querySelector('form') as HTMLFormElement;

//  error coverage
if (!$photoUrl || !$formImg || !$hiddenImg || !$form)
  throw new Error('One of the dom queries failed');

//  handleInput
$photoUrl.addEventListener('input', (event: Event) => {
  const eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  console.log(`value of ${eventTarget.name}:`, eventTarget.value);
  if (eventTarget.value.includes('.')) {
    let urlTrimmed = eventTarget.value;
    if (urlTrimmed.includes('https://')) {
      urlTrimmed = urlTrimmed.replace('https://', '');
    } else if (urlTrimmed.includes('http://')) {
      urlTrimmed = urlTrimmed.replace('http://', '');
    }
    console.log(urlTrimmed);
    console.log(
      'period exists in $photoUrl value, setting value as hidden image src.'
    );
    $hiddenImg.setAttribute('src', '//' + urlTrimmed);
  } else {
    console.log('period does not exist in $photoUrl value');
    $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

//  handleSubmit
$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements: FormElements = $form.elements as FormElements;
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

//  handleError
$hiddenImg.addEventListener('error', () => {
  $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
});

//  handleLoad
$hiddenImg.addEventListener('load', () => {
  $formImg.setAttribute('src', $hiddenImg.src);
});
/*

  //  set 'variable' to 'clicked element'
  const $eventTarget = event.target as HTMLDivElement;
  console.log('eventTarget', $eventTarget);
  //  if 'element clicked' is of class 'tab'
  if ($eventTarget.matches('.tab')) {
    console.log('Tab clicked (target matches tab selector).');
    //  for each 'element' of class 'tab'
    for (let i = 0; i < $tab.length; i++) {
      //  if 'element' equals 'clicked element'
      if ($tab[i] === $eventTarget) {
        //  add 'active' to 'class'
        $tab[i].classList.add('active');
      }
      //  all other elements
      else {
        //  remove 'active' from 'class'
        $tab[i].classList.remove('active');
      }
    }
    //  set 'variable' to 'value of data-view attribute of clicked element'
    const $eventTargetDataView = $eventTarget.getAttribute('data-view');
    //  for each 'element' of class 'view'
    for (let i = 0; i < $view.length; i++) {
      //  if 'element data-view' equals 'clicked element data-view'
      if ($view[i].dataset.view === $eventTargetDataView) {
        //  remove 'hidden' from 'class'
        $view[i].classList.remove('hidden');
      }
      //  all other elements
      else {
        //  add 'hidden' to 'class'
        $view[i].classList.add('hidden');
      }
    }
  }
}) */
