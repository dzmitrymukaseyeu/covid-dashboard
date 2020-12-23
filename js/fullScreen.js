const buttons = document.querySelectorAll('.button__maximaze');
buttons[0].addEventListener('click', () => {
  document.getElementById('globalCases').classList.toggle('fullWidth');
  document.getElementById('countrysColumn').classList.toggle('hide');
  document.getElementById('centerColumnWrapper').classList.toggle('hide');
  document.getElementById('tableWrapper').classList.toggle('hide');
  document.getElementById('graphiсWrapper').classList.toggle('hide');
});

buttons[1].addEventListener('click', () => {
  document.getElementById('countrysColumn').classList.toggle('fullWidth');
  document.getElementById('globalCases').classList.toggle('hide');
  document.getElementById('centerColumnWrapper').classList.toggle('hide');
  document.getElementById('tableWrapper').classList.toggle('hide');
  document.getElementById('graphiсWrapper').classList.toggle('hide');
});

buttons[2].addEventListener('click', () => {
  document.getElementById('centerColumnWrapper').classList.toggle('fullWidth');
  document.getElementById('countrysColumn').classList.toggle('hide');
  document.getElementById('globalCases').classList.toggle('hide');
  document.getElementById('tableWrapper').classList.toggle('hide');
  document.getElementById('graphiсWrapper').classList.toggle('hide');
});

buttons[3].addEventListener('click', () => {
  document.getElementById('tableWrapper').classList.toggle('fullWidth');
  document.getElementById('centerColumnWrapper').classList.toggle('hide');
  document.getElementById('countrysColumn').classList.toggle('hide');
  document.getElementById('globalCases').classList.toggle('hide');
  document.getElementById('graphiсWrapper').classList.toggle('hide');
});

buttons[4].addEventListener('click', () => {
  document.getElementById('graphiсWrapper').classList.toggle('fullWidth');
  document.getElementById('tableWrapper').classList.toggle('hide');
  document.getElementById('centerColumnWrapper').classList.toggle('hide');
  document.getElementById('countrysColumn').classList.toggle('hide');
  document.getElementById('globalCases').classList.toggle('hide');
});
