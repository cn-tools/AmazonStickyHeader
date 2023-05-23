function getState(callback){
    chrome.storage.sync.get('state', function(data) {
      callback(data.state);
    });
}

function toggleStickyHeader(state){
    // add/remove css class to header
    var elem = document.querySelector('header');
    if (elem != null) {
        var toggle = state ? elem.classList.add : elem.classList.remove;
        toggle.call(elem.classList, 'sticky_header');

        // insert div element for helping to sticky header
        lDummyId = 'AmazonStickyHeaderHelper';
        var dummy_div = document.getElementById(lDummyId);
        if (dummy_div == null) {
            var dummy_div = document.createElement('div');
            dummy_div.id = lDummyId;
            elem.parentNode.insertBefore(dummy_div, elem.nextSibling);
        }

        // set height for helping div elem if needed
        var lHeight = state ? '' + elem.offsetHeight + 'px' : '';
        dummy_div.style.marginTop = lHeight;

        // adapt header width around vertical cart bar
        var lFlyOutEwc = document.getElementById('nav-flyout-ewc');
        if (lFlyOutEwc != null) {
            if (state === true) {
                var lHeaderWidth = lHeaderWidth - lFlyOutEwc.offsetWidth;
                elem.style.width = '' + lHeaderWidth + 'px';
            } else {
                elem.style.width = '' + dummy_div.offsetWidth + 'px';
            }
        }
    }
}

chrome.storage.onChanged.addListener(function (data) {
    var state = data.state.newValue;
    toggleStickyHeader(state);
});

getState(function(state) {
    toggleStickyHeader(state);
});
