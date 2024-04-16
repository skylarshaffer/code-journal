// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global data */

//  Select photoUrl input
const $photoUrl = document.querySelector('#photoUrl') as HTMLElement;
const $formImg = document.querySelector('#formImg') as HTMLElement;

if (!$photoUrl || !$formImg) throw new Error('One of the dom queries failed');

$photoUrl.addEventListener('input', (event: Event) => {
  const eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  console.log(`value of ${eventTarget.name}:`, eventTarget.value);
  $formImg.setAttribute('src', eventTarget.value);
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
