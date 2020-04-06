/*Задача - имеются две даты - начальная и конечная. По умолчанию начальная дата - текущая, но может быть введено и другое 
(если ничего не ввели, то дата - текущая, иначе - введенная). Необходимо посчитать, сколько времени между двумя датами. 
Если дата конца меньше даты начала, то необходимо посчитать, сколько прошло с той или иной даты.
Далее необходимо ввести единицы, в которых мы хотим получить результат. Это могут быть годы, месяцы, недели или дни.
Если от одной даты до другой расстояние в этих единицах не целое, то надо получить подробно расписанное расстояние вплоть до дня.

Пример:
Введены две даты: текущая (1.04.2020) и 31.03.2022.
Если введены годы, то результат - 1 год 11 месяцев 4 недели 1 день
Если введены месяцы, то результат - 23 месяца 4 недели 1 день
Если введены недели, то результат - 104 недели 1 день
Если введены дни, то результат - 729 дней

Приложение выводит ответ в зависимости от выбранной величины.*/
"use strict";


//добавляет ноль спереди если в числе меньше 2 цифр
function numToStr(num) {
    if (num < 10) {
        return '0' + String(num);
    }
    return String(num);
}

//дату в строку без времени
function dateToStringWithoutTime(date) {
    return (numToStr(date.getDate()) + '.' + numToStr(date.getMonth() + 1) + '.' + date.getFullYear())
}

//целочисленное деление
function div(val, by) {
    return (val - val % by) / by;
}

//проверяет год на високосность
function isLeapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

//возвращает количество дней в месяце по номеру месяца
function amountOfDaysInTheMonth(year, month) {
    switch (month) {
        case 2:
            if (isLeapYear(year))
                return 29;
            else
                return 28;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;
        default:
            return 31;
            break;
    }

}

//сравнение дат (-1 - d1 after b2, 0 - d1 equal b2,1 - d1 before b2)
function compareDates(d1, d2) {
    if (d1.getFullYear() == d2.getFullYear()) {
        if (d1.getMonth() == d2.getMonth()) {
            if (d1.getDate() == d2.getDate()) {
                return 0;
            } else {
                if (d1.getDate() < d2.getDate()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        } else {
            if (d1.getMonth() < d2.getMonth()) {
                return 1;
            } else {
                return -1;
            }
        }
    } else {
        if (d1.getFullYear() < d2.getFullYear()) {
            return 1;
        } else {
            return -1;
        }
    }
}

//время между датами
function timeBetweenDates(date1, date2, view) {
    if (compareDates(date1, date2) == -1) {
        [date1, date2] = [date2, date1];
    }
    let days = (date2.getTime() - date1.getTime()) / (24 * 3600 * 1000);
    let y1 = date1.getFullYear();
    let y2 = date2.getFullYear();
    let count_of_years = 0;
    let count_of_months = 0;
    let cur = date1.getMonth(); //текущий месяц
    let until = date2.getMonth(); //"последний" месяц
    switch (view) {
        case 'годы':
            if (y1 < y2) {
                while (cur < 12) {
                    if (days > amountOfDaysInTheMonth(y1, cur + 1)) {
                        count_of_months++;
                        days -= amountOfDaysInTheMonth(y1, cur + 1);
                    }
                    cur++;
                }
                cur = 0;
                y1++;
            }
            while (y1 < y2) {
                count_of_years++;
                days -= 365 + (+isLeapYear(y1));
                y1++;
            }
            //y1 == y2
            while (until > cur) {
                if (days > amountOfDaysInTheMonth(y1, cur + 1)) {
                    count_of_months++;
                    days -= amountOfDaysInTheMonth(y1, cur + 1);
                }
                cur++;
            }
            alert(`Между датами ${dateToStringWithoutTime(date1)} и ${dateToStringWithoutTime(date2)}: ${count_of_years} лет ${count_of_months} месяцев ${div(days,7)} недели ${days%7} дней`);
            break;
        case 'месяцы':
            if (y1 < y2) {
                while (cur < 12) {
                    if (days > amountOfDaysInTheMonth(y1, cur + 1)) {
                        count_of_months++;
                        days -= amountOfDaysInTheMonth(y1, cur + 1);
                    }
                    cur++;
                }
                cur = 0;
                y1++;
            }
            while (y1 < y2) {
                count_of_months += 12;
                days -= 365 + (+isLeapYear(y1));
                y1++;
            }
            //y1 == y2
            while (until > cur) {
                if (days > amountOfDaysInTheMonth(y1, cur + 1)) {
                    count_of_months++;
                    days -= amountOfDaysInTheMonth(y1, cur + 1);
                }
                cur++;
            }
            alert(`Между датами ${dateToStringWithoutTime(date1)} и ${dateToStringWithoutTime(date2)}: ${count_of_months} месяцев ${div(days,7)} недели ${days%7} дней`);
            break;
        case 'недели':
            alert(`Между датами ${dateToStringWithoutTime(date1)} и ${dateToStringWithoutTime(date2)}: ${div(days,7)} недели ${days%7} дней`);
            break;
        case 'дни':
            alert(`Между датами ${dateToStringWithoutTime(date1)} и ${dateToStringWithoutTime(date2)}: ${days} дней`)
            break;
    }
}

let input_date = prompt('Введите начальную дату в формате "гггг-мм-дд" ("Отмена" - взять текущую)', '');
let start_date;
if (input_date == null) {
    start_date = new Date();
} else {
    start_date = new Date(input_date);
}
start_date.setHours(0, 0, 0, 0);
do {
    input_date = prompt('Введите конечную дату в формате "гггг-мм-дд"', '');
} while (input_date == null)
let final_date = new Date(input_date);
final_date.setHours(0, 0, 0, 0);
alert(`Введенные даты\nНачальная: ${dateToStringWithoutTime(start_date)}\nКонечная: ${dateToStringWithoutTime(final_date)}`);
let views = new Set(["годы", "месяцы", "недели", "дни"]);
let view = prompt('Введите единицы вывода результата: "годы", "месяцы", "недели", "дни"', 'дни');
while (!views.has(view)) {
    view = prompt('Неверный ввод, повторите\nВведите единицы вывода результата: "годы", "месяцы", "недели", "дни"', 'дни');
}
timeBetweenDates(start_date, final_date, view);