export const convertTimeZone = (dateUTC , timezone) => {
    return new Date(dateUTC).toLocaleString("en-US" , {timeZone: timezone})
}