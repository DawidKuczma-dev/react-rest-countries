const Wind = ({ speed, deg }) => {
  const directions = ['⬇️', '↙️', '⬅️', '↖️', '⬆️', '↗️', '➡️', '↘️'];

  const getWindDirectionWithEmoji = (deg) => {
    const index = Math.round(deg / 45) % 8;
    return `${directions[index]}`;
  };
  const msToKmh = (speed) => (speed * 3.6).toFixed(1);

  return (
    <div className="wind">
      <h4>Wiatr</h4>
      <div className="wind__info">
        <span className="wind__emoji">{getWindDirectionWithEmoji(deg)}</span>
        <p className="wind__speed">{msToKmh(speed)} km/h</p>
      </div>
    </div>
  );
};

export default Wind;
