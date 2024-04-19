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
const $aNew = $divEntries.querySelector('#new');
const $ul = $divEntries.querySelector('ul');
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
  $aNew,
  $ul,
  $dialog,
  $cancel,
  $confirm,
};
//  global dom queries error checking with specific reporting
for (const key in domQueries) {
  if (!domQueries[key]) throw new Error(`The ${key} dom query failed`);
}
//  unhide HTML element
function showHTML(element) {
  element.classList.remove('hidden');
}
//  hide HTML element
function hideHTML(element) {
  element.classList.add('hidden');
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
  const $formElements = $form.elements;
  const formSubmission = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    //  set entryId to next available
    entryId: data.nextEntryId,
  };
  //  if editing is null
  if (!data.editing) {
    data.entries.unshift(formSubmission);
    //  prepend list with rendered DOM
    $ul.prepend(renderEntry(formSubmission));
    data.nextEntryId++;
    //  if currently editing
  } else {
    //  replace entryId with current post entryId
    formSubmission.entryId = data.editing.entryId;
    //  loop through data.entries and replace the object with matching entryId
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === formSubmission.entryId) {
        data.entries[i] = formSubmission;
        break;
      }
    }
    //  select li with matching data-entry-id
    const $liReplace = $ul.querySelector(
      `li.entry[data-entry-id="${formSubmission.entryId}"]`
    );
    //  replace corresponding li in list with rendered DOM
    $ul.replaceChild(renderEntry(formSubmission), $liReplace);
    //  reset form title and data.editing, hide delete entry
    $formHeading.textContent = 'New Entry';
    $form.classList.remove('editing');
    data.editing = null;
  }
  $formImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  viewSwap('entries');
});
//  $ul handleClick
$ul.addEventListener('click', (event) => {
  const eventTarget = event.target;
  if (eventTarget.classList.contains('fa-pen')) {
    const $selectedLi = eventTarget.closest('li');
    if ($selectedLi) {
      for (let i = 0; i < data.entries.length; i++) {
        if (
          data.entries[i].entryId.toString() === $selectedLi.dataset.entryId
        ) {
          data.editing = data.entries[i];
          break;
        }
      }
      if (data.editing) {
        $photoUrl.value = data.editing.photoUrl;
        $title.value = data.editing.title;
        $notes.value = data.editing.notes;
        $formImg.src = data.editing.photoUrl;
      }
    }
    $formHeading.textContent = 'Edit Entry';
    $form.classList.add('editing');
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
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
});
//  swap views based on string input
function viewSwap(string) {
  if (string === 'entries') {
    showHTML($divEntries);
    hideHTML($divEntryForm);
  } else if (string === 'entry-form') {
    showHTML($divEntryForm);
    hideHTML($divEntries);
  } else
    throw new Error('Provided string does not match either possible options');
  data.view = string;
}
//  swap views based on clicked anchor
//  $aEntries handleClick
$aEntries.addEventListener('click', () => {
  viewSwap('entries');
});
//  $aNew handleClick
$aNew.addEventListener('click', () => {
  if ($photoUrl.value) $photoUrl.value = '';
  if ($title.value) $title.value = '';
  if ($notes.value) $notes.value = '';
  if ($formImg.src !== 'images/placeholder-image-square.jpg')
    $formImg.src = 'images/placeholder-image-square.jpg';
  $formHeading.textContent = 'New Entry';
  $form.classList.remove('editing');
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
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries.splice(i, 1);
        break;
      }
    }
    //  remove li with matching data-entry-id attribute
    $ul
      .querySelector(`li.entry[data-entry-id="${data.editing.entryId}"]`)
      ?.remove();
  }
  $dialog.close();
  viewSwap('entries');
});
