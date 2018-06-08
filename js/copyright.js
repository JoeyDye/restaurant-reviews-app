/**
 * @description Set copyright date to current year
 */
const copyrightYear = document.querySelector('#copyright-year');
const date = new Date();
const year = date.getFullYear();
copyrightYear.innerText = year;
