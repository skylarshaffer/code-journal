'use strict';
//  global DOM queries
//  variable definition
//  header
const $aEntries = document.querySelector('.navbar a');
//  entry-form
const $divEntryForm = document.querySelector('div[data-view="entry-form"]');
const $form = $divEntryForm.querySelector('form');
const $photoUrl = $form.querySelector('#photoUrl');
const $title = $form.querySelector('#title');
const $notes = $form.querySelector('#notes');
const $formImg = $form.querySelector('#formImg');
const $formHeading = $form.querySelector('form h2');
const $deleteEntry = $form.querySelector('#delete-entry');
//  entries
const $divEntries = document.querySelector('div[data-view="entries"]');
const $aNEW = $divEntries.querySelector('#new');
const $ul = $divEntries.querySelector('ul');
const $liEmpty = $ul.querySelector('li.empty');
//  dialog
const $dialog = document.querySelector('dialog');
const $cancel = $dialog.querySelector('#cancel');
const $confirm = $dialog.querySelector('#confirm');
//  global dom queries object
const domQueries = {
  $aEntries,
  $divEntryForm,
  $form,
  $photoUrl,
  $title,
  $notes,
  $formImg,
  $formHeading,
  $deleteEntry,
  $divEntries,
  $aNEW,
  $ul,
  $liEmpty,
  $dialog,
  $cancel,
  $confirm,
};
//  global dom queries error checking with specific reporting
for (const key in domQueries) {
  if (!domQueries[key]) throw new Error(`The ${key} dom query failed`);
}
//  $photoUrl handleInput
$photoUrl.addEventListener('input', (event) => {
  const eventTarget = event.target;
  if (eventTarget.checkValidity()) {
    $formImg.setAttribute('src', eventTarget.value);
    $formImg.setAttribute('alt', 'Your image');
  } else {
    $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
    $formImg.setAttribute('alt', 'Placeholder image');
  }
});
//  $form handleSubmit
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!data.editing) {
    const $formElements = $form.elements;
    const formSubmission = {
      title: $formElements.title.value,
      photoUrl: $formElements.photoUrl.value,
      notes: $formElements.notes.value,
      //  set entryId to next available
      entryId: data.nextEntryId,
    };
    data.nextEntryId++;
    data.entries.unshift(formSubmission);
    //  prepend list with rendered DOM
    $ul.prepend(renderEntry(formSubmission));
  } else {
    const $formElements = $form.elements;
    const formSubmission = {
      title: $formElements.title.value,
      photoUrl: $formElements.photoUrl.value,
      notes: $formElements.notes.value,
      //  set entryId to currently editing entryId
      entryId: data.editing.entryId,
    };
    //  loop through data.entries and replace the object with matching entryId
    let i = 0;
    while (i < data.entries.length) {
      if (data.entries[i].entryId === formSubmission.entryId) {
        data.entries[i] = formSubmission;
        break;
      }
      i++;
    }
    //  select li with matching data-entry-id
    const $liReplace = $ul.querySelector(
      `li.entry[data-entry-id="${formSubmission.entryId}"]`
    );
    //  replace corresponding li in list with rendered DOM
    $ul.replaceChild(renderEntry(formSubmission), $liReplace);
    //  reset form title and data.editing, hide delete entry
    $formHeading.textContent = 'New Entry';
    $deleteEntry.classList.add('hidden');
    data.editing = null;
  }
  $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  checkNoEntries();
  viewSwap('entries');
});
//  $ul handleClick
$ul.addEventListener('click', (event) => {
  const eventTarget = event.target;
  if (eventTarget.classList.contains('fa-pen')) {
    const $selectedLi = eventTarget.closest('li');
    if ($selectedLi) {
      let i = 0;
      while (i < data.entries.length) {
        if (
          data.entries[i].entryId.toString() === $selectedLi.dataset.entryId
        ) {
          data.editing = data.entries[i];
          break;
        }
        i++;
      }
      if (data.editing) {
        $photoUrl.value = data.editing.photoUrl;
        $title.value = data.editing.title;
        $notes.value = data.editing.notes;
        $formImg.src = data.editing.photoUrl;
      }
    }
    $formHeading.textContent = 'Edit Entry';
    $deleteEntry.classList.remove('hidden');
    viewSwap('entry-form');
  }
});
//  render HTML element for entry
function renderEntry(entry) {
  //  li
  const $li = document.createElement('li');
  $li.className = 'entry';
  $li.dataset.entryId = entry.entryId.toString();
  //  div.row
  const $row = document.createElement('div');
  $row.className = 'row';
  //  div.column-half 1
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.className = 'column-half';
  //  div.entry-item.image
  const $entryItemImage = document.createElement('div');
  $entryItemImage.className = 'entry-item image';
  //  img
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', 'Your image');
  $img.setAttribute(
    'onerror',
    "this.src='images/placeholder-image-square.jpg';this.alt='Placeholder image'"
  );
  //  div.column-half 2
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.className = 'column-half';
  //  div.entry-item.title
  const $entryItemTitle = document.createElement('div');
  $entryItemTitle.className = 'entry-item title hbar';
  //  h3
  const $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  //  i
  const $aPen = document.createElement('a');
  $aPen.className = 'fa-solid fa-pen';
  //  div.entry-item.notes
  const $entryItemNotes = document.createElement('div');
  $entryItemNotes.className = 'entry-item notes';
  //  p
  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  //  generate DOM
  $entryItemImage.appendChild($img);
  $columnHalf1.appendChild($entryItemImage);
  $entryItemTitle.appendChild($h3);
  $entryItemTitle.appendChild($aPen);
  $columnHalf2.appendChild($entryItemTitle);
  $entryItemNotes.appendChild($p);
  $columnHalf2.appendChild($entryItemNotes);
  $row.appendChild($columnHalf1);
  $row.appendChild($columnHalf2);
  $li.appendChild($row);
  return $li;
}
//  document handleDOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  let i = 0;
  while (i < data.entries.length) {
    $ul.appendChild(renderEntry(data.entries[i]));
    i++;
  }
  checkNoEntries();
  viewSwap(data.view);
});
//  check for entries state error, intelligently toggle no entries message
function checkNoEntries() {
  if (
    !(
      (document.querySelector('li.entry') &&
        $liEmpty.classList.contains('hidden')) ||
      (!document.querySelector('li.entry') &&
        !$liEmpty.classList.contains('hidden'))
    )
  ) {
    if (!document.querySelector('li.entry')) {
      $liEmpty.classList.remove('hidden');
    } else if (document.querySelector('li.entry')) {
      $liEmpty.classList.add('hidden');
    } else throw new Error();
  }
}
//  swap views based on string input
function viewSwap(string) {
  if (string === 'entries') {
    $divEntries.classList.remove('hidden');
    $divEntryForm.classList.add('hidden');
  } else if (string === 'entry-form') {
    $divEntries.classList.add('hidden');
    $divEntryForm.classList.remove('hidden');
  }
  data.view = string;
}
//  swap views based on clicked anchor
//  $aEntries handleClick
$aEntries.addEventListener('click', () => {
  viewSwap('entries');
});
//  $aNEW handleClick
$aNEW.addEventListener('click', () => {
  if ($photoUrl.value) $photoUrl.value = '';
  if ($title.value) $title.value = '';
  if ($notes.value) $notes.value = '';
  if ($formImg.src !== 'images/placeholder-image-square.jpg')
    $formImg.src = 'images/placeholder-image-square.jpg';
  $formHeading.textContent = 'New Entry';
  $deleteEntry.classList.add('hidden');
  data.editing = null;
  viewSwap('entry-form');
});
//  $deleteEntry handleClick
$deleteEntry.addEventListener('click', () => {
  $dialog.showModal();
});
//  $cancel handleClick
$cancel.addEventListener('click', () => {
  $dialog.close();
});
//  $confirm handleClick
$confirm.addEventListener('click', () => {
  if (data.editing) {
    //  loop through data.entries and delete first object with matching entryId
    let i = 0;
    while (i < data.entries.length) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries.splice(i, 1);
        break;
      }
      i++;
    }
    //  remove li with matching data-entry-id attribute
    $ul
      .querySelector(`li.entry[data-entry-id="${data.editing.entryId}"]`)
      ?.remove();
  }
  // if $li placeholder is not visible and there are no li entries, toggle li
  checkNoEntries();
  $dialog.close();
  viewSwap('entries');
});
