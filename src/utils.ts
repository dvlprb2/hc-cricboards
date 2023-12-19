export const getTodayDate = () => {
    const date = new Date();

    let day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();

    let currentDate = `${month} ${day}, ${year}`;

    return currentDate;
}