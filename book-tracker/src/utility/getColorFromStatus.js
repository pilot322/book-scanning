const getColorFromStatus = (status) => {
    let className = 'font-bold ';
    switch (status) {
        case 'received':
            className += 'text-accent';
            break;
        case 'scanning':
            className += 'text-primary';
            break;
        case 'paused':
            className += 'text-warning';
            break;
        case 'finished':
            className += 'text-error';
            break;
        default:
            className += 'text-secondary';
            break;
    }
    return className;
}

export default getColorFromStatus;