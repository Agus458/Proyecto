import moment from "moment";

export const getPreviousMonths = (): Date[] => {
    const months: any[] = [];

    for (let index = 0; index < 12; index++) {
        months.push(moment().utc(true).endOf('month').subtract(index, "month").toDate());
    }

    return months;
}