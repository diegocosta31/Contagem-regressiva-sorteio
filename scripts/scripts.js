// Elementos

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
const weekdays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// Definido a data do sorteio para sempre ser 7 dias a data atual
const futureDate = new Date(tempYear, tempMonth, tempDay +7 , 10, 30, 0);

const year = futureDate.getFullYear();
let month = futureDate.getMonth();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

month = months[month];
const weekday = weekdays[futureDate.getDay()];
giveaway.textContent = `O sorteio será: ${weekday}, ${date} de ${month} de ${year} ${hours}:${minutes} da manhã`;

const futureTime = futureDate.getTime();
const getRemaindingTime = ()=> {
  const today = new Date().getTime();
  const t = futureTime - today;
  // Convertendo para unidade do New Date
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // Calculado valores
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  
  const values = [days, hours, minutes, seconds];
  // Se o valor for menos que dois caracteres, acrescenta um 0 
  const format = (item)=> {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }
  // É passado o valor do index na funçao, porque retorna um array unico, ao inves de um por um
  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });
  // Se acabar o tempo zera o cronometro
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Chegou tarde, já foi sorteado</h4>`;
  }
}
// Contagem ;
let countdown = setInterval(getRemaindingTime, 1000);

getRemaindingTime();
