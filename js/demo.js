"use strict";

/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
var addAlert = function addAlert(message) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var makeAlert = function makeAlert(message, options) {
    var alert = document.createElement('div');
    alert.classList.add('alert', 'fade', 'show');
    alert.setAttribute('role', 'alert');

    switch (options.type) {
      case 'info':
        alert.classList.add('alert-info');
        break;

      case 'success':
        alert.classList.add('alert-success');
        break;

      case 'warning':
        alert.classList.add('alert-warning');
        break;

      case 'danger':
        alert.classList.add('alert-danger');
        break;

      default:
        alert.classList.add('alert-default');
        break;
    }

    var wrapper = document.createElement('div');
    var heading = document.createElement('div');
    heading.classList.add('alert-heading');
    heading.innerHTML = message;
    wrapper.appendChild(heading);

    if (options.content) {
      var _content = document.createElement('div');

      _content.innerHTML = options.content;
      wrapper.appendChild(_content);
    }

    alert.appendChild(wrapper);

    if (options.dismissible) {
      alert.classList.add('alert-dismissible');
      var temp = document.createElement('div');
      temp.innerHTML = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span class="icon icon-close" aria-hidden="true"></span></button>';
      alert.appendChild(temp.firstChild);
    }

    return alert;
  };

  if (!message || typeof message !== 'string') return;
  var _options$target = options.target,
      target = _options$target === void 0 ? document.documentElement : _options$target,
      _options$type = options.type,
      type = _options$type === void 0 ? 'default' : _options$type,
      _options$content = options.content,
      content = _options$content === void 0 ? null : _options$content,
      _options$dismissible = options.dismissible,
      dismissible = _options$dismissible === void 0 ? true : _options$dismissible,
      _options$duration = options.duration,
      duration = _options$duration === void 0 ? 0 : _options$duration,
      _options$position = options.position,
      position = _options$position === void 0 ? 'first' : _options$position;
  var alert = makeAlert(message, {
    target: target,
    type: type,
    content: content,
    dismissible: dismissible,
    duration: duration,
    position: position
  });

  if (position === 'first') {
    target.insertBefore(alert, target.firstChild);
  } else {
    target.appendChild(alert);
  }

  if (duration) {
    setTimeout(function () {
      return $(alert).alert('close');
    }, duration * 1000);
  }
};

var addAlertHandler = function addAlertHandler(event) {
  event.preventDefault();

  var arrayToObj = function arrayToObj(output, input) {
    output[input.name] = input.value;
    return output;
  };

  var data = $(event.currentTarget).serializeArray().reduce(arrayToObj, {});

  var getTarget = function getTarget(topBottom, rightLeft) {
    var id;

    if (topBottom === 'top') {
      if (rightLeft === 'right') {
        id = 'alertsTopRight';
      } else {
        id = 'alertsTopLeft';
      }
    } else {
      if (rightLeft === 'right') {
        id = 'alertsBottomRight';
      } else {
        id = 'alertsBottomLeft';
      }
    }

    return document.getElementById(id) || document.documentElement;
  };

  var options = {
    target: getTarget(data.alertTopBottom, data.alertRightLeft),
    type: data.alertType,
    content: data.alertContent,
    dismissible: !!data.alertDismissible,
    duration: Number.parseInt(data.alertDuration),
    position: data.alertTopBottom === 'bottom' ? 'first' : 'last'
  };
  addAlert(data.alertMessage, options);
  return false;
};

var dismissAllAlerts = function dismissAllAlerts() {
  $(".alert-container .alert").alert('close');
};

var updateContainerExample = function updateContainerExample() {
  $('#documentWidth').text($('body').css('width'));
  $('#containerWidth').text($('#containerExample').css('width'));
  $('#containerFluidWidth').text($('#containerFluidExample').css('width'));
};

