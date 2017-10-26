$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

//******Show tooltip

var showingTooltip;

document.onmouseover = function (e) {
    var target = e.target;

    while (target !== this) {
        var tooltip = target.getAttribute('data-tooltip');
        if (tooltip) break;
        target = target.parentNode;
    }

    if (!tooltip) return;

    showingTooltip = showTooltip(tooltip, target);
}

document.onmouseout = function () {

    if (showingTooltip) {
        document.body.removeChild(showingTooltip);
        showingTooltip = false;
    }

}

function showTooltip(text, elem) {
    var tooltipElem = document.createElement('div');
    tooltipElem.className = 'mytooltip';
    tooltipElem.innerHTML = text;
    document.body.appendChild(tooltipElem);

    var coords = elem.getBoundingClientRect();

    var left = coords.left + (elem.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; 

    var top = coords.top - tooltipElem.offsetHeight;
    if (top < 0) {
        top = coords.top + elem.offsetHeight;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';

    return tooltipElem;
}

//******Warning form

function showModalInfo() {
    function showCover() {
        var coverDiv = document.createElement('div');
        coverDiv.id = 'cover-div';
        document.body.appendChild(coverDiv);
    }

    function hideCover() {
        document.body.removeChild(document.getElementById('cover-div'));
    }

    function showPrompt(text) {
        showCover();
        var container = document.getElementById('prompt-form-container');
        document.getElementById('prompt-message').innerHTML = text;

        function showCover() {
            var coverDiv = document.createElement('div');
            coverDiv.id = 'cover-div';
            document.body.appendChild(coverDiv);
        };

        function hideCover() {
            document.body.removeChild(document.getElementById('cover-div'));
        };

        function complete() {
            hideCover();
            container.style.display = 'none';
        };

        var okBtn = document.getElementById('okBtn');
        okBtn.onclick = complete;
   

        document.onkeydown = function (e) {
            if (e.keyCode == 27) { // escape
                complete();
            }
        };

        container.style.display = 'block';
    }

    showPrompt("You don't have permission to edit or delete this position!");

};