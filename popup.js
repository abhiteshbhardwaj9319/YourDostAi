function openSidePanel() {
  const sidePanel = window.open('side_panel.html', 'SidePanel', 'width=600,height=500');
  sidePanel.document.title = 'Side Panel';
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('Your-Dost').addEventListener('click', function () {
    openSidePanel();
  });

  document.getElementById('Image-Create').addEventListener('click', function () {
    
  });

  document.getElementById('Connect').addEventListener('click', function () {

    const linkedinProfileUrl = 'https://www.linkedin.com/in/abhitesh-bhardwaj/';
    window.open(linkedinProfileUrl, '_blank');
  });
});
