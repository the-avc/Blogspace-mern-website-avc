let months = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];

export const getDay = (time)=>{
    let date = new Date(time);

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}