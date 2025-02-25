import moment from 'moment';

export const FormatDate = (timesamp) => {
    return new Date(timesamp).setHours(0, 0, 0, 0)
}
export const formatDateForText = (date) => {
    return moment(date).format('L')
}

export const getDatesRange = (startdate, endDate) => {
    const start = moment(startdate, 'MM/DD/YYYY');
    const end = moment(endDate, 'MM/DD/YYYY');
    const dates = [];
    while (start.isSameOrBefore(end)) {
        dates.push(start.format('MM/DD/YYYY'));
        // permet d’ajouter un élément à la fin d’un tableau.
        start.add(1, 'days')
        //Ajoute i jours à la date actuelle (toujourrs date actuelle)
    }
    return dates;


}

export const GetDatesRangeToDisplay = () => {

    const datelist = [];
    for (let i = 0; i <= 7; i++) {//informations sur les 7 prochains jours à partir d'aujourd'hui(compris ajourdui et 7 jours suivantes )
        datelist.push({ //ajout d un element au tableau  comprend ces 3 proprietes 
            date: moment().add(i, 'days').format('DD'), //26
            day: moment().add(i, 'days').format('dd'), //Tuesday
            FormattedDate: moment().add(i, 'days').format('L'),//  12/05/2025
        })
    }
    return datelist;

}
export const GetPrevDateRangeToDisplay = () => {
    const dates = []
    for (let i = 0; i <= 7; i++) {
        const date = moment().subtract(i, 'days');
        dates.push({
            date: date.format('DD'),
            day: date.format('dd'),
            formatted: date.format('L')

        })


    }
    return dates;
}




