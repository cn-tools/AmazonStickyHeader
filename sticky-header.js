function getState(callback){
    chrome.storage.sync.get('state', function(data) {
      callback(data.state);
    });
}

function toggleStickyHeader(state){
    var elem = document.querySelector('header');
    var toggle = state ? elem.classList.add : elem.classList.remove;
    toggle.call(elem.classList, 'sticky_header');

    lDummyId = 'AmazonStickyHeaderHelper';
    var dummy_div = document.getElementById(lDummyId);
    if (dummy_div == null) {
      var dummy_div = document.createElement('div');
      dummy_div.id = lDummyId;
      elem.parentNode.insertBefore(dummy_div, elem.nextSibling);
    }
    var lHeight = state ? '' + elem.offsetHeight + 'px' : '';
    dummy_div.style.marginTop = lHeight;
}

chrome.storage.onChanged.addListener(function (data) {
    var state = data.state.newValue;
    toggleStickyHeader(state);
});

getState(function(state) {
    toggleStickyHeader(state);
});
