import React from 'react';

function AGMessageBox() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" width="24" height="20" fill="currentColor" align="left" role="presentation" class="BubbleText__StyledTail-sc-1bng39n-1 fWWbHc"><path d="M11.92 16.062A19.91 19.91 0 0 1 0 20V0h20c0 7.668-.155 16.282 4 20-5.176-.054-9.12-1.727-12.08-3.938z"></path></svg>
  );
}


export function getSvg() {
  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute("viewbox", "0 0 24 20");
  svg.setAttribute('width', 24);
  svg.setAttribute('height', 20);
  svg.setAttribute('fill', 'rgb(73, 76, 126)');
  svg.setAttribute('align', 'left');
  svg.innerHTML = '<path d="M11.92 16.062A19.91 19.91 0 0 1 0 20V0h20c0 7.668-.155 16.282 4 20-5.176-.054-9.12-1.727-12.08-3.938z"></path>';
  svg.style.position = 'relative';
  svg.style.top = '13px';
  svg.style.left = '-193px';
  svg.fillColor = 'slategrey';
  return svg;
}