$(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  updateContainerExample();
  $(window).resize(updateContainerExample);
  $('#addAlert').on('submit', addAlertHandler);
  $('#dismissAllAlerts').on('click', dismissAllAlerts);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiYWRkQWxlcnQiLCJtZXNzYWdlIiwib3B0aW9ucyIsIm1ha2VBbGVydCIsImFsZXJ0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwidHlwZSIsIndyYXBwZXIiLCJoZWFkaW5nIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiZGlzbWlzc2libGUiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsInRhcmdldCIsImRvY3VtZW50RWxlbWVudCIsImR1cmF0aW9uIiwicG9zaXRpb24iLCJpbnNlcnRCZWZvcmUiLCJzZXRUaW1lb3V0IiwiJCIsImFkZEFsZXJ0SGFuZGxlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhcnJheVRvT2JqIiwib3V0cHV0IiwiaW5wdXQiLCJuYW1lIiwidmFsdWUiLCJkYXRhIiwiY3VycmVudFRhcmdldCIsInNlcmlhbGl6ZUFycmF5IiwicmVkdWNlIiwiZ2V0VGFyZ2V0IiwidG9wQm90dG9tIiwicmlnaHRMZWZ0IiwiaWQiLCJnZXRFbGVtZW50QnlJZCIsImFsZXJ0VG9wQm90dG9tIiwiYWxlcnRSaWdodExlZnQiLCJhbGVydFR5cGUiLCJhbGVydENvbnRlbnQiLCJhbGVydERpc21pc3NpYmxlIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJhbGVydER1cmF0aW9uIiwiYWxlcnRNZXNzYWdlIiwiZGlzbWlzc0FsbEFsZXJ0cyIsInVwZGF0ZUNvbnRhaW5lckV4YW1wbGUiLCJ0ZXh0IiwiY3NzIiwicG9wb3ZlciIsInRvb2x0aXAiLCJ3aW5kb3ciLCJyZXNpemUiLCJvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQVFBLElBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLE9BQUQsRUFBMkI7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTzs7QUFDMUMsTUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FB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O0FBQ0QsQ0FUQSxDQUFEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxOCwgSG9ydG9ud29ya3MgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEV4Y2VwdCBhcyBleHByZXNzbHkgcGVybWl0dGVkIGluIGEgd3JpdHRlbiBhZ3JlZW1lbnQgYmV0d2VlbiB5b3VcbiAqIG9yIHlvdXIgY29tcGFueSBhbmQgSG9ydG9ud29ya3MsIEluYywgYW55IHVzZSwgcmVwcm9kdWN0aW9uLFxuICogbW9kaWZpY2F0aW9uLCByZWRpc3RyaWJ1dGlvbiwgc2hhcmluZywgbGVuZGluZyBvciBvdGhlciBleHBsb2l0YXRpb25cbiAqIG9mIGFsbCBvciBhbnkgcGFydCBvZiB0aGUgY29udGVudHMgb2YgdGhpcyBmaWxlIGlzIHN0cmljdGx5IHByb2hpYml0ZWQuXG4gKi9cblxuY29uc3QgYWRkQWxlcnQgPSAobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IG1ha2VBbGVydCA9IChtZXNzYWdlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydCcsICdmYWRlJywgJ3Nob3cnKTtcbiAgICBhbGVydC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYWxlcnQnKTtcblxuICAgIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtaW5mbycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1zdWNjZXNzJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LXdhcm5pbmcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYW5nZXInOlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1kYW5nZXInKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1kZWZhdWx0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWhlYWRpbmcnKTtcbiAgICBoZWFkaW5nLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChoZWFkaW5nKTtcblxuICAgIGlmIChvcHRpb25zLmNvbnRlbnQpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gb3B0aW9ucy5jb250ZW50O1xuICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9XG5cbiAgICBhbGVydC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcblxuICAgIGlmIChvcHRpb25zLmRpc21pc3NpYmxlKSB7XG4gICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1kaXNtaXNzaWJsZScpO1xuICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGVtcC5pbm5lckhUTUwgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW4gY2xhc3M9XCJpY29uIGljb24tY2xvc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+PC9idXR0b24+JztcbiAgICAgIGFsZXJ0LmFwcGVuZENoaWxkKHRlbXAuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFsZXJ0O1xuICB9O1xuXG4gIGlmICghbWVzc2FnZSB8fCB0eXBlb2YgbWVzc2FnZSAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICBjb25zdCB7XG4gICAgdGFyZ2V0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgIHR5cGUgPSAnZGVmYXVsdCcsIC8vIG1heSBiZSAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgb3IgJ2RlZmF1bHQnXG4gICAgY29udGVudCA9IG51bGwsXG4gICAgZGlzbWlzc2libGUgPSB0cnVlLFxuICAgIGR1cmF0aW9uID0gMCwgLy9pbiBzZWNvbmRzXG4gICAgcG9zaXRpb24gPSAnZmlyc3QnIC8vIGlmICdmaXJzdCcgYWxlcnQgd2lsbCBiZSBpbnNlcnRlZCBhYm92ZSBleGlzdGluZyBhbGVydHNcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgYWxlcnQgPSBtYWtlQWxlcnQobWVzc2FnZSwge3RhcmdldCwgdHlwZSwgY29udGVudCwgZGlzbWlzc2libGUsIGR1cmF0aW9uLCBwb3NpdGlvbn0pO1xuXG4gIGlmIChwb3NpdGlvbiA9PT0gJ2ZpcnN0Jykge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoYWxlcnQsIHRhcmdldC5maXJzdENoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoYWxlcnQpO1xuICB9XG5cbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiAkKGFsZXJ0KS5hbGVydCgnY2xvc2UnKSwgZHVyYXRpb24gKiAxMDAwKTtcbiAgfVxufTtcblxuY29uc3QgYWRkQWxlcnRIYW5kbGVyID0gZXZlbnQgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGFycmF5VG9PYmogPSAob3V0cHV0LCBpbnB1dCkgPT4ge1xuICAgIG91dHB1dFtpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgY29uc3QgZGF0YSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuc2VyaWFsaXplQXJyYXkoKS5yZWR1Y2UoYXJyYXlUb09iaiwge30pO1xuXG4gIGNvbnN0IGdldFRhcmdldCA9ICh0b3BCb3R0b20sIHJpZ2h0TGVmdCkgPT4ge1xuICAgIGxldCBpZDtcblxuICAgIGlmICh0b3BCb3R0b20gPT09ICd0b3AnKSB7XG4gICAgICBpZiAocmlnaHRMZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgIGlkID0gJ2FsZXJ0c1RvcFJpZ2h0JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkID0gJ2FsZXJ0c1RvcExlZnQnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmlnaHRMZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgIGlkID0gJ2FsZXJ0c0JvdHRvbVJpZ2h0JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkID0gJ2FsZXJ0c0JvdHRvbUxlZnQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB0YXJnZXQ6IGdldFRhcmdldChkYXRhLmFsZXJ0VG9wQm90dG9tLCBkYXRhLmFsZXJ0UmlnaHRMZWZ0KSxcbiAgICB0eXBlOiBkYXRhLmFsZXJ0VHlwZSxcbiAgICBjb250ZW50OiBkYXRhLmFsZXJ0Q29udGVudCxcbiAgICBkaXNtaXNzaWJsZTogISFkYXRhLmFsZXJ0RGlzbWlzc2libGUsXG4gICAgZHVyYXRpb246IE51bWJlci5wYXJzZUludChkYXRhLmFsZXJ0RHVyYXRpb24pLFxuICAgIHBvc2l0aW9uOiBkYXRhLmFsZXJ0VG9wQm90dG9tID09PSAnYm90dG9tJyA/ICdmaXJzdCcgOiAnbGFzdCdcbiAgfTtcblxuICBhZGRBbGVydChkYXRhLmFsZXJ0TWVzc2FnZSwgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgZGlzbWlzc0FsbEFsZXJ0cyA9ICgpID0+IHtcbiAgJChcIi5hbGVydC1jb250YWluZXIgLmFsZXJ0XCIpLmFsZXJ0KCdjbG9zZScpO1xufTtcblxuY29uc3QgdXBkYXRlQ29udGFpbmVyRXhhbXBsZSA9IGZ1bmN0aW9uICgpIHtcbiAgJCgnI2RvY3VtZW50V2lkdGgnKS50ZXh0KCQoJ2JvZHknKS5jc3MoJ3dpZHRoJykpO1xuICAkKCcjY29udGFpbmVyV2lkdGgnKS50ZXh0KCQoJyNjb250YWluZXJFeGFtcGxlJykuY3NzKCd3aWR0aCcpKTtcbiAgJCgnI2NvbnRhaW5lckZsdWlkV2lkdGgnKS50ZXh0KCQoJyNjb250YWluZXJGbHVpZEV4YW1wbGUnKS5jc3MoJ3dpZHRoJykpO1xufTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKCk7XG4gICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cbiAgdXBkYXRlQ29udGFpbmVyRXhhbXBsZSgpO1xuICAkKHdpbmRvdykucmVzaXplKHVwZGF0ZUNvbnRhaW5lckV4YW1wbGUpO1xuXG4gICQoJyNhZGRBbGVydCcpLm9uKCdzdWJtaXQnLCBhZGRBbGVydEhhbmRsZXIpO1xuICAkKCcjZGlzbWlzc0FsbEFsZXJ0cycpLm9uKCdjbGljaycsIGRpc21pc3NBbGxBbGVydHMpO1xufSk7XG4iXSwiZmlsZSI6ImRlbW8uanMifQ==