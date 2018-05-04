const baiduCheckbox = document.querySelector('#baidu'),
      googleCheckbox = document.querySelector('#google')

chrome.storage.sync.get(['baiduTranslate', 'googleTranslate'], function(result) {
  baiduCheckbox.checked = result.baiduTranslate
  googleCheckbox.checked = result.googleTranslate
});

baiduCheckbox.addEventListener('change', checkBoxChangeListener)
googleCheckbox.addEventListener('change', checkBoxChangeListener)

function checkBoxChangeListener(event) {
  const { checked, id } = event.target
  console.log(`${id}Translate`, checked)
  chrome.storage.sync.set({
    [`${id}Translate`]: checked
  })
}